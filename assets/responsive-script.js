var homeIcon = document.querySelector('.mobile-content-adjust');

window.onResize = function() {
  if (window.innerWidth <= 767) homeIcon.classList.add('center').remove('right');
  else homeIcon.classList.remove('center').add('right');
};



$( window ).resize(function() {
    if($(window).width() <=767) {
        $('i').toggleClass(function() {
           if ( $( this ).is( ".right .mobile-content-adjust" ) ) {
               console.log("class already there good to go");
           } else {
              $( this ).addClass("center");
           }
        }
    }else{
           $('i').removeClass("right");
    }

});