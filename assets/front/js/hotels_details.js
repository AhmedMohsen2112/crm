    var formData = {};
    var Price = {};
    var is_logged = false;  //for check if user is logged before booking
    var map;
    var Hotel_details = function () {

        var init = function () {
            //alert('here');
            //handleDatesJs();
//            handleRoomsAvailableFormSubmit();
//            handleChangeNumOfRoom();
//            handleChangeNumOfChild();
//            handleBookingConfirm();
//            checkLogin();
            handleShowMaps();

        }
        var handleShowMaps = function () {
            $('.nav-tabs').on('shown.bs.tab', function () {
                map = new GMaps({
                    el: '#map',
                    zoom: 17,
                    lat: $('#hotel_lat').val(),
                    lng: $('#hotel_lng').val(),
                });
                map.addMarker({
                    lat: $('#hotel_lat').val(),
                    lng: $('#hotel_lng').val(),
                    title: $('#hotel_title').val(),
                    click: function (e) {
                        //window.location.href = config.site_url;
                    },
                    mouseover: function (e) {

                    }
                });
                map.refresh();
            });

        }
        var storeData = function (data) {
            for (var x = 0; x < data.length; x++) {


                for (var x = 0; x < data.length; x++) {
                    var elem = data[x];
                    formData[elem.name] = elem.value;
                }
            }
        }
        var calculatePrice = function () {
            var currency_sign = $('#currency_sign').val();
            var price = 0;
            for (var i in Price) {
                price += Price[i];
            }
            if (price == 0) {
                $('#total_price').html(currency_sign);
            } else {
                $('#total_price').html(price + ' ' + currency_sign);
            }
            formData['price'] = price;
            formData['currency'] = currency_sign;
        }
        var roomsSelected = function () {
            var count = 0;
            $(document).find('select[id^="room_num"]').each(function () {
                var room_num = $(this).val();
                if (room_num > 0) {
                    count++;
                }
            });
            return count;
        }
        var checkLogin = function () {

            var action = config.base_url + '/home/checkLoginForAjax';
            $.ajax({
                url: action,
                async: false,
                data: {
                    program_id: $('#program_id').val()
                },
                success: function (data) {
                    console.log(data);
                    //return false;
                    if (data.type == 'success') {


                        is_logged = true;
                    } else {
                        is_logged = false;
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


        }
        var handleBookingConfirm = function () {
            $(document).on('click', '#booking-confirm', function () {
                if (!is_logged) {
                    $('#myModal').modal('show');
                    return false;
                }
                var roomsSelectedCount = roomsSelected();
                //alert(roomsSelectedCount);
                if (roomsSelectedCount <= 0) {
                    $('.alert-message').html(lang.no_rooms_selected);
                    return false;
                }
                var data = $('#h-rooms-available-form').serializeArray();
                storeData(data);
                $.ajax({
                    url: config.base_url + "hotels/store_booking_data",
                    type: 'POST',
                    dataType: 'json',
                    data: $.param(formData),
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {
                            var hotel_title = 'hotel_title_' + lang.lang_code;

                            window.location.href = config.base_url + 'hotels/booking/' + data.data[hotel_title] + '/' + data.data.h_arrive_date + '/' + data.data.h_departing_date;
                        } else {

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
        var handleChangeNumOfRoom = function () {
            $(document).on('change', '.room_num', function () {
                $("select[id^='room_num_']").each(function () {
                    var id = $(this).attr('id');
                    var room_num = $(this).val();

                    var room_id = $(this).data('room-id');
                    var hotels_rooms_prices_id = $(this).data('hotels-rooms-prices-id');
                    var price_of_one_night = $(this).data('price-one-night');
                    var no_of_days = $(this).data('no-of-days');
                    var no_of_bed = $(this).data('no-of-bed');
                    if (room_num > 0) {
                        var total_price = $(this).data('total-price') * room_num;
                        Price[room_id] = total_price;
                        if (!formData.hasOwnProperty(id)) {
                            formData[id] = {
                                hotels_rooms_prices_id: hotels_rooms_prices_id,
                                room_id: room_id,
                                room_num: room_num,
                                price_of_one_night: price_of_one_night,
                                no_of_days: no_of_days,
                                no_of_bed: no_of_bed,
                            };
                        }

                    } else {
                        delete formData[id];
                        delete  Price[room_id];
                    }
                    calculatePrice();
                });
                console.log(formData);
            });
        }
        var handleChangeNumOfChild = function () {
            $(document).on('change', '.child_num', function () {
                $("select[id^='child_num_']").each(function () {
                    var id = $(this).attr('id');
                    var child_num = $(this).val();
                    var room_id = $(this).data('room-id');

                    if (child_num > 0) {
                        var room_object = formData[room_id];
                        var child_price = $(this).data('child-price');
                        Price[id] = child_price;
                        room_object['child_num'] = child_num;
                    } else {
                        if (formData.hasOwnProperty(room_id)) {
                            var room_object = formData[room_id];
                            //room_object['child_num'] = 0;
                            delete room_object['child_num'];
                        }
                        delete  Price[id];
                    }

                    calculatePrice();
                });
            });
        }
        var handleRoomsAvailableFormSubmit = function () {
            jQuery.validator.addMethod("notEqual", function (value) {
                var h_arrive_date = $("#h_arrive_date").data("DateTimePicker").date();
                var h_departing_date = $("#h_departing_date").data("DateTimePicker").date();
                var dt1 = new Date(h_arrive_date);
                var arrive_date = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());
                var dt2 = new Date(h_departing_date);
                var departing_date = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
                //alert(min_from_date.getTime());
                if ((arrive_date.getTime()) == (departing_date.getTime())) {
                    return false;
                } else {
                    return true;
                }
            }, lang.from_and_to_dates_not_equal_validate);
            $('#h-rooms-available-form').validate({
                rules: {
                    h_arrive_date: {
                        required: true,
                    },
                    h_departing_date: {
                        required: true,
                        notEqual: true
                    },
                    h_adults_num: {
                        required: true,
                        min: 1
                    }
                },
                messages: {
                    h_arrive_date: {
                        required: lang.required
                    },
                    h_departing_date: {
                        required: lang.required
                    },
                    h_adults_num: {
                        required: lang.required,
                        min: lang.min_one
                    }
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');

                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');
//                    var id = $(element).attr('id');
//                    $('.' + id).remove();
//                    $('.alert_custom').fadeIn(400).delay(7000).fadeOut(400);
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
//                    var id = $(element).attr('id');
//                    $('.' + id).html($(error).html());
//                    $('.alert_custom').fadeIn(400).delay(7000).fadeOut(400);

                }
            });
            $('#h-rooms-available-form .update-btn').click(function () {
                //alert($('#search').data('id'));
                //return false;
                if ($('#h-rooms-available-form').validate().form()) {
                    $('#h-rooms-available-form').submit();
                }
                return false;
            });
            $('#h-rooms-available-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#h-rooms-available-form').validate().form()) {
                        $('#h-rooms-available-form').submit();
                    }
                    return false;
                }
            });
            $('#h-rooms-available-form').submit(function () {

                var currency_sign = $('#currency_sign').val();
                var data = $('#h-rooms-available-form').serializeArray();
                //return false;
                $.ajax({
                    url: config.base_url + "hotels/getRoomsAvailable",
                    type: 'POST',
                    dataType: 'json',
                    data: $.param(data),
                    success: function (data)
                    {
                        console.log(data);

                        var html = '';
                        if (data.type == 'success') {
                            var hotel_room_title = 'hotel_room_title_' + lang.lang_code;
                            html += '<table class="table table-bordered table-hover">' +
                                    '<thead class="alert-success">' +
                                    '<tr>' +
                                    '<th>' + lang.room_type + '</th>' +
                                    '<th>' + lang.max + '</th>' +
                                    '<th>' + lang.price_per_night + '</th>' +
                                    '<th>' + lang.total_price + '</th>' +
                                    '<th>' + lang.rooms + '</th>' +
                                    '<th>' + lang.childs + '</th>' +
                                    '<th>' + lang.confirm + '</th>' +
                                    '</tr>' +
                                    '</thead>' +
                                    '</tbody>';
                            var count = 1;
                            for (var i in data.data) {  //i => room id
                                var total_price = data.data[i].adult_price;
                                var price_for_one_night = total_price / data.data[i].no_of_days;
                                html += '<tr>' +
                                        '<td>' + data.data[i][hotel_room_title] + '</td>' +
                                        '<td>';
                                for (var x = 0; x < data.data[i].no_of_bed; x++) {
                                    html += '<i class="fa fa-user" aria-hidden="true"></i>';
                                }
                                html += '</td>' +
                                        '<td>' + price_for_one_night + ' ' + currency_sign + '</td>' +
                                        '<td>' + total_price + ' ' + currency_sign + '</td>' +
                                        '<td>' +
                                        '<select style="color: #000!important;" class="form-control room_num" data-room-id="' + i + '" data-total-price="' + total_price + '"  data-price-one-night="' + price_for_one_night + '" data-no-of-bed="' + data.data[i].no_of_bed + '" data-hotels-rooms-prices-id="' + data.data[i].hotels_rooms_prices_id + '" name="room_num[]" id="room_num_' + count + '" data-no-of-days="' + data.data[i].no_of_days + '">';
                                for (var x = 0; x <= data.data[i].no_of_available_room; x++) {
                                    html += '<option value="' + x + '">' + x + '</option>';
                                }
                                html += '</select>' +
                                        '</td>' +
                                        '<td>' +
                                        '<select style="color: #000!important;" class="form-control child_num"  data-room-id="room_num_' + count + '" data-child-price="' + data.data[i].child_price + '"  name="child_num[]" id="child_num_' + count + '">';
                                for (var z = 0; z <= data.data[i].max_childs; z++) {
                                    html += '<option value="' + z + '">' + z + '</option>';
                                }
                                html += '</select>' +
                                        '</td>' +
                                        '<td>';
                                if (count == 1) {
                                    html += '<p id="total_price" class="text-center"></p><a id="booking-confirm" class="btn btn-info">' + lang.booking_confirm + '</a>';
                                }
                                html += '</td>' +
                                        '</tr>';
                                count++;
                            }
                            html += '</tbody>' +
                                    '</table>';

                        } else {
                            html += '<p class="text-danger text-center">' + lang.no_results + '</p>'
                        }
                        $('#rooms_table').html(html);
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

                return false;



            });

        }
        var handleDatesJs = function () {
            $('#p_arrive_date,#p_departing_date,#h_arrive_date,#h_departing_date').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        allowInputToggle: true,
                        minDate: new Date()
                    }
            );

//            $('.input-group-addon').click(function (event) {
////               alert('clicked');
//                $('#p_arrive_date,#p_departing_date,#h_arrive_date,#h_departing_date').data("DateTimePicker").show();
//            });

            $("#p_arrive_date").on("dp.change", function (e) {
                $('#p_departing_date').data("DateTimePicker").minDate(e.date);
            });
            $("#p_departing_date").on("dp.change", function (e) {
                $('#p_arrive_date').data("DateTimePicker").maxDate(e.date);
            });
            $("#h_arrive_date").on("dp.change", function (e) {
                $('#h_departing_date').data("DateTimePicker").minDate(e.date);
            });
            $("#h_departing_date").on("dp.change", function (e) {
                $('#h_arrive_date').data("DateTimePicker").maxDate(e.date);
            });


        }


        return {
            init: function () {
                init();
            }
        }

    }();

    jQuery(document).ready(function () {
        Hotel_details.init();
    });



