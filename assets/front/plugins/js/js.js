

    /**********************************************************
     BEGIN: PRELOADER
     **********************************************************/
    $(window).load(function () {
        "use strict";
        $("#loader").fadeOut("slow");
    });

    /**********************************************************
     BEGIN: OWL CAROUSELS
     **********************************************************/
    jQuery(document).ready(function ($) {
        "use strict";
        if (jQuery().owlCarousel) {
            /* BLOG POST CAROUSEL */
            if (jQuery("#post-list").length) {
                jQuery("#post-list").owlCarousel({
                    loop: true,
                    margin: 30,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navigation: false,
                    stopOnHover: true,
                    responsive: {
                        0: {
                            items: 1,
                            loop: true
                        },
                        600: {
                            items: 2,
                            loop: true
                        },
                        1000: {
                            items: 4,
                            loop: true
                        }
                    }
                });
            }

            /* HOMEPAGE OFFER SLIDER */
            if (jQuery("#offer1").length) {
                jQuery("#offer1").owlCarousel({
                    loop: true,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navigation: false,
                    stopOnHover: true,
                    responsive: {
                        1000: {
                            items: 1,
                            loop: true
                        }
                    }
                });
            }

            /* index-4.html FLIGHT OFFER SLIDER */
            if (jQuery("#flightoffer").length) {
                jQuery("#flightoffer").owlCarousel({
                    loop: true,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    navigation: false,
                    stopOnHover: true,
                    responsive: {
                        0: {
                            items: 1,
                            loop: true
                        }
                    }
                });
            }

            /* ABOUT US PAGE PRTNERS SLIDER */
            if (jQuery("#partner").length) {
                jQuery("#partner").owlCarousel({
                    loop: true,
                    margin: 20,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navigation: false,
                    stopOnHover: true,
                    responsive: {
                        0: {
                            items: 1,
                            loop: true
                        },
                        600: {
                            items: 2,
                            loop: true
                        },
                        1000: {
                            items: 4,
                            loop: true
                        }
                    }
                });
            }

            /* LAST MINUTE DEALS SLIDER */

            if (jQuery("#lastminute").length) {
                jQuery("#lastminute").owlCarousel({
                    loop: true,
                    responsiveClass: true,
                    margin: 30,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navigation: false,
                    stopOnHover: true,
                    responsive: {
                        0: {
                            items: 1,
                            loop: true
                        },
                        600: {
                            items: 2,
                            loop: true
                        },
                        1000: {
                            items: 4,
                            loop: true
                        }
                    }
                });
            }
            if (jQuery("#review-customer").length) {
                jQuery("#review-customer").owlCarousel({
                    loop: true,
                    margin: 10,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navigation: false,
                    stopOnHover: true,
                    responsive: {
                        0: {
                            items: 1,
                            loop: true
                        },
                        600: {
                            items: 1,
                            loop: true
                        },
                        1000: {
                            items: 1,
                            loop: true
                        }
                    }
                });
            }
            if (jQuery("#lowest-fare").length) {
                jQuery("#lowest-fare").owlCarousel({
                    loop: true,
                    margin: 10,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navigation: true,
                    stopOnHover: true,
                    responsive: {
                        0: {
                            items: 2,
                            loop: true,
                            navText: ["<i class='fa fa-chevron-left owl-navigation-icon-blue'>", "<i class='fa fa-chevron-right owl-navigation-icon-blue'>"],
                            nav: true
                        },
                        600: {
                            items: 3,
                            loop: true,
                            navText: ["<i class='fa fa-chevron-left owl-navigation-icon-blue'>", "<i class='fa fa-chevron-right owl-navigation-icon-blue'>"],
                            nav: true
                        },
                        1000: {
                            items: 5,
                            loop: true,
                            navText: ["<i class='fa fa-chevron-left owl-navigation-icon-blue'>", "<i class='fa fa-chevron-right owl-navigation-icon-blue'>"],
                            nav: true
                        }
                    }
                });
            }
        }
    });


    /***************************************************************
     BEGIN: VARIOUS DATEPICKER & SPINNER INITIALIZATION
     ***************************************************************/
