// theme handling ----------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');

function setTheme(mode) {
  console.log('setTheme called with', mode);
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  document.cookie = `theme=${mode};path=/;max-age=31536000`; // 1 year
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function initTheme() {
  const saved = getCookie('theme');
  if (saved) {
    setTheme(saved);
  } else {
    // system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });
} else {
  console.warn('themeToggle button not found');
}

initTheme();

// style hints for future code: use `bg-azalea`, `text-blossom`, `border-azalea` etc.

// style hints for future code: use `bg-azalea`, `text-blossom`, `border-azalea` etc.

// existing analyze logic -------------------------------------------------
document.getElementById('analyze-btn').addEventListener('click', async () => {
  const poem = document.getElementById('poem-input').value.trim();
  if (!poem) return;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Analyzing...';

  try {
    const res = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poem })
    });
    const data = await res.json();
    resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;

    // simple animation on results
    anime({
      targets: '#result',
      opacity: [0,1],
      translateY: [-20,0],
      duration: 800,
      easing: 'easeOutQuad'
    });
  } catch (err) {
    resultDiv.textContent = 'Error fetching results';
    console.error(err);
  }
});
