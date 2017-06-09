function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

$(window).one('load', function () {
  document.body.classList.add('is-loaded');
  setTimeout(function () {
    $('.loader').remove();
  }, 500);
});

$(document).on('click', 'a[href]:not([href^="#"])', function (event) {
  event.preventDefault();
  var self = this;
  document.body.classList.remove('is-loaded');

  setTimeout(function () {
    location.href = self.href;
  }, 270);
});

document.addEventListener('DOMContentLoaded', function () {

  /*==================================
  =            Toggle nav            =
  ==================================*/

  var navToggler = document.querySelector('.nav-toggler');
  var siteCover = document.querySelector('.site-cover');
  var navTogglerIconItems = navToggler.querySelectorAll('.nav-toggler__icon');

  function toggleSiteCover() {
    document.body.classList.toggle('no-scroll');
    siteCover.classList.toggle('site-cover--opened');
    Array.prototype.forEach.call(navTogglerIconItems, function (item) {
      item.classList.toggle('nav-toggler__icon--hidden');
    });
  }

  if (navToggler) {
    navToggler.addEventListener('click', function (event) {
      event.preventDefault();
      toggleSiteCover();
    });
  }

  /*=====  End of Toggle nav  ======*/


  /*====================================
  =            Hello slider            =
  ====================================*/

  function helloSliderActive(swiper) {
    var activeSlide = swiper.snapIndex;

    $(helloSlider)
      .find('.hello-slide')
      .removeClass('hello-slide--active')
      .eq(activeSlide)
      .addClass('hello-slide--active');

  }
  var helloSlider = document.querySelector('.hello-slider');

  if (helloSlider) {
    var helloSlideTitleItems = document.querySelectorAll('.hello-slide__title');
    Array.prototype.forEach.call(helloSlideTitleItems, function (helloSlideTitle) {
      helloSlideTitle.innerHTML = helloSlideTitle.innerText.replace(/./g, '<span>$&</span>');
      var helloTitleLetters = helloSlideTitle.querySelectorAll('span');

      Array.prototype.forEach.call(helloTitleLetters, function (letter) {
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
      onInit: function (swiper) {
        setTimeout(function () {
          helloSliderActive(swiper);
        }, 500);
      },
      onTransitionEnd: function (swiper) {
        helloSliderActive(swiper);
      }
    });

    if (!window.matchMedia("(min-width: 768px)").matches) {
      helloSliderSwiper.destroy();
    }
  }

  /*=====  End of Hello slider  ======*/


  /*=====================================
  =            Hello reviews            =
  =====================================*/

  var helloReviews = document.querySelector('.hello-reviews');

  if (helloReviews) {
    var helloReviewsItems = helloReviews.querySelectorAll('.hello-reviews__item');
    var helloReviewsItemsCount = (helloReviewsItems.length - 1);
    var helloReviewIndex = Math.floor(Math.random() * helloReviewsItems.length);
    helloReviewsItems[helloReviewIndex].classList.add('hello-reviews__item--active');

    $(helloReviews).on('click', '.hello-reviews__reload', function () {
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



  /*=====================================
  =            Project ready            =
  =====================================*/

  var project = document.querySelector('.project');

  if (project) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        project.classList.add('project--ready');
      }, 500);
    });
  }

  /*=====  End of Project ready  ======*/



  /*========================================
  =            Check work color            =
  ========================================*/

  // var workItems = document.querySelectorAll('.pager-works__item, .work');

  var colorThief = new ColorThief();
  var $parentWork = null;

  $(window).on('load', function () {
    $('.js-check-color-image').each(function (index, image) {
      $parentWork = $(this).closest('.js-check-color-parent');
      $parentWork
        .find('.js-check-color-overlay')
        .css('background-color', 'rgb(' + colorThief.getColor(this).join(', ') + ')')
        .colourBrightness();
    });
  });

  /*=====  End of Check work color  ======*/


  /*===================================
  =            Popup cards            =
  ===================================*/

  var card = document.querySelector(".card");
  var cardWrapper = document.querySelector(".js-card-wrapper");
  var visibleCardWrapper = false;
  var gapBounding = 20;
  var pageWidth = 0;
  var pageHeight = 0;

  if (window.matchMedia("(min-width: 992px)").matches) {
    $(".cards").on("mouseenter", ".card", function (event) {
      visibleCardWrapper = true;
      toggleVisibilityCardWrapper();
      cardWrapper.appendChild(this.firstElementChild.cloneNode(true));

      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
      var cardMetriks = this.getBoundingClientRect();
      var popupWidth = cardWrapper.offsetWidth;
      var popupHeight = cardWrapper.offsetHeight;
      var cardWidth = this.offsetWidth;
      var cardHeight = this.offsetHeight;
      var cardLeft = cardMetriks.left + pageXOffset;
      var popupLeft = cardLeft - (popupWidth - cardWidth) / 2;
      var cardTop = cardMetriks.top + pageYOffset;
      var popupTop = cardTop - (popupHeight - cardHeight) / 2;

      console.log(popupWidth, popupHeight);

      if (popupLeft < gapBounding + pageXOffset) {
        var left = gapBounding + pageXOffset;
      } else if ((popupLeft + popupWidth) > (pageWidth - gapBounding + pageXOffset)) {
        left = (popupLeft - (popupLeft + popupWidth - (pageWidth - gapBounding + pageXOffset)))
      } else {
        left = popupLeft;
      }

      if (popupTop < gapBounding + pageYOffset) {
        var top = gapBounding + pageYOffset;
      } else if ((popupTop + popupHeight) > (pageHeight - gapBounding + pageYOffset)) {
        top = (popupTop - (popupTop + popupHeight - (pageHeight - gapBounding + pageYOffset)))
      } else {
        top = popupTop;
      }

      cardWrapper.style.cssText = 'top: ' + top + 'px; left: ' + left + 'px;';
    });

    $(cardWrapper).on("mouseleave", function (event) {
      visibleCardWrapper = false;
      toggleVisibilityCardWrapper();
    });
  }



  function toggleVisibilityCardWrapper() {
    if (visibleCardWrapper) {
      cardWrapper.classList.add("popup-card--visible");
    } else {
      cardWrapper.classList.remove("popup-card--visible");

      cardWrapper.innerHTML = '';
      cardWrapper.style.cssText = '';
    }
  }

  /*=====  End of Popup cards  ======*/

});
