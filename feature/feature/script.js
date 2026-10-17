const input = document.getElementById('text-input');
const bgBtn = document.getElementById('bg-btn');

function calculateStats(text) {
  // object: all metrics in one place
  const stats = {
    characters: text.length,
    letters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  };

  // loop: count letters
  for (let i = 0; i < text.length; i++) {
    if (/\p{L}/u.test(text[i])) {
      stats.letters++;
    }
  }

  const trimmed = text.trim();
  stats.words = trimmed ? trimmed.split(/\s+/).length : 0;

  // last sentence without a period is counted too
  stats.sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '').length;

  stats.paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;
  stats.readingTime = Math.ceil(stats.words / 200);

  return stats;
}

function render(stats) {
  for (const key in stats) {
    document.getElementById(key).textContent = stats[key];
  }
}

// async logic: debounce with setTimeout
let timer;
input.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(calculateStats(input.value));
  }, 300);
});

// bonus: random background
bgBtn.addEventListener('click', () => {
  const hue = Math.floor(Math.random() * 360);
  document.body.style.background = `hsl(${hue}, 70%, 85%)`;
});
