let _score;

function loadMenu() {
  const score = localStorage.getItem('SCORE');
  if (score) {
    _score = score;
    const button = document.getElementById('high-score');
    button.textContent = `High Score: ${score}`;
  }
}