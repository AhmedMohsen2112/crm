
    var cities_ids = {};
    var hotels_ids = {};
    var prices = {};
    var stars = {};
    var sort = {};
    var inputs_search = {};
    var Programs_search = function () {

        var init = function () {
            get_inputs_search();
            console.log(inputs_search);
            handleShowMorePrograms();
            handleChangeFilterByPrice();
            handleChangeFilterByStars();
            handleFilterAscDesc();
        }
        var get_inputs_search = function () {
            $(".input_search").each(function () {
                var input_name = $(this).attr('name');
                //alert(input_name);
                var input_value = $(this).val();
                if (input_value.length != 0) {
                    inputs_search[input_name] = input_value;
                }
            });
        }
        var handleFilter = function () {
            var data_1 = $.extend({}, cities_ids, hotels_ids);
            var data_2 = $.extend({}, data_1, prices);
            var data_3 = $.extend({}, data_2, stars);
            var data_4 = $.extend({}, data_3, sort);
            var data = $.extend({}, data_4, inputs_search);
            $.ajax({
                url: config.base_url + "search/filter",
                type: 'POST',
                dataType: 'text',
                data: $.param(data),
                success: function (data)
                {
                    $('.pagy').hide();
                    $('.loading-div').show();
                    setTimeout(function () {
                        $(".programs-content").html(data);
                        $('.loading-div').hide();
                    }, 3000);


                },
                error: function (xhr, textStatus, errorThrown) {
                    //$('.loading').addClass('hide');
                    bootbox.dialog({
                        message: xhr.responseText,
                        title: 'sssss',
                        buttons: {
                            danger: {
                                label: 'esss',
                                className: "red"
                            }
                        }
                    });
                },
            });
        }

        var handleShowMorePrograms = function () {
            $(document).on('click', '.show-more-programs', function () {
                var all_programs_count = $(this).attr('data-all-programs-count');
                var current_length = $(this).attr('data-current-length');
                var action = config.base_url + 'programs/morePrograms';
                var data_1 = $.extend({}, cities_ids, hotels_ids);
                var data_2 = $.extend({}, data_1, prices);
                var data_3 = $.extend({}, data_2, stars);
                var data_4 = $.extend({}, data_3, sort);
                var data_5 = $.extend({}, data_4, inputs_search);
                var data = $.extend({}, data_5, {current_length: current_length});
                $.ajax({
                    url: action,
                    data: $.param(data),
                    async: false,
                    beforeSend: function () {
                        $('.show-more-programs').html('<img src="' + config.base_url + 'uploads/loading.gif" style="width:20px;height:25px;">');
                    },
                    success: function (data) {
                        if (all_programs_count == current_length) {

                        } else {
                            $('.loading-div').show();
                            setTimeout(function () {
                                $('.programs-content').prepend(data);
                                var new_length = $(document).find('.list-item-entry').length;
                                //alert(new_length)
                                $('.show-more-programs').attr('data-current-length', new_length);
                                if (all_programs_count == new_length) {
                                    $('.show-more-programs').hide();
                                }
                                $('.loading-div').hide();
                            }, 3000);

                        }
                        $('.show-more-programs').html('المزيد');


                    },
                    error: function (xhr, textStatus, errorThrown) {
                        bootbox.dialog({
                            message: xhr.responseText,
                            title: 'رسالة تنبيه',
                            buttons: {
                                danger: {
                                    label: 'اغلاق',
                                    className: "red"
                                }
                            }
                        });
                    },
                    dataType: "text",
                    type: "POST"
                });
                return false;
            });
        }

        var handleChangeFilterByPrice = function () {
            $("#slider-range").slider({
                range: true,
                min: price.min,
                max: price.max,
                values: [price.min, price.max],
                slide: function (event, ui) {
                    $("#price_start").val("Egp" + ui.values[ 0 ]);
                    $("#price_end").val("Egp" + ui.values[ 1 ]);
                },
                change: function () {
                    //alert('sss');
                    var price_start = $("#price_start").val();
                    var price_end = $("#price_end").val();
                    prices['price_start'] = price_start;
                    prices['price_end'] = price_end;
                    handleFilter();
                }
            });
            $("#price_start").val("Egp" + $("#slider-range").slider("values", 0));
            $("#price_end").val("Egp" + $("#slider-range").slider("values", 1));
        }
        var handleChangeFilterByStars = function () {
            $("input[id^='star_']").each(function () {
                $(this).on('change', function () {
                    var input_id = $(this).attr('id');
                    var input_value = $(this).val();
                    if ($(this).is(':checked')) {
                        stars[input_id] = input_value;
                    } else {
                        delete stars[input_id];
                    }
                    console.log(stars);
                    handleFilter();
                });
            });
        }
        var handleFilterAscDesc = function () {
            $('.sort').on('click', function () {
                var sort_type = $(this).data('sort-type');
                var sort_value = $(this).data('sort-value');
                var new_limit = $(document).find('.list-item-entry').length;
                sort['sort_type'] = sort_type;
                sort['sort_value'] = sort_value;
                sort['new_limit'] = new_limit;

                console.log(sort);
                handleFilter();
                return false;
            });
        }
        var propChecked = function (elem) {
            $("." + elem).each(function () {
                $(this).prop('checked', false);
            });
        }
        return {
            init: function () {
                init();
            }
        }

    }();
    jQuery(document).ready(function () {
        Programs_search.init();
        check_next_prev_active_after_loading_page(false);

        /*handle how many of links i want to show*/

        if ($('.pagy > a.page.active').length > 0) {
            var current_href = $('.pagy > a.page.active').attr('href');
            var i = current_href.lastIndexOf('-');
            var current_page_number = parseInt(current_href.substr(i + 1));
            $(".pagy  > a.page:gt('" + (current_page_number) + "')").hide();
        }


        /*end*/

        /*handle links clicked*/
        $(document).on('click', '.pagy > a.page', function () {
            check_next_prev_active_after_loading_page($(this));
            History.pushState(null, null, $(this).attr("href"));
            $(this).addClass('active').siblings('a').removeClass('active');
            var totalPagesVisisble = $('.pagy > a.page:visible').length;
            $(".pagy > a.page").show();
            $(".pagy > a.page:gt('" + (totalPagesVisisble + 1) + "')").hide();
            var url = $(this).attr('href');
            var data_1 = $.extend({}, cities_ids, hotels_ids);
            var data_2 = $.extend({}, data_1, prices);
            var data_3 = $.extend({}, data_2, stars);
            var data_4 = $.extend({}, data_3, sort);
            var data = $.extend({}, data_4, inputs_search);
            $.ajax
                    ({
                        type: 'POST',
                        url: url,
                        data: $.param(data),
                        success: function (data)
                        {
                            $(".programs-content").html(data);
                        }
                    });
            return false;
        });
        /*handle next clicked*/
        $(document).on('click', '.pagy .next', function () {
            check_prev_next_active_when_clicked('next');
            /*handle how many of links i want to show when i click next*/
            var totalPagesVisisble = $('.pagy > a.page:visible').length;
            $(".pagy > a.page").show();
            $(".pagy > a.page:gt('" + (totalPagesVisisble + 1) + "')").hide();
            /**/
            var href = $('.pagy > a.page.active').attr('href');
            var i = href.lastIndexOf('-');
            var next_page_number = parseInt(href.substr(i + 1)) + 1;
            var pages = parseInt($('.total_pages').html());
            var next_page_url = href.substr(0, i) + "-" + next_page_number;
            //alert(next_page_number);
            History.pushState(null, null, next_page_url);
            var data_1 = $.extend({}, cities_ids, hotels_ids);
            var data_2 = $.extend({}, data_1, prices);
            var data_3 = $.extend({}, data_2, stars);
            var data_4 = $.extend({}, data_3, sort);
            var data = $.extend({}, data_4, inputs_search);
            $.ajax
                    ({
                        type: 'POST',
                        url: next_page_url,
                        data: $.param(data),
                        success: function (data)
                        {
                            $(".programs-content").html(data);
                        }
                    });
            $('.pagy > a.page.active').removeClass('active').next().addClass('active');
            return false;
        });
        /*handle prev clicked*/
        $(document).on('click', '.pagy .prev', function () {
            check_prev_next_active_when_clicked('prev');
            /*handle how many of links i want to show when i click prev*/
            var totalPagesVisisble = $('.pagy > a.page:visible').length;
            $(".pagy > a.page").show();
            $(".pagy > a.page:gt('" + (totalPagesVisisble - 1) + "')").hide();
            /*end*/
            var href = $('.pagy > a.page.active').attr('href');
            var i = href.lastIndexOf('-');
            var prev_page_number = parseInt(href.substr(i + 1)) - 1;
            var prev_page_url = href.substr(0, i) + "-" + prev_page_number;
            //alert(prev_page_number);
            History.pushState(null, null, prev_page_url);
            var data_1 = $.extend({}, cities_ids, hotels_ids);
            var data_2 = $.extend({}, data_1, prices);
            var data_3 = $.extend({}, data_2, stars);
            var data_4 = $.extend({}, data_3, sort);
            var data = $.extend({}, data_4, inputs_search);
            $.ajax
                    ({
                        type: 'POST',
                        url: prev_page_url,
                        data: $.param(data),
                        success: function (data)
                        {
                            console.log(data);
                            $(".programs-content").html(data);
                        }
                    });
            $('.pagy > a.page.active').removeClass('active').prev().addClass('active');
            return false;
        });
    });

    function check_prev_next_active_when_clicked(type) {


        var current_href = $('.pagy > a.page.active').attr('href');
        var i = current_href.lastIndexOf('-');
        var pages = parseInt($('.total_pages').html());
        //alert(pages);
        if (type == 'next') {
            var current_page_number = parseInt(current_href.substr(i + 1)) + 1;
        } else {
            var current_page_number = parseInt(current_href.substr(i + 1)) - 1;

        }
        if (current_page_number >= pages) {
            $('.pagy .next').hide();
        } else {
            $('.pagy .next').show();
        }
        if (current_page_number == 1) {
            $('.pagy .prev').hide();
        } else {
            $('.pagy .prev').show();
        }


    }

    function check_next_prev_active_after_loading_page(t) {

        if ($('.pagy > a.page.active').length > 0) {
            var element;
            if (t) {
                element = t;
            } else {
                element = $('.pagy > a.page.active');
            }
            var current_href = element.attr('href');
            var i = current_href.lastIndexOf('-');
            var current_page_number = parseInt(current_href.substr(i + 1));
            var pages = parseInt($('.total_pages').html());
            if (current_page_number == 1) {
                $('.pagy .prev').hide();
            } else {
                $('.pagy .prev').show();
            }
            if (current_page_number >= pages) {
                $('.pagy .next').hide();
            } else {
                $('.pagy .next').show();
            }
        }

    }


