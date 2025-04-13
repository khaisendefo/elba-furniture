const livingRoomCards = () => {
  const container = document.querySelector('.living-room__left');
  if (!container) return;

  const cards = container.querySelectorAll('.living-room__card');

  cards.forEach((card, index) => {
    let state = 0; 
    let originalZIndex = '';
    const inner = card.querySelector('.living-room__card-inner');

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
      } else if (state === 0) {
        inner.style.transform = 'rotateX(180deg)';
        state = 1;
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
};
livingRoomCards(); 

const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.body;

  function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('no-scroll');
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation(); // Не даем клик уйти наверх
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('.menu__nav-link');
    const isMenuOpen = menu.classList.contains('active');

    if (!clickedLink && isMenuOpen) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });

const livingRoom = () => {
  const sliderElement = document.querySelector('.living-room__slider');
  if (!sliderElement) return; 

  const splide = new Splide(sliderElement, {
    perPage: 1,
    perMove: 1,
    autoplay: true,
    interval: 2500,
    pauseOnHover: true,
    pagination: true,
    arrows: false,
  });

  splide.mount();
};
livingRoom();