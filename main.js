window.onload = function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const sliderWrap = $('.slider-wrap');
  const slideMain = $('.slider-main');
  const slideItems = $$('.slider-items');
  const prevBtn = $('.slider-prev');
  const nextBtn = $('.slider-next');
  const dotItems = $$('.dot-item');
  const sliderLength = slideItems.length;

  let slideWidth = sliderWrap.offsetWidth;
  window.onresize = function () {
    slideWidth = sliderWrap.offsetWidth;
  };

  handleSlider();
  function handleSlider() {
    let index = 0;
    let posX = 0;
    setInterval(() => {
      handleSliderLoop();
    }, 3000);
    nextBtn.addEventListener('click', function () {
      handleSlider(1);
    });
    prevBtn.addEventListener('click', function () {
      handleSlider(-1);
    });

    dotItems.forEach(function (dot) {
      dot.onclick = function () {
        $('.dot-item.active').classList.remove('active');
        this.classList.add('active');
        const dataIndex = parseInt(dot.dataset.index);
        index = dataIndex;
        posX = index * -1 * slideWidth;
        slideMain.style = `transform: translateX(${posX}px)`;
      };
    });

    function handleSliderLoop() {
      posX -= slideWidth;
      index++;
      if (index >= sliderLength) {
        index = 0;
        posX = 0;
      }
      slideMain.style = `transform: translateX(${posX}px)`;
      $('.dot-item.active').classList.remove('active');
      dotItems[index].classList.add('active');
    }

    function handleSlider(dir) {
      if (dir === 1) {
        if (index >= sliderLength - 1) {
          index = sliderLength - 1;
          return;
        }
        posX -= slideWidth;
        slideMain.style = `transform: translateX(${posX}px)`;
        index++;
      } else if (dir === -1) {
        if (index <= 0) {
          index = 0;
          return;
        }
        posX += slideWidth;
        slideMain.style = `transform: translateX(${posX}px)`;
        index--;
      }
      $('.dot-item.active').classList.remove('active');
      dotItems[index].classList.add('active');
    }
  }
};
