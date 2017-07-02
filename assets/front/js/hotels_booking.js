    var formData = new FormData();
    var booking_price = {
        price_without_extra_services: parseInt($('#price_without_extra_services').val())
    };
    var roomsDatesPrices = {};
    var datesPrices;
    var roomsPrices = {};
    var next = true;
    var end = false;
    var errors = {};
    var price = config.price_without_extra_services;
    var Booking = function () {

        var init = function () {
            $.extend(lang, new_lang);
            $.extend(config, new_config);
            handleChangeDatesInAndOut();
            handleDatesJs();
            handleTabs();
            handleChangeLeftBar();
            handleSubmit();
            handleChangeNumOfRoomsFinal(false);
            handleChangeExtraServicesRooms();
            handleChangeExtraServicesPersons();
            handleAddRemoveMoreExtraServicesRoomsRow();
            handleAddRemoveMoreExtraServicesPersonsRow();
            printing();
            handlingFormForTravellersInfo(true, false, false, parseInt($('#h_adults_num').val()));
            handlingFormForTravellersInfo(false, true, false, parseInt($('#h_childs_num').val()));
        };
        var handleTabs = function () {
            //Initialize tooltips
            $('.nav-tabs > li a[title]').tooltip();
            //Wizard
            $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

                var $target = $(e.target);
                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });
        }
        var handleDatesJs = function () {
//            var dt1 = new Date(config.min_from_date);
//            var min_from_date = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());
//            var dt2 = new Date(config.max_from_date);
//            var max_from_date = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
//            var dt3 = new Date(config.min_to_date);
//            var min_to_date = new Date(dt3.getFullYear(), dt3.getMonth(), dt3.getDate());
//            var dt4 = new Date(config.max_to_date);
//            var max_to_date = new Date(dt4.getFullYear(), dt4.getMonth(), dt4.getDate());
//            $('#arrive_date').datetimepicker(
//                    {
//                        format: 'YYYY-MM-DD',
//                        useCurrent: false,
//                        minDate: new Date(),
//                        maxDate: max_to_date - 1,
//                    }
//            );
//            $('#departing_date').datetimepicker(
//                    {
//                        format: 'YYYY-MM-DD',
//                        useCurrent: false,
//                        minDate: new Date(),
//                        maxDate: max_to_date,
//                    }
//            );
            $('#birthdate').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        maxDate: new Date()
                    }
            );

