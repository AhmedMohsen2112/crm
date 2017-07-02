
    var cities_ids = {};
    var hotels_ids = {};
    var prices = {};
    var stars = {};
    var sort = {};
    var advantages_ids = {};
    var inputs_search = {};
    var Hotels_search = function () {

        var init = function () {
            get_inputs_search();
            show_more_hotels();
            handleChangeFilterByStars();
            handleFilterAscDesc();
            handleChangeFilterByAdvantages();
        }
        var get_inputs_search = function () {
            $(".input_search").each(function () {
                var input_name = $(this).attr('name');
                var input_value = $(this).val();
                if (input_value.length != 0) {
                    inputs_search[input_name] = input_value;
                }
            });
        }
        var show_more_hotels = function () {
            $(document).on('click', '.show-more-hotels', function () {
//                alert('here222');
//                return false;
                //$('.show-more-hotels').html('<img src="' + config.base_url + 'uploads/loader.gif" style="width:20px;height:25px;">');
                var all_hotels_count = $(this).attr('data-all-hotels-count');
                var current_length = $(this).attr('data-current-length');
                var city = $(this).attr('data-city-id');
                var action = config.base_url + 'hotels/moreHotelsForFilter';
                var data_1 = $.extend({}, cities_ids, hotels_ids);
                var data_2 = $.extend({}, data_1, prices);
                var data_3 = $.extend({}, data_2, stars);
                var data_4 = $.extend({}, data_3, sort);
                var data_5 = $.extend({}, data_4, advantages_ids);
                var data_6 = $.extend({}, data_5, inputs_search);
                var data = $.extend({}, data_6, {current_length: current_length, city: city});
                $.ajax({
                    url: action,
                    data: $.param(data),
                    async: false,
                    beforeSend: function () {
                        $('.loading-div').show();
                    },
                    success: function (data) {
                        if (all_hotels_count == current_length) {

                        } else {
                            $('.loading-div').show();
                            setTimeout(function () {
                                $('.list-content').prepend(data);
                                var new_length = $(document).find('.list-item-entry').length;
                                $('.show-more-hotels').attr('data-current-length', new_length);
                                if (all_hotels_count == new_length) {
                                    $('.show-more-hotels').hide();
                                }
                                $('.loading-div').hide();
                            }, 3000);

                        }
                        $('.show-more-hotels').html('المزيد');


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
        var handleChangeFilterByAdvantages = function () {
            $("input[id^='advantage_']").each(function () {
                $(this).on('change', function () {
                    var input_id = $(this).attr('id');
                    var input_value = $(this).val();
                    if ($(this).is(':checked')) {
                        advantages_ids[input_id] = input_value;
                    } else {
                        delete advantages_ids[input_id];
                    }
                    console.log(advantages_ids);
                    handleFilter();
                });
            });
        }
        var handleFilter = function () {
            var data_1 = $.extend({}, cities_ids, hotels_ids);
            var data_2 = $.extend({}, data_1, prices);
            var data_3 = $.extend({}, data_2, stars);
            var data_4 = $.extend({}, data_3, sort);
            var data_5 = $.extend({}, data_4, advantages_ids);
            var data = $.extend({}, data_5, inputs_search);
            //console.log(JSON.stringify(ids));
            //return false;
            $.ajax({
                url: config.base_url + "hotels/filter",
                type: 'POST',
                dataType: 'text',
                data: $.param(data),
                success: function (data)
                {
                    $('.pagy').hide();
                    $('.loading-div').show();
                    setTimeout(function () {
                        $(".list-content").html(data);
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

        return {
            init: function () {
                init();
            }
        }

    }();
    jQuery(document).ready(function () {
        Hotels_search.init();
    });