//    $(function () {
//        "use strict";
//        new WOW().init();
//        $("#departure_date").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#return_date").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#check_out").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#check_in").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#package_start").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#car_start").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#car_end").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#cruise_start").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#amr1").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#amr2").datepicker({minDate: -0, maxDate: "+3M"});
//        $("#adult_count,#adult_count2,#adult_count3,#adult_count4,#adult_count5,#adult_count6,#adult_count7,#adult_count8,#adult_count9,#no_of_nights_maka").spinner({
//            min: 1
//        });
//        $("#child_count,#child_count2,#child_count3,#child_count4,#child_count5").spinner({
//            min: 1
//        });
//        $("#hotel_adult_count").spinner({
//            min: 1
//        });
//        $("#hotel_child_count").spinner({
//            min: 1
//        });
//        $('.selectpicker').selectpicker({
//            style: 'custom-select-button'
//        });
//        $("input[id^='no_of_nights_']").spinner({
//            min: 0
//        });
//        $("input[id^='no_of_']").spinner({
//            min: 0
//        });
//    });


    /**********************************************************************
     BEGIN: VIEW SWITCHER
     ***********************************************************************/
    $(document).ready(function () {
        "use strict";
        $('.view-switcher a').on('click', function (e) {
            if ($(this).hasClass('switchgrid')) {
                $('.switchable > div').removeClass('hotel-list-view').addClass('product-grid-view');
            } else if ($(this).hasClass('switchlist')) {
                $('.switchable > div').removeClass('product-grid-view').addClass('hotel-list-view');
            }
        });
    });
    /**********************************************************************
     BEGIN: STYLESHEET SWITCHER
     ***********************************************************************/
    $('#color-switcher ul li').on('click', function () {
        "use strict";
        var path = $(this).data('path');
        $('#select-style').attr('href', path);
    });

    $('#stoggle').on('click', function () {
        "use strict";
        var effect;
        var direction;
        var duration;
        effect = 'slide';
        duration = 400;
        $('#color-switcher').toggle(effect, duration);
    });

    $('#closex').on('click', function () {
        "use strict";
        var effect;
        var direction;
        var duration;
        effect = 'slide';
        duration = 400;
        $('#color-switcher').toggle(effect, duration);
    });


    if (document.body.dir == "rtl") {

    } else {

    }

    /*****************************////

//    $('.next').click(function () {
//
//        var nextId = $(this).parents('.tab-pane').next().attr("id");
//        $('[href=#' + nextId + ']').tab('show');
//        return false;
//
//    })

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

        //update progress
        var step = $(e.target).data('step');
        var percent = (parseInt(step) / 6) * 100;

        $('.progress-bar').css({width: percent + '%'});
        $('.progress-bar').text("خطوة " + step + "من 6");

        //e.relatedTarget // previous tab

    })




///////////////////////////////


$(document).ready(function () {
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

//    $(".next-step").click(function (e) {
//
//        var $active = $('#myWizard .nav-pills li.active');
//        $active.next().removeClass('disabled');
//        nextTab($active);
//
//    });
//    $(".prev-step").click(function (e) {
//
//        var $active = $('#myWizard  .nav-pills li.active');
//        prevTab($active);
//
//    });
});

//function nextTab(elem) {
//    $(elem).next().find('a[data-toggle="tab"]').click();
//}
//function prevTab(elem) {
//    $(elem).prev().find('a[data-toggle="tab"]').click();
//}


//////////////////////

//$(document).ready(function () {
//            $('.navbar a.dropdown-toggle').on('mouseover', function (e) {
//                var $el = $(this);
//                var $parent = $(this).offsetParent(".dropdown-menu");
//                $(this).parent("li").toggleClass('open');
//
//                if (!$parent.parent().hasClass('nav')) {
//                    $el.next().css({"top": $el[0].offsetTop, "right": $parent.outerWidth() - 4});
//                }
//
//                $('.nav li.open').not($(this).parents("li")).removeClass("open");
//
//                return false;
//            });
//        });





    $('ul.slimmenu').slimmenu({
        resizeWidth: '992',
        collapserTitle: 'القائمة ',
        animSpeed: 250,
        indentChildren: true,
        childrenIndenter: ''
    });









