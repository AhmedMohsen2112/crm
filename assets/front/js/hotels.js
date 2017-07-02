
    var cities_ids = {};
    var hotels_ids = {};
    var prices = {};
    var stars = {};
    var sort = {};
    var advantages_ids = {};
    var map;
    var Hotels = function () {

        var init = function () {
            show_more_hotels();
            handleShowAndHideFiltersByCity();
            handleShowAndHideFiltersByHotel();
            handleChangeFilterByCity();
            handleChangeFilterByHotel();
            handleChangeFilterByStars();
            handleFilterAscDesc();
            handleChangeFilterByAdvantages();


        }


        var show_more_hotels = function () {
            $(document).on('click', '#show-more-btn', function () {
                $('#show-more-btn').html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
                $('#show-more-btn').prop('disabled', true);
                var all_hotels_count = $(this).attr('data-all-hotels-count');
                var city_id = $(this).attr('data-city-id');
                var hotels_length_before_click = $(document).find('.hotel-box').length;
                var action = config.site_url + 'ajax/moreHotels';
                $.ajax({
                    url: action,
                    data: {offset: hotels_length_before_click, city_id: city_id},
                    async: false,
                    beforeSend: function () {

                    },
                    success: function (data) {
                        console.log(data);
                        var html = '';
                        if (data.type == 'success') {
                            for (var x = 0; x < data.data.length; x++) {
                                var hotel_title = data.data[x][lang.title_slug];
                                var city_title = data.data[x]['city'][lang.title_slug];
                                var hotel_title_url = hotel_title.replace(' ', '-');
                                var city_title_url = city_title.replace(' ', '-');
                                var image = data.data[x].image;
                                var image_url = image.substr(image.indexOf('_') + 1)
                                html += '<div class="col-md-4 col-sm-6 pull-left hotel-box">' +
                                        '<div class="holiday-grid-view">' +
                                        '<div class="holiday-header-wrapper">' +
                                        '<div class="holiday-header">' +
                                        '<div class="holiday-img">' +
                                        '<img src="' + config.url + 'uploads/maka_madina_hotels/m_' + image_url + '" alt="cruise">' +
                                        '</div>' +
                                        '<div class="detail">' +
                                        '<a href="' + config.site_url + 'property/' + hotel_title_url + '-' + data.data[x].id + '/' + city_title_url + '-' + data.data[x]['city']['id'] + '"><i class="fa fa-link"></i></a>' +
                                        '</div>' +
                                        '<div class="holiday-title">' +
                                        '<h3> ' + hotel_title + '</h3>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                            }
                            setTimeout(function () {
                                $('#hotels-content').append(html);
                                var hotels_length_after_click = $(document).find('.hotel-box').length;
                                if (hotels_length_after_click == all_hotels_count) {
                                    $('.show-more-box').hide();
                                }
                            }, 2000);
                            setTimeout(function () {
                                $('#show-more-btn').html(lang.show_more);
                                $('#show-more-btn').prop('disabled', false);
                            }, 2000);


                        }


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
                    dataType: "JSON",
                    type: "POST"
                });
                return false;
            });
        }
        var handleShowAndHideFiltersByCity = function () {
            $('#city_name').on('keyup', function () {
                cities_ids = {};
                var city_name = $(this).val();
                $.ajax({
                    url: config.base_url + "hotels/getCitiesLike",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        column: 'title_' + lang.lang_code,
                        value: city_name,
                    },
                    success: function (data)
                    {
                        //console.log(data);
                        if (data.type == 'success') {
                            var title = 'title_' + lang.lang_code;
                            var html = '';
                            var count = 1;
                            for (var x = 0; x < data.data.length; x++) {
                                var input_id = 'city_id_' + count;
                                for (var i in data.data[x]) {
                                    if (i == 'title_ar') {

                                        html += '<div class="checkbox">' +
                                                '<label>' +
                                                '<input type="checkbox" class="city_id" id="' + input_id + '" value="' + data.data[x].id + '">' +
                                                data.data[x][title] +
                                                ' </label>' +
                                                ' </div>';

                                    }

                                }
                                count++;
                            }
                            $('#panel-cities .ul-box').html(html);

                        } else {
                            $('#panel-cities .ul-box').html('');

                        }


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
            });
        }
        var handleShowAndHideFiltersByHotel = function () {
            $('#hotel_name').on('keyup', function () {
                hotels_ids = {};
                var hotel_name = $(this).val();
                $.ajax({
                    url: config.base_url + "hotels/getHotelsLike",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        column: 'title_' + lang.lang_code,
                        value: hotel_name,
                    },
                    success: function (data)
                    {
                        //console.log(data);
                        if (data.type == 'success') {
                            var title = 'title_' + lang.lang_code;
                            var html = '';
                            var count = 1;
                            for (var x = 0; x < data.data.length; x++) {
                                var input_id = 'hotel_id_' + count;
                                for (var i in data.data[x]) {
                                    if (i == 'title_ar') {
                                        html += '<div class="checkbox">' +
                                                '<label>' +
                                                '<input type="checkbox" class="hotel_id" id="' + input_id + '" value="' + data.data[x].id + '">' +
                                                data.data[x][title] +
                                                ' </label>' +
                                                ' </div>';
                                    }

                                }
                                count++;
                            }
                            $('#panel-hotels .ul-box').html(html);

                        } else {
                            $('#panel-hotels .ul-box').html('');

                        }


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
            });
        }
        var handleChangeFilterByCity = function () {
            $(document).on('change', '.city_id', function () {
                var input_id = $(this).attr('id');
                var input_value = $(this).val();
                if ($(this).is(':checked')) {
                    cities_ids[input_id] = input_value;
                } else {
                    delete cities_ids[input_id];
                }
                console.log(cities_ids);
                handleFilter();
            });
        }
        var handleChangeFilterByHotel = function () {
            $(document).on('change', '.hotel_id', function () {
                var input_id = $(this).attr('id');
                var input_value = $(this).val();
                if ($(this).is(':checked')) {
                    hotels_ids[input_id] = input_value;
                } else {
                    delete hotels_ids[input_id];
                }
                console.log(hotels_ids);
                handleFilter();
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
            var data = $.extend({}, data_4, advantages_ids);
            //console.log(JSON.stringify(ids));
            //return false;
            $.ajax({
                url: config.base_url + "hotels/index",
                type: 'POST',
                dataType: 'text',
                data: $.param(data),
                success: function (data)
                {
                    $('.show-more-hotels').hide();
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
        Hotels.init();
    });


