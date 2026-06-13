(function () {

  /* ── Element refs ── */
  const exitBtn       = document.getElementById('exitBtn');
  const enterBtn      = document.getElementById('enterBtn');
  const placeholder   = document.getElementById('placeholder');
  const page19        = document.getElementById('page19');
  const mainCard      = document.getElementById('mainCard');
  const backBtn       = document.getElementById('backBtn');
  const videoPage     = document.getElementById('videoPage');
  const birthdayVideo = document.getElementById('birthdayVideo');

  /* ══════════════════════════════════════════
     PAGE 1 — Escape button logic
  ══════════════════════════════════════════ */

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

      if (e && e.cancelable) e.preventDefault();

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
      }
      while (tries < 20 && overlapsCard(newX, newY));

      exitBtn.style.transition =
        'left 0.15s ease, top 0.15s ease';

      exitBtn.style.left = newX + 'px';
      exitBtn.style.top = newY + 'px';
    }

    exitBtn.addEventListener('mouseenter', jumpAway);
    exitBtn.addEventListener('touchstart', jumpAway, { passive: false });

    exitBtn.addEventListener('click', function (e) {
      e.preventDefault();
      showPage19();
    });

    enterBtn.addEventListener('click', function () {
      showPage19();
    });

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        // Prevent multiple clicks during the transition
        page19.style.pointerEvents = 'none';

        // Play the video and fade in the video page on top of page19
        showVideoPage();

        // After the 800ms transition concludes, safely hide page19
        setTimeout(() => {
          page19.classList.remove('show');
          page19.style.pointerEvents = '';
        }, 800);
      });
    }

    if (birthdayVideo) {

      birthdayVideo.addEventListener('ended', function () {

        videoPage.classList.remove('show');

        window.location.href = 'flower.html';
      });
    }

    const tempSkipBtn = document.getElementById('tempSkipBtn');
    if (tempSkipBtn) {
      tempSkipBtn.addEventListener('click', function () {
        if (birthdayVideo) {
          birthdayVideo.pause();
        }
        videoPage.classList.remove('show');
        window.location.href = 'flower.html';
      });
    }

    /* ════════════════════════════════════════
       FLOWERS
    ════════════════════════════════════════ */

    const petalContainer =
      document.getElementById('petalContainer');

    if (petalContainer) {

      const flowerSVGs = [

        /* Sakura Blossom */

        `<svg viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">

          <g fill="#ffd8e6">

            <ellipse cx="50" cy="18" rx="12" ry="20"
              transform="rotate(0,50,50)"/>

            <ellipse cx="50" cy="18" rx="12" ry="20"
              transform="rotate(72,50,50)"/>

            <ellipse cx="50" cy="18" rx="12" ry="20"
              transform="rotate(144,50,50)"/>

            <ellipse cx="50" cy="18" rx="12" ry="20"
              transform="rotate(216,50,50)"/>

            <ellipse cx="50" cy="18" rx="12" ry="20"
              transform="rotate(288,50,50)"/>

          </g>

          <circle cx="50" cy="50"
            r="8"
            fill="#fff"/>

        </svg>`,

        /* Pointed Sakura */

        `<svg viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">

          <g fill="#ffc7da">

            <path
              d="M50 5
                 L70 45
                 L50 95
                 L30 45 Z"/>

            <path
              d="M95 50
                 L55 70
                 L5 50
                 L55 30 Z"/>

          </g>

          <circle
            cx="50"
            cy="50"
            r="8"
            fill="#fff"/>

        </svg>`,

        /* Real Sakura Petal */

        `<svg viewBox="0 0 100 120"
          xmlns="http://www.w3.org/2000/svg">

          <defs>

            <linearGradient
              id="petal1"
              x1="0"
              y1="0"
              x2="0"
              y2="1">

              <stop
                offset="0%"
                stop-color="#ffd8e6"/>

              <stop
                offset="100%"
                stop-color="#ff9fc0"/>

            </linearGradient>

          </defs>

          <path
            d="
              M50 5
              C90 20 95 70 50 115
              C5 70 10 20 50 5Z
            "
            fill="url(#petal1)"
          />

          <path
            d="M50 5 L50 115"
            stroke="#fff4f8"
            stroke-width="2"
            opacity=".7"
          />

        </svg>`,

        /* White blossom */

        `<svg viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">

          <g fill="#ffffff">

            <ellipse cx="50" cy="18"
              rx="10"
              ry="16"
              transform="rotate(0,50,50)"/>

            <ellipse cx="50" cy="18"
              rx="10"
              ry="16"
              transform="rotate(60,50,50)"/>

            <ellipse cx="50" cy="18"
              rx="10"
              ry="16"
              transform="rotate(120,50,50)"/>

            <ellipse cx="50" cy="18"
              rx="10"
              ry="16"
              transform="rotate(180,50,50)"/>

            <ellipse cx="50" cy="18"
              rx="10"
              ry="16"
              transform="rotate(240,50,50)"/>

            <ellipse cx="50" cy="18"
              rx="10"
              ry="16"
              transform="rotate(300,50,50)"/>

          </g>

        </svg>`
      ];

      /* More flowers – fewer on mobile for perf */
      const isMobile = window.innerWidth <= 768;
      const flowerCount = isMobile ? 80 : 90;

      for (let i = 0; i < flowerCount; i++) {

        const flower =
          document.createElement('div');

        flower.className =
          'floating-flower';

        flower.innerHTML =
          flowerSVGs[
            Math.floor(
              Math.random() *
              flowerSVGs.length
            )
          ];

        const size =
          10 + Math.random() * 90;

        const startY =
          Math.random() * 100;

        const filterCSS = isMobile ? '' :
          `filter:
            blur(${Math.random()*0.7}px)
            drop-shadow(
              0 0 8px
              rgba(255,180,210,.3)
            );`;

        flower.style.cssText = `
          left:-100px;
          top:${startY}vh;

          width:${size}px;
          height:${size}px;

          --drift-y:${(Math.random()-0.5)*20}vh;
          --drift-y2:${(Math.random()-0.5)*35}vh;

          animation-duration:${20 + Math.random()*20}s;
          animation-delay:${-(Math.random()*40)}s;

          opacity:${0.12 + Math.random()*0.28};

          z-index:${Math.random() > 0.7 ? 5 : 2};

          ${filterCSS}
        `;

        petalContainer.appendChild(flower);
      }
    }
  }

  /* ════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════ */

  function showPage19() {

    mainCard.style.display = 'none';

    exitBtn.style.display = 'none';

    page19.classList.add('show');
  }

  function showVideoPage() {

    videoPage.classList.add('show');

    birthdayVideo.currentTime = 0;

    birthdayVideo.muted = false;

    birthdayVideo.play().catch(() => {

      birthdayVideo.muted = true;

      birthdayVideo.play().catch(err => {

        console.log(
          'Autoplay blocked:',
          err
        );
      });
    });
  }

  /* Boot */

  if (
    document.readyState === 'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      init
    );

  } else {

    requestAnimationFrame(() =>
      requestAnimationFrame(init)
    );
  }

})();