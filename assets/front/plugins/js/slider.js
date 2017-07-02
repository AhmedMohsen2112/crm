(function( $ ) {
    'use strict';
    function animationSlider( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';
        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    //Variables on page load 
    var $myCarousel = $('#tsp_slider_main'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find('[data-animation ^= \'animated\']');
    //Initialize carousel 
    $myCarousel.carousel();
    //Animate captions in first slide on page load 
    animationSlider($firstAnimatingElems);
    //Pause carousel:  add 'pause'
    $myCarousel.carousel();
    //Other slides to be animated on carousel slide event 
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find('[data-animation ^= \'animated\']');
        animationSlider($animatingElems);
    });  
})(jQuery);