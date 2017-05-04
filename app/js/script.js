document.addEventListener('DOMContentLoaded', function() {

  /*==================================
  =            Toggle nav            =
  ==================================*/

  var navToggler = document.querySelector('.nav-toggler');
  var siteCover = document.querySelector('.site-cover');
  var navTogglerIconItems = navToggler.querySelectorAll('.nav-toggler__icon');

  function toggleSiteCover() {
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
  =            Hello slider            =
  ====================================*/

  var helloSlider = new Swiper('.hello-slider', {
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
  })

  /*=====  End of Hello slider  ======*/


});
