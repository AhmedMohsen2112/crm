    $(document).ready(function () {
        'use strict';
        //back to top
        $('body').append('<a id="go-to-top"><span class="glyphicon glyphicon-chevron-up"></span></a>');
        $(window).scroll(function () {
            if ($(this).scrollTop() !== 0) {
                $('#go-to-top').fadeIn();
            } else {
                $('#go-to-top').fadeOut();
            }
        });
        $('#go-to-top').on("click", function () {
            $("html, body").animate({scrollTop: 0}, 600);
            return false;
        });

        //menu responsive use slicknav
        $('#menu').slicknav({
            label: '',
        });

        $('.slicknav_menu >a').on('click', function () {
            $(this).toggleClass('koi-close-menu');
            $('.slicknav_menu .slicknav_nav').toggleClass('show-menu');
            $('#tsp_bg_mobile').toggleClass('koi-bg-show-menu');
        });

        // Add carousel js.
        $('.tsp-owl-carousel').each(function () {
            var item_lg = $(this).data('item-lg');
            var item_md = $(this).data('item-md');
            var item_sm = $(this).data('item-sm');
            if (item_lg || item_md) {
                $(this).owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        400: {
                            items: item_sm
                        },
                        600: {
                            items: item_md
                        },
                        1000: {
                            items: item_lg
                        }
                    }
                });
            }
        });

        // NAV hotel detail
        $('.tsp-nav-hotel-detail ul li a').on('click', function (e) {
            e.preventDefault();
            $('.tsp-nav-hotel-detail ul li a').removeClass('active');
            $(this).addClass('active');
            $('body, html').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 600);
        });
        //date picker
        $('.tsp-date').datepicker({
            format: 'dd.mm.yyyy'
        });
    });