//            $("#arrive_date").on("dp.change", function (e) {
//                var date = new Date(e.date)
//                date.setDate(date.getDate() + 1)
//
//                $('#departing_date').data("DateTimePicker").minDate(date);
//            });
//            $("#departing_date").on("dp.change", function (e) {
//                $('#arrive_date').data("DateTimePicker").maxDate(e.date);
//            });

        }
        var convertDate = function (inputFormat) {
            function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        }
        var handleChangeDatesInAndOut = function () {

            $(".in_out_date").on('dp.change', function () {
                if ($('#arrive_date').val() != '' && $('#departing_date').val() != '') {
                    var date1 = $('#arrive_date').val();
                    var date2 = $('#departing_date').val();
                    $('#nights').val(App.getDays(date1, date2));
                }
            });


        }
        var validationMinMaxForRoomNum = function (number_of_elements, max_array) {
            for (var x = 0; x < number_of_elements; x++) {
                $("input[name='room_num[" + x + "]']").rules("add", {
                    max: max_array[x],
                    messages: {
                        max: "عدد الغرف لا يجب ان يكون اكبر من المتاح وهو " + max_array[x],
                    }
                });
            }
        }
        var validationMinMaxForChildsNum = function (number_of_elements, max_array) {
            for (var x = 0; x < number_of_elements; x++) {
                $("input[name='childs_num[" + x + "]']").rules("add", {
                    max: max_array[x],
                    messages: {
                        max: "عدد الأطفال لا يجب ان يكون اكبر من المتاح وهو " + max_array[x],
                    }
                });
            }
        }
        var validationMinMaxForInfantNum = function (number_of_elements, max_array) {
            for (var x = 0; x < number_of_elements; x++) {
                $("input[name='infant_num[" + x + "]']").rules("add", {
                    max: max_array[x],
                    messages: {
                        max: "عدد الرضع لا يجب ان يكون اكبر من المتاح وهو " + max_array[x],
                    }
                });
            }
        }
        var validationMinMaxForExtraServiceRoomAdultNum = function (input_name_number, max) {

            $("input[name='extra_service_room_adult_num[" + input_name_number + "]']").rules("add", {
                max: max,
                messages: {
                    max: "عدد الأفراد لا يجب ان يكون اكبر من البالغين وهو " + max,
                }
            });

        }

        var validationMinMaxForExtraServiceRoomChildsNum = function (input_name_number, max) {
            $("input[name='extra_service_room_child_num[" + input_name_number + "]']").rules("add", {
                max: max,
                messages: {
                    max: "عدد الأفراد لا يجب ان يكون اكبر من البالغين وهو " + max,
                }
            });
        }
        var handleRoomsReservation = function () {
            var action = config.base_url + 'hotels/getHotelRoomsMaxAndPrices';
            $.ajax({
                url: action,
                data: {
                    'country_id': $('#country_id').val(),
                    'hotel_id': $('#hotel_id').val(),
                    'arrive_date': $('#arrive_date').val(),
                    'departing_date': $('#departing_date').val(),
                },
                async: false,
                success: function (data) {
                    console.log(data);
                    if (data.type == 'success') {
                        var html = '';
                        var count = 1;
                        var input_name_count = 0;
                        var rooms_num_max = [];
                        var childs_num_max = [];
                        var infant_num_max = [];
                        for (var i in data.data.rooms) {
                            var room_type_id = 'room_type_' + count;
                            var room_num_id = 'room_num_' + count;
                            var childs_num_id = 'childs_num_' + count;
                            var infant_num_id = 'infant_num_' + count;
                            var available_rooms = data.data.rooms[i].number_of_room - data.data.rooms[i].number_of_room_reserved;
                            rooms_num_max.push(available_rooms);
                            childs_num_max.push(data.data.rooms[i].number_of_child_extra);
                            infant_num_max.push(data.data.rooms[i].number_of_infant_extra);
                            html += '<div class="row">' +
                                    '<div class="col-xs-12 col-sm-3 pull-left">' +
                                    '<div class="form-group form-block type-2 clearfix">' +
                                    '<div class="control-label form-label color-dark-2">نوع الغرفة</div>' +
                                    '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                    '<input class="form-control text-center" type="text" readonly name="room_type[]" data-room-id="' + data.data.rooms[i].hotel_rooms_id + '" id="' + room_type_id + '" value="' + i + '">' +
                                    '</div>' +
                                    '<div class="help-block"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-3 pull-left">' +
                                    '<div class="form-group form-block type-2 clearfix">' +
                                    '<div class="control-label form-label color-dark-2">العدد </div>' +
                                    '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                    '<input class="form-control text-center room_num" type="number" min="1" data-no-of-bed="' + data.data.rooms[i].no_of_bed + '" data-room-type-ar="' + $.trim(data.data.rooms[i].title_ar) + '" data-room-type="' + data.data.rooms[i].title_en.trim() + '" data-room-id="' + data.data.rooms[i].hotel_rooms_id + '"   max="' + available_rooms + '" name="room_num[' + input_name_count + ']" id="' + room_num_id + '" data-no-of-bed="' + data.data.rooms[i].no_of_bed + '">' +
                                    '</div>' +
                                    '<div class="help-block"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-3 pull-left">' +
                                    '<div class="form-group form-block type-2 clearfix">' +
                                    '<div class="control-label form-label color-dark-2">عدد الأطفال </div>' +
                                    '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                    '<input class="form-control text-center childs_num" type="number" min="1" data-child-room-id="' + i + '" max="' + data.data.rooms[i].number_of_child_extra + '"  data-room-id="' + data.data.rooms[i].hotel_rooms_id + '"  data-room-type="' + data.data.rooms[i].title_en.trim() + '" name="childs_num[' + input_name_count + ']" id="' + childs_num_id + '">' +
                                    '</div>' +
                                    '<div class="help-block"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-3 pull-left">' +
                                    '<div class="form-group form-block type-2 clearfix">' +
                                    '<div class="control-label form-label color-dark-2">عدد الرضع </div>' +
                                    '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                    '<input class="form-control text-center infant_num" type="number" min="1" data-infant-room-id="' + i + '" max="' + data.data.rooms[i].number_of_infant_extra + '"  name="infant_num[' + input_name_count + ']" id="' + infant_num_id + '">' +
                                    '</div>' +
                                    '<div class="help-block"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                            count++;
                            input_name_count++;
                        }
                        $('#rooms_box').html(html);
                        datesPrices = data.data;
                        validationMinMaxForRoomNum(input_name_count, rooms_num_max);
                        validationMinMaxForChildsNum(input_name_count, childs_num_max);
                        validationMinMaxForInfantNum(input_name_count, infant_num_max);
                        next = true;
                    } else {
                        next = false;
                        var html = '';
                        if (Array.isArray(data.errors)) {
                            html += '<ul class="list-group">' +
                                    '<li class="list-group-item text-center list-group-item-danger">التواريخ التالية ليس لها حجوزات من فضلك اختر فترة اخرى</li>';
                            for (var x = 0; x < data.errors.length; x++) {
                                html += '<li class="list-group-item text-center list-group-item-danger">' + data.errors[x] + '</li>';
                            }
                            html += '</ul>';

                        } else {
                            html += '<ul class="list-group">' +
                                    '<li class="list-group-item text-center list-group-item-danger">' + data.message + '</li>' +
                                    '</ul>';
                        }
                        $('.alert-message-step-1').html(html).fadeIn(100).delay(7000).fadeOut(100);
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    $('.loading').addClass('hide');
                    bootbox.dialog({
                        message: xhr.responseText,
                        title: lang.messages_error,
                        buttons: {
                            danger: {
                                label: lang.close,
                                className: "red"
                            }
                        }
                    });
                },
                dataType: "json",
                type: "POST"
            });
//            $("#adult_num").on('change', function () {
//                var adult_num = $(this).val();
//                if (adult_num != '') {
//
//
//                } else {
//                    $('#rooms_box').slideUp(500);
//                }
//            });


        }
        var handleRoomsDatesPrices = function (object) {

            for (var i in object) {
                if (i == 'rooms') {
                    continue;
                }
                for (var x = 0; x < object[i].length; x++) {

                    var room_type = object[i][x].title_en;
                    roomsDatesPrices[room_type] = {
                        'adult_price': object[i][x].adult_price,
                        'child_price': object[i][x].child_price

                    };
                }

            }
        }
        var calculatePriceForAdult = function (object) {
            $('input[id^="room_num"]').each(function () {
                var room_num = $(this).val();
                var current_hotel_room_id = $(this).data('room-id'); //return room id
                var no_of_bed_in_room = parseInt($(this).data('no-of-bed'));
                var room_id = $(this).attr('id');
                if (room_num.length != 0) {
                    var count = 0;
                    for (var i in object) {
                        if (i == 'rooms' || i == 'days_out') {
                            continue;
                        }
                        for (var x = 0; x < object[i].length; x++) {
                            var hotel_room_id = object[i][x].hotel_rooms_id;
                            if (hotel_room_id == current_hotel_room_id) {
                                count += (room_num * no_of_bed_in_room) * object[i][x].adult_price;
                            }
                        }

                    }
                    booking_price[room_id] = count;
                } else {
                    booking_price[room_id] = 0;
                }
            });
        }
        var calculatePriceForChilds = function (object) {
            $('input[id^="childs_num"]').each(function () {
                var childs_num = $(this).val();
                var current_hotel_room_id = $(this).data('room-id'); //return room id
                var childs_num_id = $(this).attr('id');
                if (childs_num.length != 0) {
                    var count = 0;
                    for (var i in object) {
                        if (i == 'rooms' || i == 'days_out') {
                            continue;
                        }
                        for (var x = 0; x < object[i].length; x++) {
                            var hotel_room_id = object[i][x].hotel_rooms_id;
                            if (hotel_room_id == current_hotel_room_id) {
                                count += childs_num * object[i][x].child_price;
                            }
                        }

                    }
                    booking_price[childs_num_id] = count;
                } else {
                    booking_price[childs_num_id] = 0;
                }
            });
        }
        var handleChangeNumOfRoomsFinal = function (before_next) {
            if (before_next) {

                handleChangeNumOfRooms();
                backSelectToDefault('extra_service_for_room');  //this for extra services step
                backSelectToDefault('extra_service_for_person');  //this for extra services step
            } else {
                $(document).on('change keyup', '.room_num', function () {
                    handleChangeNumOfRooms();
                    //changeleftBarForRoomNum();
                });
                $(document).on('change keyup', '.childs_num', function () {
                    handleChangeNumOfRooms();
                });
            }

        }
        var handleChangeNumOfRooms = function () {
            var count = 0;
            $("input[id^='room_num_']").each(function () {

                var room_num = $(this).val();
                if (room_num > 0 && room_num != '') {
                    count++;
                }
            });

            if (count > 0) {
                $('.alert-message').html('');
                $('.alert-message').fadeOut(1000);
                $('#extra_service_room_adult_num_1').attr('max', parseInt($('#adult_num_span').html()));
                $('#extra_service_room_child_num_1').attr('max', parseInt($('#childs_num_span').html()));
                $('#extra_service_person_adult_num_1').attr('max', parseInt($('#adult_num_span').html()));
                $('#extra_service_person_child_num_1').attr('max', parseInt($('#childs_num_span').html()));
                calculatePriceForAdult(datesPrices);
                calculatePriceForChilds(datesPrices);
                console.log(booking_price);
                claculateTotalPrice(booking_price);
                next = true;
            } else {
                $('.alert-message').html('<span class="alert-danger">يجب حجز غرفة واحدة على الأقل</span>');
                $('.alert-message').fadeIn(1000);
                calculatePriceForAdult(datesPrices);
                calculatePriceForChilds(datesPrices);
                console.log(booking_price);
                claculateTotalPrice(booking_price);
                next = false;


            }

        }
        var claculateTotalPrice = function (booking_price) {
            var price = 0;
            for (var i in booking_price) {
                price += booking_price[i];
            }

            $('#booking-price').html(price);
        }
        var handleChangeNumOfRooms2 = function () {
            var adult_num = $('#adult_num').val();
            var count = 0;
            $("input[id^='room_num_']").each(function () {
                var room_num = $(this).val();
                if (room_num.length != 0) {
//                        var room_name_in_english = $(this).data('type-room'); //return two
//                        var room_price = parseInt($('#' + room_name_in_english + '_price').val());
//                        var room_id = $(this).attr('id');
//                        var room_cost = room_num * room_price;
//                        booking_price[room_id] = room_cost;
                    var no_of_bed_in_room = $(this).data('no-of-bed');
                    //alert('no of bed ' + no_of_bed_in_room);
                    var total_no_of_bed_of_all_rooms = room_num * no_of_bed_in_room;
                    count += total_no_of_bed_of_all_rooms;
                }
            });
            //alert('adult num ' + adult_num);
            //alert(count);
            if (adult_num <= count && count != 0) {
                $('.alert-message').html('');
                $('.alert-message').fadeOut(1000);
                calculatePriceForAdult(datesPrices);
                calculatePriceForChilds(datesPrices);
                console.log(booking_price);
                var price = 0;
                for (var i in booking_price) {
                    price += booking_price[i];
                }
                console.log(price);
                $('#booking-price').html(price);
                next = true;
            } else {
                next = false;
                $('.alert-message').html('<span class="alert-danger">لابد ان يكون عدد البالغين مساوى لعدد الأسرة أو أقل منها</span>');
                $('.alert-message').fadeIn(1000);


            }

        }



        var changeleftBarForRoomNum = function () {
            var total_adult_num = 0;
            $('input[id^="room_num_"]').each(function () {
                var room_num = $(this).val();
                if (room_num.length != 0) {

                } else {
                    room_num = 0;
                }

                var room_no_of_bed = parseInt($(this).data('no-of-bed'));

                total_adult_num += room_no_of_bed * room_num;

            });
            // alert('total_adult_num ' + total_adult_num);
            $('#adult_num_span').html(total_adult_num);
            handlingFormForTravellersInfo(true, false, false, total_adult_num);
        }
        var handleChangeLeftBar = function () {
            $(document).on('change keyup', '.room_num', function () {
                var total_adult_num = 0;
                $('input[id^="room_num_"]').each(function () {
                    var room_num = $(this).val();
                    if (room_num.length != 0) {

                    } else {
                        room_num = 0;
                    }

                    var room_no_of_bed = parseInt($(this).data('no-of-bed'));

                    total_adult_num += room_no_of_bed * room_num;

                });
                $('#adult_num_span').html(total_adult_num);
                handlingFormForTravellersInfo(true, false, false, total_adult_num);
            });
            $(document).on('change keyup', '.childs_num', function () {
                var total_childs_num = 0;
                $(document).find('input[id^="childs_num"]').each(function () {
                    var childs_num = $(this).val();
                    if (childs_num.length != 0) {

                    } else {
                        childs_num = 0;
                    }
                    total_childs_num += parseInt(childs_num);

                });
                $('#childs_num_span').html(total_childs_num);
                handlingFormForTravellersInfo(false, true, false, total_childs_num);

            });
            $(document).on('change keyup', '.infant_num', function () {
                var total_infant_num = 0;
                $(document).find('input[id^="infant_num"]').each(function () {
                    var infant_num = $(this).val();
                    if (infant_num.length != 0) {

                    } else {
                        infant_num = 0;
                    }
                    total_infant_num += parseInt(infant_num);

                });
                $('#infant_num_span').html(total_infant_num);
                handlingFormForTravellersInfo(false, false, true, total_infant_num);

            });
            $(document).on('change keyup', '.room_num', function () {
                var html = '';
                $("input[id^='room_num']").each(function () {
                    var room_num = $(this).val();
                    var room_type = $(this).data('room-type-ar');
                    var room_num_id = $(this).attr('id');
                    if (room_num.length != 0) {
                        html += '<div class="row" style="margin-bottom:20px;" id="' + room_num_id + '">' +
                                '<div class="col-md-6 pull-left">' +
                                '<h6 class="pull-right"> <span class="booktit"> النوع: </span></h6>' +
                                '<h6 class="pull-right">' + room_type + '</h6>' +
                                '</div>' +
                                '<div class = "col-md-6 pull-left">' +
                                '<h6 class="pull-right"> <span class="booktit"> العدد : </span></h6>' +
                                '<h6 class="pull-right"> ' + parseInt(room_num) + ' غرف </h6>' +
                                '</div>' +
                                '</div>';
                    }
                });
                if (html == '') {
                    html += '<p class="text-center">لا يوجد</p>'
                }
                $('.room-reserved-box').html(html);
            });
            $(document).on('change keyup', "input[id^='extra_service_room_adult_num']", function () {
                var html = '';
                $("input[id^='extra_service_room_adult_num']").each(function () {
                    var extra_service_room_adult_num = $(this).val();
                    var extra_service_room_adult_num_id = $(this).attr('id');

                    var i = extra_service_room_adult_num_id.lastIndexOf('_');
                    var n = parseInt(extra_service_room_adult_num_id.substr(i + 1));
                    var option_selected = $('#extra_service_for_room_' + n).find('option:selected');
                    var service_title = option_selected.data('service-title');
                    var service_price = option_selected.data('service-price-adult');
                    if (extra_service_room_adult_num.length != 0) {
                        html += '<tr class="' + extra_service_room_adult_num_id + '">' +
                                '<td colspan="2">' + service_title + '</td>' +
                                '</tr>' +
                                '<tr class="' + extra_service_room_adult_num_id + '">' +
                                '<td>' + lang.number + '</td>' +
                                '<td>' + extra_service_room_adult_num + '</td>' +
                                '</tr>';
                    }
                });
                if (html == '') {
                    html += '<tr><td>' + lang.not_found + '</td></tr>';
                }
                $('#extra-services-rooms-adult-box-left-bar').html(html);

            });
            $(document).on('change keyup', "input[id^='extra_service_room_child_num']", function () {
                var html = '';
                $("input[id^='extra_service_room_child_num']").each(function () {
                    var extra_service_room_child_num = $(this).val();
                    var extra_service_room_child_num_id = $(this).attr('id');

                    var i = extra_service_room_child_num_id.lastIndexOf('_');
                    var n = parseInt(extra_service_room_child_num_id.substr(i + 1));
                    var option_selected = $('#extra_service_for_room_' + n).find('option:selected');
                    var service_title = option_selected.data('service-title');
                    var service_price = option_selected.data('service-price-adult');
                    if (extra_service_room_child_num.length != 0) {
                        html += '<tr class="' + extra_service_room_child_num_id + '">' +
                                '<td colspan="2">' + service_title + '</td>' +
                                '</tr>' +
                                '<tr class="' + extra_service_room_child_num_id + '">' +
                                '<td>' + lang.number + '</td>' +
                                '<td>' + extra_service_room_child_num + '</td>' +
                                '</tr>';
                    }
                });
                if (html == '') {
                    html += '<tr><td>' + lang.not_found + '</td></tr>'
                }
                $('#extra-services-rooms-childs-box-left-bar').html(html);

            });


            $(document).on('change keyup', "input[id^='extra_service_person_adult_num']", function () {
                var html = '';
                $("input[id^='extra_service_person_adult_num']").each(function () {
                    var extra_service_person_adult_num = $(this).val();
                    var extra_service_person_adult_num_id = $(this).attr('id');

                    var i = extra_service_person_adult_num_id.lastIndexOf('_');
                    var n = parseInt(extra_service_person_adult_num_id.substr(i + 1));
                    var option_selected = $('#extra_service_for_person_' + n).find('option:selected');
                    var service_title = option_selected.data('service-title');
                    var service_price = option_selected.data('service-price-adult');
                    if (extra_service_person_adult_num.length != 0) {
                        html += '<tr class="' + extra_service_person_adult_num_id + '">' +
                                '<td colspan="2">' + service_title + '</td>' +
                                '</tr>' +
                                '<tr class="' + extra_service_person_adult_num_id + '">' +
                                '<td>' + lang.number + '</td>' +
                                '<td>' + extra_service_person_adult_num + '</td>' +
                                '</tr>';
                    }
                });
                if (html == '') {
                    html += '<tr><td>' + lang.not_found + '</td></tr>';
                }
                $('#extra-services-persons-adult-box-left-bar').html(html);

            });
            $(document).on('change keyup', "input[id^='extra_service_person_child_num']", function () {
                var html = '';
                $("input[id^='extra_service_person_child_num']").each(function () {
                    var extra_service_person_child_num = $(this).val();
                    var extra_service_person_child_num_id = $(this).attr('id');

                    var i = extra_service_person_child_num_id.lastIndexOf('_');
                    var n = parseInt(extra_service_person_child_num_id.substr(i + 1));
                    var option_selected = $('#extra_service_for_person_' + n).find('option:selected');
                    var service_title = option_selected.data('service-title');
                    var service_price = option_selected.data('service-price-adult');
                    if (extra_service_person_child_num.length != 0) {
                        html += '<tr class="' + extra_service_person_child_num_id + '">' +
                                '<td colspan="2">' + service_title + '</td>' +
                                '</tr>' +
                                '<tr class="' + extra_service_person_child_num_id + '">' +
                                '<td>' + lang.number + '</td>' +
                                '<td>' + extra_service_person_child_num + '</td>' +
                                '</tr>';
                    }
                });
                if (html == '') {
                    html += '<tr><td>' + lang.not_found + '</td></tr>'
                }
                $('#extra-services-persons-childs-box-left-bar').html(html);

            });

        }
        var handleAddRemoveMoreExtraServicesRoomsRow = function () {
            var hotels_extra_service_rooms_count = $('#hotels_extra_service_rooms_count').val();
            var hotel_id = $('#hotel_id').val();
            var currency_sign = $('#currency_sign').val();
            var count = 2;
            var countForName = 1;
            $('#add-more-extra-services-rooms').on('click', function () {
                var adult_num = parseInt($('#h_adults_num').val());
                var childs_num = parseInt($('#h_childs_num').val());
                var readonly = '';
                if (childs_num == 0 || childs_num == '') {
                    readonly = 'readonly';
                }
                var row_extra_services_rooms_length = $('.row-extra-services-rooms').length;
                if (row_extra_services_rooms_length < hotels_extra_service_rooms_count) {
                    var action = config.base_url + 'hotels/getHotelsExtraServices';
                    $.ajax({
                        url: action,
                        data: {
                            hotel_id: hotel_id,
                            extra_services_type: 'rooms',
                            offset: row_extra_services_rooms_length,
                        },
                        async: false,
                        success: function (data) {

                            console.log(data);
                            if (data.type == 'success') {

                                var title = 'title_' + lang.lang_code;

                                var html = '<div class="row row-extra-services-rooms">' +
                                        '<div class="col-xs-12 col-sm-4 pull-left">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2">' + lang.service_title + ' </div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<select name="extra_service_for_room_ids[]" id="extra_service_for_room_' + count + '" class="form-control amr color-3" data-placeholder="">';
                                html += ' <option value="' + data.data[0].hotel_services_id + ' " data-service-title="' + data.data[0][title] + '" data-service-adult-price="' + data.data[0].price_for_adult + '" data-service-child-price="' + data.data[0].price_for_child + '" class="option_' + data.data[0].hotel_services_id + '">' + data.data[0][title] + '   :<span class="price">' + lang.adult + '(' + data.data[0].price_for_adult + ') ' + lang.child + '(' + data.data[0].price_for_child + ')</span>   ' + currency_sign + '';
                                html += '</select>' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-3 pull-left">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2">' + lang.adults + '</div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<input class="form-control" min="0"  type="number" max="' + adult_num + '" id="extra_service_room_adult_num_' + count + '" placeholder="' + lang.number + '" name="extra_service_room_adult_num[' + data.data[0].hotel_services_id + ']">' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-3 pull-left">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2">' + lang.childs + '</div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<input class="form-control" min="0" ' + readonly + '  type="number" max="' + childs_num + '" id="extra_service_room_child_num_' + count + '" placeholder="' + lang.number + '" name="extra_service_room_child_num[' + data.data[0].hotel_services_id + ']">' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-2 pull-left" style="padding-top:35px;">' +
                                        '<a class="btn btn-danger" id="remove-more-extra-services-rooms" data-left-bar-extra-services-adult="extra_service_room_adult_num_' + count + '" data-left-bar-extra-services-child="extra_service_room_child_num_' + count + '">x</a>' +
                                        '</div>' +
                                        '</div>';

                                $('#extra-services-rooms-box').append(html);

                            } else {

                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {
                            $('.loading').addClass('hide');
                            bootbox.dialog({
                                message: xhr.responseText,
                                title: lang.messages_error,
                                buttons: {
                                    danger: {
                                        label: lang.close,
                                        className: "red"
                                    }
                                }
                            });
                        },
                        dataType: "json",
                        type: "POST"
                    });
                }
                count++;
                countForName++;
                return false;
            });
            $(document).on('click', '#remove-more-extra-services-rooms', function () {
                count--;
                $(this).closest('.row-extra-services-rooms').remove();
                var left_bar_extra_services_adult = $(this).data('left-bar-extra-services-adult');
                var left_bar_extra_services_child = $(this).data('left-bar-extra-services-child');
                $('.' + left_bar_extra_services_adult).remove();
                $('.' + left_bar_extra_services_child).remove();
                booking_price[left_bar_extra_services_adult] = 0;
                booking_price[left_bar_extra_services_child] = 0;
                claculateTotalPrice(booking_price);
                return false;
            });
        }
        var handleAddRemoveMoreExtraServicesPersonsRow = function () {
            var hotels_extra_service_persons_count = $('#hotels_extra_service_persons_count').val();
            var hotel_id = $('#hotel_id').val();
            var currency_sign = $('#currency_sign').val();
            var count = 2;
            var countForName = 1;
            $('#add-more-extra-services-persons').on('click', function () {
                var adult_num = parseInt($('#h_adults_num').val());
                var childs_num = parseInt($('#h_childs_num').val());
                var readonly = '';
                if (childs_num == 0 || childs_num == '') {
                    readonly = 'readonly';
                }
                var row_extra_services_persons_length = $('.row-extra-services-persons').length;
                if (row_extra_services_persons_length < hotels_extra_service_persons_count) {
                    var action = config.base_url + 'hotels/getHotelsExtraServices';
                    $.ajax({
                        url: action,
                        data: {
                            hotel_id: hotel_id,
                            extra_services_type: 'persons',
                            offset: row_extra_services_persons_length,
                        },
                        async: false,
                        success: function (data) {

                            console.log(data);
                            if (data.type == 'success') {

                                var title = 'title_' + lang.lang_code;

                                var html = '<div class="row row-extra-services-persons">' +
                                        '<div class="col-xs-12 col-sm-4 pull-left">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2">' + lang.service_title + ' </div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<select name="extra_service_for_person_ids[]" id="extra_service_for_person_' + count + '" class="form-control amr color-3" data-placeholder="">';
                                html += ' <option value="' + data.data[0].hotel_services_id + ' " data-service-title="' + data.data[0][title] + '" data-service-adult-price="' + data.data[0].price_for_adult + '" data-service-child-price="' + data.data[0].price_for_child + '" class="option_' + data.data[0].hotel_services_id + '">' + data.data[0][title] + '   :<span class="price">' + lang.adult + '(' + data.data[0].price_for_adult + ') ' + lang.child + '(' + data.data[0].price_for_child + ')</span>  ' + currency_sign + ' ';
                                html += '</select>' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-3 pull-left">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2">' + lang.adults + '</div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<input class="form-control" min="0"  type="number" max="' + adult_num + '" id="extra_service_person_adult_num_' + count + '" placeholder="' + lang.number + '" name="extra_service_person_adult_num[' + data.data[0].hotel_services_id + ']">' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-3 pull-left">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2"' + lang.childs + '</div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<input class="form-control" min="0" ' + readonly + ' type="number" max="' + childs_num + '" id="extra_service_person_child_num_' + count + '" placeholder="' + lang.number + '" name="extra_service_person_child_num[' + data.data[0].hotel_services_id + ']">' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-2 pull-left" style="padding-top:35px;">' +
                                        '<a class="btn btn-danger" id="remove-more-extra-services-persons" data-left-bar-extra-services-adult="extra_service_person_adult_num_' + count + '" data-left-bar-extra-services-child="extra_service_person_child_num_' + count + '">x</a>' +
                                        '</div>' +
                                        '</div>';

                                $('#extra-services-person-box').append(html);
                            } else {

                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {
                            $('.loading').addClass('hide');
                            bootbox.dialog({
                                message: xhr.responseText,
                                title: lang.messages_error,
                                buttons: {
                                    danger: {
                                        label: lang.close,
                                        className: "red"
                                    }
                                }
                            });
                        },
                        dataType: "json",
                        type: "POST"
                    });
                }
                count++;
                countForName++;
                return false;
            });
            $(document).on('click', '#remove-more-extra-services-persons', function () {
                count--;
                countForName--;
                $(this).closest('.row-extra-services-persons').remove();
                var left_bar_extra_services_adult = $(this).data('left-bar-extra-services-adult');
                var left_bar_extra_services_child = $(this).data('left-bar-extra-services-child');
                $('.' + left_bar_extra_services_adult).remove();
                $('.' + left_bar_extra_services_child).remove();
                booking_price[left_bar_extra_services_adult] = 0;
                booking_price[left_bar_extra_services_child] = 0;
                claculateTotalPrice(booking_price);
                return false;
            });
        }
        var handleChangeExtraServicesRooms = function () {
            $(document).on('change keyup', "input[id^='extra_service_room_adult_num']", function () {
                var extra_service_room_adult_num_input_id = $(this).attr('id');
                var i = extra_service_room_adult_num_input_id.lastIndexOf('_');
                var n = parseInt(extra_service_room_adult_num_input_id.substr(i + 1));
                var extra_service_room_adult_num_input_name = $('#' + extra_service_room_adult_num_input_id).attr('name');
                var nights = parseInt($('#no_of_days').val());
                var extra_service_room_adult_num;
                if ($(this).val().length != 0) {
                    $('#' + extra_service_room_adult_num_input_id).prop('readonly', false);
                    $("input[name='" + extra_service_room_adult_num_input_name + "']").rules("add", {
                        max: parseInt($('#h_adults_num').val()),
                        messages: {
                            max: lang.less_than_adults,
                        }
                    });
                    extra_service_room_adult_num = $(this).val();
                } else {
                    $("input[name='" + extra_service_room_adult_num_input_name + "']").rules("remove", "max");
                    extra_service_room_adult_num = 0;

                }

                var option_selected = $('#extra_service_for_room_' + n).find('option:selected');
                var option_price = parseInt(option_selected.data('service-adult-price'));
                var service_cost = extra_service_room_adult_num * (option_price * nights);
                booking_price[extra_service_room_adult_num_input_id] = service_cost;
                claculateTotalPrice(booking_price);
            });
            $(document).on('change keyup', "input[id^='extra_service_room_child_num']", function () {
                var extra_service_room_child_num_input_id = $(this).attr('id');
                var i = extra_service_room_child_num_input_id.lastIndexOf('_');
                var n = parseInt(extra_service_room_child_num_input_id.substr(i + 1));
                var extra_service_room_child_num_input_name = $('#' + extra_service_room_child_num_input_id).attr('name');
                var nights = parseInt($('#no_of_days').val());
                var extra_service_room_child_num;
                if ($(this).val().length != 0) {
                    $('#' + extra_service_room_child_num_input_id).prop('readonly', false);
                    $("input[name='" + extra_service_room_child_num_input_name + "']").rules("add", {
                        max: parseInt($('#h_childs_num').val()),
                        messages: {
                            max: lang.less_than_childs,
                        }
                    });
                    extra_service_room_child_num = $(this).val();
                } else {
                    $("input[name='" + extra_service_room_child_num_input_name + "").rules("remove", "max");
                    extra_service_room_child_num = 0;
                }

                var option_selected = $('#extra_service_for_room_' + n).find('option:selected');
                var option_price = parseInt(option_selected.data('service-child-price'));
                var service_cost = extra_service_room_child_num * (option_price * nights);
                booking_price[extra_service_room_child_num_input_id] = service_cost;
                claculateTotalPrice(booking_price);
            });
//

        }
        var handleChangeExtraServicesPersons = function () {
            $(document).on('change keyup', "input[id^='extra_service_person_adult_num']", function () {
                var extra_service_person_adult_num_input_id = $(this).attr('id');
                var i = extra_service_person_adult_num_input_id.lastIndexOf('_');
                var n = parseInt(extra_service_person_adult_num_input_id.substr(i + 1));
                var extra_service_person_adult_num_input_name = $('#' + extra_service_person_adult_num_input_id).attr('name');
                var nights = parseInt($('#no_of_days').val());
                var extra_service_person_adult_num;
                if ($(this).val().length != 0) {
                    $('#' + extra_service_person_adult_num_input_id).prop('readonly', false);
                    $("input[name='" + extra_service_person_adult_num_input_name + "']").rules("add", {
                        max: parseInt($('#h_adults_num').val()),
                        messages: {
                            max: lang.less_than_adults,
                        }
                    });
                    extra_service_person_adult_num = $(this).val();
                } else {
                    $("input[name='" + extra_service_person_adult_num_input_name + "']").rules("remove", "max");
                    extra_service_person_adult_num = 0;
                }

                var option_selected = $('#extra_service_for_person_' + n).find('option:selected');
                var option_price = parseInt(option_selected.data('service-adult-price'));
                var service_cost = extra_service_person_adult_num * (option_price * nights);
                console.log(booking_price);
                booking_price[extra_service_person_adult_num_input_id] = service_cost;
                claculateTotalPrice(booking_price);
            });
            $(document).on('change keyup', "input[id^='extra_service_person_child_num']", function () {
                var extra_service_person_child_num_input_id = $(this).attr('id');
                var i = extra_service_person_child_num_input_id.lastIndexOf('_');
                var n = parseInt(extra_service_person_child_num_input_id.substr(i + 1));
                var extra_service_person_child_num_input_name = $('#' + extra_service_person_child_num_input_id).attr('name');
                var nights = parseInt($('#no_of_days').val());
                var extra_service_person_child_num;
                if ($(this).val().length != 0) {
                    $('#' + extra_service_person_child_num_input_id).prop('readonly', false);
                    $("input[name='" + extra_service_person_child_num_input_name + "']").rules("add", {
                        max: parseInt($('#h_childs_num').val()),
                        messages: {
                            max: lang.less_than_childs,
                        }
                    });
                    extra_service_person_child_num = $(this).val();
                } else {
                    $("input[name='" + extra_service_person_child_num_input_name + "").rules("remove", "max");
                    extra_service_person_child_num = 0;
                }
                var option_selected = $('#extra_service_for_person_' + n).find('option:selected');
                var option_price = parseInt(option_selected.data('service-child-price'));
                //alert(option_price);
                var service_cost = extra_service_person_child_num * (option_price * nights);
                console.log(booking_price);
                booking_price[extra_service_person_child_num_input_id] = service_cost;
                claculateTotalPrice(booking_price);
            });

        }
        var calculatePrice = function (name, value) {

            booking_price[name] = value;
            var price = 0;
            for (var i in booking_price) {
                price += booking_price[i];
            }
            console.log(booking_price);
            $('#booking-price').html(price);
        }
        var handleBooking = function () {
            var action = config.base_url + 'hotels/BookNow';
            $.ajax({
                url: action,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {

                    console.log(data);
                    if (data.type == 'success') {
                        //$('.success-message').html('<p class="alert alert-success">' + data.data.message + '</p>');
                        $('#vpc_reservation_id').val(data.data.reservation_id);
                        $('#print_reservation_id').val(data.data.reservation_id);
                        //$('#vpc_Amount').val(data.data.price);
                        if (data.data.reservation_by_visa) {
                            /*payment*/
                            var price = $('#booking-price').html();
                            var currency_sign = $('#currency_sign').val();
                            $('#vpc_Amount').val(parseInt(price));
                            var payment_config_json = $('#payment_config').val();
                            var payment_config = JSON.parse(payment_config_json);
                            var payment_config_of_currency = payment_config[currency_sign];
                            $('#vpc_Merchant').val(payment_config_of_currency.merchant_id);
                            $('#vpc_Currency').val(currency_sign);
                            $('#vpc_AccessCode').val(payment_config_of_currency.access_code);
                            /*end*/
                        } else {
                            $('.visa').remove();
                        }
                        next = true;
                    } else {
                        for (var x = 0; x < data.errors.length; x++) {
                            $('.error-message').html('<li class="list-group-item list-group-item-danger">' + data.errors[x] + '</li>');
                            $('.error-message').fadeIn(1000);
                        }
                        next = false;
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    $('.loading').addClass('hide');
                    bootbox.dialog({
                        message: xhr.responseText,
                        title: lang.messages_error,
                        buttons: {
                            danger: {
                                label: lang.close,
                                className: "red"
                            }
                        }
                    });
                },
                dataType: "json",
                type: "POST"
            });
        }
        var storeData = function (data) {
            for (var x = 0; x < data.length; x++) {
                var elem = data[x];
                if (formData.has(elem.name)) {
                    formData.delete(elem.name);
                }

            }

            for (var x = 0; x < data.length; x++) {
                var elem = data[x];
                formData.append(elem.name, elem.value);
            }
        }
        var handleSubmit = function () {
            jQuery.validator.addMethod("checkAge", function (value) {
                var age = App.calculateAge(value);
                if (age < 16) {
                    return false;
                } else {
                    return true;
                }
            }, lang.adult_age);
            jQuery.validator.addMethod("checkAdultAge", function (value) {
                var age = App.calculateAge(value);
                if (age > 16) {
                    return true;
                } else {
                    return false;
                }
            }, lang.adult_age);
            jQuery.validator.addMethod("checkChildAge", function (value) {
                var age = App.calculateAge(value);
                if (age >= 2 && age < 10) {
                    return true;
                } else {
                    return false;
                }
            }, lang.child_age);
            jQuery.validator.addMethod("checkInfantAge", function (value) {
                var age = App.calculateAge(value);
                if (age < 2) {
                    return true;
                } else {
                    return false;
                }
            }, lang.infant_age);
            $('#form-client').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                    username: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    email: {
                        required: true
                    },
                    address: {
                        required: true
                    },
                    birthdate: {
                        required: true,
                        checkAge: true
                    },
                },
                messages: lang.form_client,
                highlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-block').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-block').find('.help-block').html($(error).html());
                }
            });
            $('#form-travellersnum').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                    adult_num: {
                        required: true
                    }
                },
                messages: lang.form_travellers_num,
                highlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-block').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-block').find('.help-block').html($(error).html());
                }
            });
            $('#form-services').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                },
                messages: lang.form_travellers,
                highlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-block').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-block').find('.help-block').html($(error).html());
                }
            });
            $('#form-travellersinfo').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                },
                highlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-block').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-block').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-block').find('.help-block').html($(error).html());
                }
            });
            $('#booking-form input').keypress(function (e) {
                if (e.which == 13) {
                    $('#booking-form').submit(); //form validation success, call ajax form submit
                    return false;
                }
            });
            $(".next-step").click(function (e) {

                var form_type = $(this).data('form-type');
                if ($('#' + form_type).validate().form() == false) {
                    next = false;
                } else {
                    next = true;
                    if (form_type == 'form-client') {
                        end = false;
                    }
                    if (form_type == 'form-services') {
                        end = false;   //this for prevent completting  27/11/2016

                    }
                    if (form_type == 'form-travellersinfo') {
                        end = true;   //this for prevent completting  27/11/2016

                    }
                }


                if (next) {  //
                    /*store date of every tab in only on varible called formData*/
                    var data = $('#' + form_type).serializeArray()
                    storeData(data);

                    /*editig in formData of from-rooms*/
                    if (form_type == 'form-rooms') {
                        var room_ids = [];
                        $("input[id^='room_type']").each(function () {
                            room_ids.push($(this).data('room-id'));
                        });
                        if (formData.has('room_ids')) {
                            formData.delete('room_ids');
                        }
                        formData.append('room_ids', JSON.stringify(room_ids));
                    }
                    /*end*/

                    /*end*/
                    if (end) {
                        if (formData.has('hotels_rooms_prices')) {
                            formData.delete('hotels_rooms_prices');
                        }
                        formData.append('hotels_rooms_prices', JSON.stringify(datesPrices));
                        var price = 0;
                        for (var i in booking_price) {
                            price += booking_price[i];
                        }
                        formData.append('booking_price', price);
                        handleBooking();
                        if (next) {
                            var $active = $('.wizard .nav-tabs li.active');
                            $active.next().removeClass('disabled');
                            nextTab($active);
                        } else {
                            return false;
                        }
                    }
                    //go to next tab
                    var $active = $('.wizard .nav-tabs li.active');
                    $active.next().removeClass('disabled');
                    nextTab($active);
                } else {
                    console.log('errors');
                    return false;
                }



            });
            $(".prev-step").click(function (e) {
                //alert('here');
                var $active = $('.wizard .nav-tabs li.active');
                prevTab($active);
            });
            var nextTab = function (elem) {
                $(elem).next().find('a[data-toggle="tab"]').click();
            }
            var prevTab = function (elem) {

                $(elem).prev().find('a[data-toggle="tab"]').click();
            }

        }
        var handlingFormForTravellersInfo = function (adult_num, child_num, infant_num, num) {
            var title;
            var div_content_id;
            var birthdate_name;
            var birthdate_id;
            var travellers_names_name;
            var travellers_gender_name;
            var travellers_names_id;
            var birthdate_type;
            if (adult_num && !child_num && !infant_num) {
                title = lang.adults_info;
                div_content_id = 'traveller-info-box-adult';
                travellers_names_name = 'travellers_names_adult';
                travellers_gender_name = 'travellers_gender_adult';
                travellers_names_id = 'travellers_names_adult';
                birthdate_name = 'birthdate_adult';
                birthdate_id = 'birthdate_adult';
                birthdate_type = 'birthdate_adult';
            }
            if (child_num && !adult_num && !infant_num) {
                title = lang.childs_info;
                div_content_id = 'traveller-info-box-childs';
                travellers_names_name = 'travellers_names_childs';
                travellers_gender_name = 'travellers_gender_childs';
                travellers_names_id = 'travellers_names_childs';
                birthdate_name = 'birthdate_childs';
                birthdate_id = 'birthdate_childs';
                birthdate_type = 'birthdate_childs';
            }
            if (infant_num && !adult_num && !child_num) {
                title = lang.infants_info;
                div_content_id = 'traveller-info-box-infant';
                travellers_names_name = 'travellers_names_infant';
                travellers_gender_name = 'travellers_gender_infant';
                travellers_names_id = 'travellers_names_infant';
                birthdate_name = 'birthdate_infant';
                birthdate_id = 'birthdate_infant';
                birthdate_type = 'birthdate_infant';
            }

            var html = '<fieldset>' +
                    '<legend>' + title + '</legend>' +
                    '<div class= "traveller-info-box" >';
            var flag = birthdate_id + '_';
            var flag2 = travellers_names_id + '_';
            var counter = 0;
            for (var x = 1; x <= num; x++) {
                var birthdate_id_final = flag + x;
                var travellers_names_id_final = flag2 + x;
                html += '<div class="row" >' +
                        '<div class="col-xs-12 col-sm-4 pull-left" >' +
                        '<div class="form-group form-block type-2 clearfix">' +
                        '<div class="control-label form-label color-dark-2"> ' + lang.name + ': </div>' +
                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                        '<input class="form-control" type="text" placeholder=" ' + lang.name + ' " name="' + travellers_names_name + '[' + counter + ']" id="' + travellers_names_id_final + '">' +
                        '</div>' +
                        '<div class="help-block" style="padding-right:20px;"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-4 pull-left" >' +
                        '<div class="form-group form-block type-2 clearfix" >' +
                        '<div class="control-label form-label color-dark-2" >  ' + lang.gender + ' </div>' +
                        '<div class="input-style-1 b-50 brd-0 type-2 color-3" >' +
                        '<select class="form-control amr color-3"  name="' + travellers_gender_name + '[' + counter + ']">' +
                        '<option selected disabled>  ' + lang.choose + ' </option>' +
                        '<option value=" ' + lang.male + '" >  ' + lang.male + ' </option>' +
                        '<option value=" ' + lang.female + '" >  ' + lang.female + ' </option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="help-block" style="padding-right:20px;"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-4 pull-left">' +
                        '<div class="form-group form-block type-2 clearfix">' +
                        '<div class="control-label form-label color-dark-2"> ' + lang.birthdate + '</div>' +
                        '<div class="input-group date input-style-1 color-3 b-50 brd-0 type-2 " >' +
                        '<input class="form-control birthdates ' + birthdate_type + '" type="text"  data-birthdate-type="' + birthdate_type + '"  name="' + birthdate_name + '[' + counter + ']" id="' + birthdate_id_final + '">' +
                        '<span class="input-group-addon">' +
                        '<span class="glyphicon glyphicon-calendar"></span>' +
                        '</span>' +
                        '</div>' +
                        '<div class="help-block"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                counter++;
            }
            html += '</div>' +
                    '</fieldset>';
            $('#' + div_content_id).html(html);
            if (adult_num && !child_num && !infant_num) {
                for (var x = 0; x < num; x++) {
                    $("input[name='travellers_names_adult[" + x + "]']").rules("add", {
                        required: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 0; x < num; x++) {
                    $("select[name='travellers_gender_adult[" + x + "]']").rules("add", {
                        required: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 0; x < num; x++) {
                    $("input[name='birthdate_adult[" + x + "]']").rules("add", {
                        required: true,
                        checkAdultAge: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 1; x <= num; x++) {
                    $('#birthdate_adult_' + x).datetimepicker(
                            {
                                format: 'YYYY-MM-DD',
                                useCurrent: false,
                                maxDate: new Date()
                            }
                    );
                }
            }
            if (child_num && !adult_num && !infant_num) {
                for (var x = 0; x < num; x++) {
                    $("input[name='travellers_names_childs[" + x + "]']").rules("add", {
                        required: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 0; x < num; x++) {
                    $("select[name='travellers_gender_childs[" + x + "]']").rules("add", {
                        required: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 0; x < num; x++) {
                    $("input[name='birthdate_childs[" + x + "]']").rules("add", {
                        required: true,
                        checkChildAge: true,
                        messages: {
                            required: "ادخل تاريخ الميلاد",
                        }
                    });
                }
                for (var x = 1; x <= num; x++) {
                    $('#birthdate_childs_' + x).datetimepicker(
                            {
                                format: 'YYYY-MM-DD',
                                useCurrent: false,
                                maxDate: new Date()
                            }
                    );
                }
            }
            if (infant_num && !adult_num && !child_num) {
                for (var x = 0; x < num; x++) {
                    $("input[name='travellers_names_infant[" + x + "]']").rules("add", {
                        required: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 0; x < num; x++) {
                    $("select[name='travellers_gender_infant[" + x + "]']").rules("add", {
                        required: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 0; x < num; x++) {
                    $("input[name='birthdate_infant[" + x + "]']").rules("add", {
                        required: true,
                        checkInfantAge: true,
                        messages: {
                            required: lang.required,
                        }
                    });
                }
                for (var x = 1; x <= num; x++) {
                    $('#birthdate_infant_' + x).datetimepicker(
                            {
                                format: 'YYYY-MM-DD',
                                useCurrent: false,
                                maxDate: new Date()
                            }
                    );
                }
            }


        }

        var emptyExtraServicesNumsRooms = function (args) {
            $('#' + args.adult_num_id).val('').trigger('change');
            $('#' + args.child_num_id).val('').trigger('change');
            $('#' + args.adult_num_id).prop('readonly', true);
            $('#' + args.child_num_id).prop('readonly', true);
            $('.' + args.adult_num_id).remove(); //found in left bar
            $('.' + args.child_num_id).remove(); //found in left bar
//                    calculatePrice(extra_service_room_adult_num_input_id, 0); //delete from price object
//                    calculatePrice(extra_service_room_child_num_input_id, 0); //delete from price object
            $("input[name='" + args.adult_num_name + "']").rules("remove", "required");
            $("input[name='" + args.child_num_name + "']").rules("remove", "max");
            $('#' + args.adult_num_id).closest('.form-block').removeClass('has-error').addClass('has-success');
            $('#' + args.adult_num_id).closest('.form-block').find('.help-block').html('');
            $('#' + args.child_num_id).closest('.form-block').removeClass('has-error').addClass('has-success');
            $('#' + args.child_num_id).closest('.form-block').find('.help-block').html('');
        }
        var backSelectToDefault = function (selectId) {
            $("select[id^='" + selectId + "']").each(function () {
                $(this).find('option').eq(0).prop('selected', true).trigger("change");
                ;
            });
        }
        var printing = function () {
            $('.print-btn').on('click', function () {
                var action = config.base_url + '/hotels/print_reservation';
                $.ajax({
                    url: action,
                    data: {
                        reservation_id: $('#print_reservation_id').val(),
                        hotel_id: $('#hotel_id').val(),
                    },
                    async: false,
                    success: function (data) {
                        print_div(data);
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
        var print_div = function (html)
        {
            var mywindow = window.open('', 'طباعة الإستمارة', 'height=600,width=800');
            mywindow.document.body.innerHTML = html;

        }
        return {
            init: function () {
                init();
            }
        };
    }();
    $(document).ready(function () {
        Booking.init();


    });