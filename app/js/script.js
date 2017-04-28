document.addEventListener('DOMContentLoaded', function() {
  var navToggler = document.querySelector('.nav-toggler');
  var siteCover = document.querySelector('.site-cover');

  function toggleSiteCover() {
    siteCover.classList.toggle('site-cover--opened');
  }

  if (navToggler) {
    navToggler.addEventListener('click', function(event) {
      event.preventDefault();
      toggleSiteCover();
    });
  }

});
