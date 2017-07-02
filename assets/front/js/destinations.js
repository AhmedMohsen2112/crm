
    var Destinations = function () {

        var init = function () {
            handleGetHotelsOnScroll();
            handleGetShrinesOnScroll();
            handleInOutEgyptForCities();
            handleGetProgramsOnScroll();
            handleGetDestinationsOnScroll();
        }

        var handleGetDestinationsOnScroll = function () {
            $(document).on('click', '.more-destinations', function () {

                var cities_count = $('#cities_count').val(); //all cities
                var city_box_length = $(document).find('.city-box').length;

                var action = config.base_url + 'ajax/cities';
                $.ajax({
                    url: action,
                    data: {offset: city_box_length},
                    async: false,
                    beforeSend: function () {

                    },
                    success: function (data) {

                        console.log(data);
                        if (data.type == 'success') {
                            var html = '';
                            for (var x = 0; x < data.data.length; x++) {
                                var country_name = 'country_title_' + lang.lang_code;
                                var country_title = 'title_' + lang.lang_code;
                                var country_desc = 'desc_' + lang.lang_code;
                                var name = data.data[x][country_name];
                                var title = data.data[x][country_title];
                                var desc = data.data[x][country_desc];
                                var country_title_url = name.replace(' ', '-');
                                var city_title_url = title.replace(' ', '-');
                                var image = data.data[x].image;
                                var image_url = image.substr(image.indexOf('_') + 1)
                                html += '<div class="city-box col-md-4 col-sm-6 col-xs-12 mb15">' +
                                        '<div class="item our-testimonials-item">' +
                                        '<img src="' + config.url + 'uploads/places/m_' + image_url + '" width="800" height="533" class="img-responsive" alt="">' +
                                        '<div class="des_det">' +
                                        '<h1><a href="' + config.base_url + 'destinations/' + city_title_url + '-' + data.data[x].id + '/' + country_title_url + '-' + data.data[x].place_id + '">' + name + '</a></h1>' +
                                        '<h6>' + title + '</h6>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                            }
                            $('.more-box').html('<img src="' + config.url + 'loader.gif"  style="position:absolute;top:0%;left:50%;margin-left: -30px;">');
                            setTimeout(function () {
                                $('#destinations').append(html);
                                $('.more-box').html('<a class="btn btn-default more-destinations text-center" style="width:100%;">' + lang.more + '</a>'); //all cities
                                var city_box_length_after = $(document).find('.city-box').length;
                                if (city_box_length_after == cities_count) {
                                    $('.more-box').hide();
                                }
                            }, 3000);
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
        var handleGetHotelsOnScroll = function () {
            var all_hotels_count = $('#all_hotels_count').val();
            var current_length = $(document).find('.hotel_item_container').length;
            if (all_hotels_count > current_length) {
                $('#hotels_container').css({
                    'overflow-y': 'scroll'
                });
            }
            $('#hotels_container').on('scroll', function () {
                var hotels_items_length = $(document).find('.hotel_item_container').length;
                var container_height = $(this).innerHeight();//146
                var container_scroll_height = $(this)[0].scrollHeight; //256
                var container_scroll_top = $(this).scrollTop(); //58
                var city = $('#city_id').val();
                if (container_scroll_top == container_scroll_height - container_height) {  //يبئا هوا كدا فى أخر الكونتينر
                    if (all_hotels_count > current_length) {
                        var action = config.base_url + 'ajax/moreHotels';
                        //alert(action);
                        $.ajax({
                            url: action,
                            data: {current_length: hotels_items_length, city: city},
                            async: false,
                            beforeSend: function () {

                            },
                            success: function (data) {
                                $('#hotels_container').append(data);
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
                    }
                }
            });
        }
        var handleGetShrinesOnScroll = function () {
            var all_shrines_count = $('#all_shrines_count').val();
            var current_length = $(document).find('.shrine_item_container').length;
            if (all_shrines_count > current_length) {
                $('#shrines_container').css({
                    'overflow-y': 'scroll'
                });
            }
            $('#shrines_container').on('scroll', function () {
                var shrines_items_length = $(document).find('.shrine_item_container').length;
                //alert(shrines_items_length);
                var container_height = $(this).innerHeight();//146
                var container_scroll_height = $(this)[0].scrollHeight; //256
                var container_scroll_top = $(this).scrollTop(); //58
                var city = $('#city_id').val();
                if (container_scroll_top == container_scroll_height - container_height) {  //يبئا هوا كدا فى أخر الكونتينر
                    if (all_shrines_count > current_length) {
                        var action = config.base_url + 'ajax/moreShrines';
                        $.ajax({
                            url: action,
                            data: {current_length: shrines_items_length, city: city},
                            async: false,
                            beforeSend: function () {

                            },
                            success: function (data) {
                                $('#shrines_container').append(data);
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
                    }
                }
            });
        }
        var handleGetProgramsOnScroll = function () {
            var all_programs_count = $('#all_programs_count').val();
            var current_length = $(document).find('.program_item_container').length;
            if (all_programs_count > current_length) {
                $('#programs_container').css({
                    'overflow-y': 'scroll'
                });
            }
            $('#programs_container').on('scroll', function () {
                var programs_items_length = $(document).find('.program_item_container').length;
                //alert(shrines_items_length);
                var container_height = $(this).innerHeight();//146
                var container_scroll_height = $(this)[0].scrollHeight; //256
                var container_scroll_top = $(this).scrollTop(); //58
                var city = $('#city_id').val();
                if (container_scroll_top == container_scroll_height - container_height) {  //يبئا هوا كدا فى أخر الكونتينر
                    if (all_programs_count > programs_items_length) {

                        var action = config.base_url + 'ajax/morePrograms';
                        $.ajax({
                            url: action,
                            data: {current_length: programs_items_length, city: city},
                            async: false,
                            beforeSend: function () {

                            },
                            success: function (data) {
                                $('#programs_container').append(data);
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
                    }
                }
            });
        }
        var handleInOutEgyptForCities = function () {
            $('.in_out_egypt').on('change', function () {
                var action = config.base_url + 'ajax/getCitiesInOutEgypt';
                var in_out_egypt = $(this).val();
                $.ajax({
                    url: action,
                    data: {in_out_egypt: in_out_egypt},
                    async: false,
                    beforeSend: function () {

                    },
                    success: function (data) {
                        $('.loading-div').show();
                        setTimeout(function () {
                            $('#destinations').html(data);
                            $('.loading-div').hide();
                        }, 3000);
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
            });
        }
        return {
            init: function () {
                init();
            }
        }

    }();
    jQuery(document).ready(function () {
        Destinations.init();
    });


