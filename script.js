(function () {

  const exitBtn = document.getElementById('exitBtn');
  const enterBtn = document.getElementById('enterBtn');
  const placeholder = document.getElementById('placeholder');
  const page19 = document.getElementById('page19');
  const mainCard = document.getElementById('mainCard');
  const backBtn = document.getElementById('backBtn');

  const videoPage = document.getElementById('videoPage');
  const birthdayVideo = document.getElementById('birthdayVideo');
  const finalPage = document.getElementById('finalPage');

  function init() {

    let btnW, btnH;

    function lockDimensions() {
      const rect = placeholder.getBoundingClientRect();

      btnW = rect.width;
      btnH = rect.height;

      exitBtn.style.width = btnW + 'px';
      exitBtn.style.height = btnH + 'px';

      placeholder.style.height = btnH + 'px';
    }

    function placeInitial() {
      lockDimensions();

      const phRect = placeholder.getBoundingClientRect();

      exitBtn.style.left = phRect.left + 'px';
      exitBtn.style.top = phRect.top + 'px';
    }

    placeInitial();

    window.addEventListener('resize', placeInitial);

    function overlapsCard(x, y) {
      const c = mainCard.getBoundingClientRect();
      const pad = 20;

      return !(
        x + btnW < c.left - pad ||
        x > c.right + pad ||
        y + btnH < c.top - pad ||
        y > c.bottom + pad
      );
    }

    function jumpAway(e) {

      if (e && e.cancelable) {
        e.preventDefault();
      }

      lockDimensions();

      const margin = 10;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const maxX = vw - btnW - margin;
      const maxY = vh - btnH - margin;

      let newX;
      let newY;
      let tries = 0;

      do {
        newX = margin + Math.random() * (maxX - margin);
        newY = margin + Math.random() * (maxY - margin);
        tries++;
      } while (tries < 20 && overlapsCard(newX, newY));

      exitBtn.style.left = newX + 'px';
      exitBtn.style.top = newY + 'px';
    }

    // Exit button runs away

    exitBtn.addEventListener('mouseenter', jumpAway);

    exitBtn.addEventListener('touchstart', jumpAway, {
      passive: false
    });

    // If somehow clicked

    exitBtn.addEventListener('click', function (e) {

      e.preventDefault();

      mainCard.style.display = 'none';
      exitBtn.style.display = 'none';

      page19.classList.add('show');

    });

    // Enter button → Birthday page

    enterBtn.addEventListener('click', function () {

      mainCard.style.display = 'none';
      exitBtn.style.display = 'none';

      page19.classList.add('show');

    });

    // Button on birthday page → Video page

    if (backBtn) {

      backBtn.addEventListener('click', function () {

        page19.classList.remove('show');

        videoPage.style.display = 'block';

        birthdayVideo.currentTime = 0;

        birthdayVideo.play().catch(err => {
          console.log('Video autoplay blocked:', err);
        });

      });

    }

    // When video ends → Final page

    if (birthdayVideo) {

      birthdayVideo.addEventListener('ended', function () {

        videoPage.style.display = 'none';

        finalPage.classList.add('show');

      });

    }

  }

  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', init);

  } else {

    requestAnimationFrame(() => {
      requestAnimationFrame(init);
    });

  }

})();