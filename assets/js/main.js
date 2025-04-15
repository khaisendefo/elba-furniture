const cardAnimations = () => {
  const containers = document.querySelectorAll('.card-container');

  containers.forEach(container => {
    const cards = container.querySelectorAll('.card');

    cards.forEach((card, index) => {
      let state = 0;
      let originalZIndex = '';
      const inner = card.querySelector('.card-inner');

      const setTransformOrigin = () => {
        if (window.innerWidth <= 768) {
          card.style.transformOrigin = index === 0 ? 'left top' : 'right top';
        } else {
          card.style.transformOrigin = index === 0 ? 'left top' : 'left bottom';
        }
      };

      const calculateScale = () => {
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        return window.innerWidth <= 768
          ? containerRect.width / cardRect.width
          : containerRect.height / cardRect.height;
      };

      card.addEventListener('click', (e) => {
        e.stopPropagation();

        if (state === 0) {
          inner.style.transform = 'rotateX(180deg)';
          state = 1;
        } else if (state === 1) {
          originalZIndex = getComputedStyle(card).zIndex;
          card.style.zIndex = '1000';
          card.style.transform = `scale(${calculateScale()})`;
          card.classList.add('expanded');
          state = 2;
        } else if (state === 2) {
          card.style.transform = '';
          card.classList.remove('expanded');
          setTimeout(() => {
            inner.style.transform = '';
            card.style.zIndex = originalZIndex;
          }, 500);
          state = 0;
        }
      });

      window.addEventListener('scroll', () => {
        if (state > 0) {
          card.style.transform = '';
          card.classList.remove('expanded');
          setTimeout(() => {
            inner.style.transform = '';
            card.style.zIndex = originalZIndex;
            state = 0;
          }, 500);
        }
      });

      setTransformOrigin();
      window.addEventListener('resize', setTransformOrigin);
    });
  });
};
cardAnimations();

const burgerMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.menu__overlay');
  const body = document.body;

  function openMenu() {
    burger.classList.add('active');
    menu.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('no-scroll');
  }

  function closeMenu() {
    burger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('active') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', () => {
    closeMenu();
  });

  document.addEventListener('click', (e) => {
    const isNavLink = e.target.closest('.menu__nav-link');

    if (!isNavLink && menu.classList.contains('active')) {
      closeMenu();
    }
  });
};
burgerMenu();

const initSliders = () => {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(sliderElement => {
    new Splide(sliderElement, {
      perPage: 1,
      perMove: 1,
      autoplay: true,
      interval: 2500,
      pauseOnHover: true,
      pagination: true,
      arrows: false,
    }).mount();
  });
};
initSliders();

