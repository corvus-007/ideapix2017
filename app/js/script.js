function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



document.addEventListener('DOMContentLoaded', function() {
  function elloSliderActive(swiper) {
    var activeSlide = swiper.snapIndex;

    $(helloSlider)
      .find('.hello-slide')
      .removeClass('hello-slide--active')
      .eq(activeSlide)
      .addClass('hello-slide--active');
  }
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
    var helloReviewIndex = Math.floor(Math.random() * helloReviewsItems.length);
    helloReviewsItems[helloReviewIndex].classList.add('hello-reviews__item--active');

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

  var helloSlider = document.querySelector('.hello-slider');

  if (helloSlider) {
    var helloSlideTitleItems = document.querySelectorAll('.hello-slide__title');
    Array.prototype.forEach.call(helloSlideTitleItems, function(helloSlideTitle) {
      helloSlideTitle.innerHTML = helloSlideTitle.innerText.replace(/./g, '<span>$&</span>');
      var helloTitleLetters = helloSlideTitle.querySelectorAll('span');

      Array.prototype.forEach.call(helloTitleLetters, function(letter) {
        letter.style.setProperty('--delay', getRandomArbitrary(0, 1) + 's');
      });
    });

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
      },
      onInit: function(swiper) {
        elloSliderActive(swiper);
      },
      onTransitionEnd: function(swiper) {
        elloSliderActive(swiper);
      }
    });

    if (!window.matchMedia("(min-width: 768px)").matches) {
      helloSliderSwiper.destroy();
    }
  }

  /*=====  End of Hello slider  ======*/



/*=====================================
=            Project ready            =
=====================================*/

var project = document.querySelector('.project');

if (project) {
  window.addEventListener('load', function() {
    project.classList.add('project--ready');
  });
}

/*=====  End of Project ready  ======*/



  /*========================================
  =            Check work color            =
  ========================================*/

  // var workItems = document.querySelectorAll('.pager-works__item, .work');

  var colorThief = new ColorThief();
  var $parentWork = null;

  $(window).on('load', function() {
    $('.js-check-color-image').each(function(index, image) {
      $parentWork = $(this).closest('.js-check-color-parent');
      $parentWork
        .find('.js-check-color-overlay')
        .css('background-color', 'rgb(' + colorThief.getColor(this).join(', ') + ')')
        .colourBrightness();
    });
  });



  /*=====  End of Check work color  ======*/

});
