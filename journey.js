// Learning journey: goal checklist with progress saved in localStorage.
// The goals are plain list items in the HTML; this script turns them into
// toggle buttons, so the page stays readable without JavaScript.

const KEY = 'skill17-journey-v2';

// Set to true to keep each stage locked until the previous one is complete.
const SEQUENTIAL = false;

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

function save(done) {
  try {
    localStorage.setItem(KEY, JSON.stringify(done));
  } catch {
    // Storage unavailable (private mode, blocked): keep working in memory.
  }
}

function clear() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing stored to remove.
  }
}

let done = load();

const stages = [...document.querySelectorAll('.stage')].map((article) => {
  const num = article.dataset.stage;
  const list = article.querySelector('.goals');
  const goals = [...list.children].map((item, index) => {
    const id = `${num}-${index}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'goal';
    button.dataset.goal = id;

    const box = document.createElement('span');
    box.className = 'goal-box';
    box.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'goal-label';
    label.textContent = item.textContent;

    button.append(box, label);
    item.replaceChildren(button);
    return { id, button };
  });
  list.classList.add('is-interactive');

  return {
    num,
    article,
    goals,
    count: article.querySelector('.goals-count'),
    donePill: article.querySelector('.pill--done'),
    lockedPill: article.querySelector('.pill--locked'),
    segment: document.querySelector(`[data-segment="${num}"]`),
  };
});

const panel = document.querySelector('.progress');
const pctLabel = panel.querySelector('[data-pct]');
const totalLabel = panel.querySelector('[data-total]');

function render() {
  let total = 0;
  let checked = 0;
  let previousComplete = true;

  for (const stage of stages) {
    const locked = SEQUENTIAL && !previousComplete;
    let n = 0;

    for (const { id, button } of stage.goals) {
      const on = Boolean(done[id]);
      button.setAttribute('aria-pressed', String(on));
      button.disabled = locked;
      if (on) n++;
    }

    const m = stage.goals.length;
    const complete = n === m;
    total += m;
    checked += n;

    stage.count.textContent = ` · ${n} of ${m}`;
    stage.donePill.hidden = !complete;
    if (stage.lockedPill) stage.lockedPill.hidden = !locked;
    stage.article.classList.toggle('is-locked', locked);
    stage.segment.style.setProperty('--fill', `${Math.round((n / m) * 100)}%`);
    stage.segment.setAttribute('aria-label', `Stage ${stage.num}, ${n} of ${m} goals`);

    previousComplete = complete;
  }

  pctLabel.textContent = `${total ? Math.round((checked / total) * 100) : 0}%`;
  totalLabel.textContent = `${checked} of ${total} goals`;
}

document.querySelector('.stages').addEventListener('click', (event) => {
  const button = event.target.closest('.goal');
  if (!button || button.disabled) return;
  const id = button.dataset.goal;
  if (done[id]) delete done[id];
  else done[id] = true;
  save(done);
  render();
});

panel.querySelector('[data-reset]').addEventListener('click', () => {
  if (!window.confirm('Reset your progress on all six stages?')) return;
  clear();
  done = {};
  render();
});

render();
panel.hidden = false;
