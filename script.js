const typed = document.querySelector('.typed');
const chamber = document.querySelector('.object-chamber');
const prompts = [
  'modular running shoe with translucent sole',
  'folding camera drone with compact carbon body',
  'ribbed ceramic bottle with steel cap and soft bevels'
];

let promptIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = prompts[promptIndex];

  if (!deleting) {
    charIndex += 1;
    typed.textContent = current.slice(0, charIndex);

    const progress = charIndex / current.length;
    chamber.dataset.phase = progress > 0.82 ? '3' : progress > 0.48 ? '2' : progress > 0.18 ? '1' : '0';

    if (charIndex < current.length) {
      setTimeout(typeLoop, 38);
    } else {
      deleting = true;
      setTimeout(typeLoop, 1300);
    }
  } else {
    charIndex -= 1;
    typed.textContent = current.slice(0, Math.max(0, charIndex));

    if (charIndex > 0) {
      setTimeout(typeLoop, 18);
    } else {
      deleting = false;
      chamber.dataset.phase = '0';
      promptIndex = (promptIndex + 1) % prompts.length;
      setTimeout(typeLoop, 260);
    }
  }
}

typeLoop();

const chips = document.querySelectorAll('.template-chip');
const stage = document.querySelector('.preview-stage');
const title = document.querySelector('[data-template-title]');
const text = document.querySelector('[data-template-text]');
const tags = document.querySelector('[data-template-tags]');

function setTemplate(el) {
  chips.forEach(chip => chip.classList.remove('is-active'));
  el.classList.add('is-active');
  stage.className = `preview-stage ${el.dataset.model}`;
  title.textContent = el.dataset.title;
  text.textContent = el.dataset.text;
  tags.innerHTML = el.dataset.tags.split('|').map(tag => `<span>${tag}</span>`).join('');
}

chips.forEach(chip => {
  ['mouseenter', 'focus', 'click'].forEach(evt => {
    chip.addEventListener(evt, () => setTemplate(chip));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal, .graph-board').forEach(el => observer.observe(el));