const floatText = document.querySelectorAll('.float-down');

function checkPosition() {
  floatText.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkPosition);
window.addEventListener('load', checkPosition);