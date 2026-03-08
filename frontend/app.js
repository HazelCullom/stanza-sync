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
