document.addEventListener('DOMContentLoaded', function() {

  /*==================================
  =            Toggle nav            =
  ==================================*/

  var navToggler = document.querySelector('.nav-toggler');
  var siteCover = document.querySelector('.site-cover');
  var navTogglerIconItems = navToggler.querySelectorAll('.nav-toggler__icon');

  function toggleSiteCover() {
    document.body.classList.toggle('no-scroll');
    siteCover.classList.toggle('site-cover--opened');
    Array.prototype.forEach.call(navTogglerIconItems, function(item) {
      item.classList.toggle('nav-toggler__icon--hidden');
    });
  }

  if (navToggler) {
    navToggler.addEventListener('click', function(event) {
      event.preventDefault();
      toggleSiteCover();
    });
  }

  /*=====  End of Toggle nav  ======*/



  /*=====================================
  =            Hello reviews            =
  =====================================*/

  var helloReviews = document.querySelector('.hello-reviews');

  if (helloReviews) {
    var helloReviewsItems = helloReviews.querySelectorAll('.hello-reviews__item');
    var helloReviewsItemsCount = (helloReviewsItems.length - 1);

    $(helloReviews).on('click', '.hello-reviews__reload', function() {
      var $self = $(this);
      var $helloReview = $self.closest('.hello-reviews__item');
      var helloReviewIndex = $helloReview.index();

      if (helloReviewIndex < helloReviewsItemsCount) {
        helloReviewIndex++;
      } else {
        helloReviewIndex = 0;
      }

      $(helloReviewsItems).removeClass('hello-reviews__item--active');
      helloReviewsItems[helloReviewIndex].classList.add('hello-reviews__item--active');
    });
  }

  /*=====  End of Hello reviews  ======*/



  /*====================================
  =            Inline popup            =
  ====================================*/

  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });

  /*=====  End of Inline popup  ======*/



  /*==================================
  =            Input mask            =
  ==================================*/

  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  /*=====  End of Input mask  ======*/



  /*====================================
  =            Hello slider            =
  ====================================*/

  var helloSlider = document.querySelector('.helloSlider');

  if (helloSlider) {
    var helloSliderSwiper = new Swiper(helloSlider, {
      speed: 600,
      // loop: true,
      effect: 'coverflow',
      pagination: '.hello-slider__pagination',
      paginationClickable: true,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 60,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false
      }
    });

    if (!window.matchMedia("(min-width: 768px)").matches) {
      helloSliderSwiper.destroy();
    }
  }

  /*=====  End of Hello slider  ======*/


  function getDominantColor(aImg) {
    let canvas = document.createElement("canvas");
    canvas.height = aImg.height;
    canvas.width = aImg.width;

    let context = canvas.getContext("2d");
    context.drawImage(aImg, 0, 0);

    // keep track of how many times a color appears in the image
    let colorCount = {};
    let maxCount = 0;
    let dominantColor = "";

    // data is an array of a series of 4 one-byte values representing the rgba values of each pixel
    let data = context.getImageData(0, 0, aImg.height, aImg.width).data;

    for (let i = 0; i < data.length; i += 4) {
      // ignore transparent pixels
      if (data[i + 3] == 0) continue;

      let color = data[i] + "," + data[i + 1] + "," + data[i + 2];
      // ignore white
      if (color == "255,255,255" || color == "0,0,0") continue;
      // if () continue;

      colorCount[color] = colorCount[color] ? colorCount[color] + 1 : 1;

      // keep track of the color that appears the most times
      if (colorCount[color] > maxCount) {
        maxCount = colorCount[color];
        dominantColor = color;
      }
    }

    let rgb = dominantColor.split(",");
    return rgb;
  }

  /*========================================
  =            Check work color            =
  ========================================*/

  var workItems = document.querySelectorAll('.work');

  $(window).on('load', function() {
    $(workItems).each(function() {
      var $self = $(this);
      var $workImage = $(this).find('.work__image');
      // console.log(getDominantColor(this));
      // $workImage.on('load', function() {
        console.log(this);
        $self.find('.work__overlay').css('background-color', 'rgba(' + getDominantColor($workImage[0]) + ', 1)');
      // });
    });

  });


  /*=====  End of Check work color  ======*/

});
