// Image protection — blocks right-click save and drag on all images
(function () {
  // Disable right-click on images
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Disable drag on images
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
})();
