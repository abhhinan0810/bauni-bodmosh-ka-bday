(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // Delay slightly to allow the browser to complete initial paint, preventing any frame drop
    setTimeout(() => {
      document.body.classList.remove('container');
    }, 150);
  });
})();
