    var formData = new FormData();
    var booking_price = {};
    var price = 0;
    var next = true;
    var end = false;
    var maka_hotels_section_status = true;
    var maka_hotels_section_open = true;
    var madina_hotels_section_status = true;
    var madina_hotels_section_open = true;
    var gada_hotels_section_status = true;
    var gada_hotels_section_open = true;
    var flight_bookings_section_open = true;
    var count = 2;
    var countForName = 1;
    var flight_data = null;
    var Plan_your_trip = function () {
        var init = function () {
            $.extend(lang, new_lang);
            handleDatesJs();
            handleSubmit();
            handlePaymentSubmit();
            handleChangeServices();
            handleChangeRequiredRadios('flight_bookings_required', 'flight-bookings-inputs');
            handleChangeRequiredRadios('maka_hotels_required', 'maka-hotels-inputs');
            handleChangeRequiredRadios('madina_hotels_required', 'madina-hotels-inputs');
            handleChangeRequiredRadios('gada_hotels_required', 'gada-hotels-inputs');
            handleChangeTravellersNum();
            //handleChangeRoomAdultsNum();
            handleChangePayWays();
            //getYearsOrDaysCountBetweenTwoDates('2017-04-25', '2017-04-21')
            printing();
        };
        var printing = function () {
            $('#print-btn').on('click', function () {
                var action = config.site_url + '/plan_your_trip/print_report';
                $.ajax({
                    url: action,
                    data: {
                        plan_your_trip_reservation_id: $('#plan_your_trip_reservation_id').val(),
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
        var handleDatesJs = function () {
            $('#birthdate').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        maxDate: new Date()
                    }
            );
            $('#home_date_of_collection,#work_date_of_collection,#going_date,#returnn_date,#checkk_in,#checkk_out,#maka_check_in_date,#madina_check_in_date,#gada_check_in_date,#maka_check_out_date,#madina_check_out_date,#gada_check_out_date').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        allowInputToggle: true,
                        minDate: new Date()
                    }
            );

            $("#going_date").on("dp.change", function (e) {

                $('#returnn_date').data("DateTimePicker").minDate(e.date);
            });
            $("#returnn_date").on("dp.change", function (e) {

                $('#going_date').data("DateTimePicker").maxDate(e.date);
            });
            $("#maka_check_in_date").on("dp.change", function (e) {

                var date = new Date(e.date);
                date.setDate(date.getDate() + 1);
                $('#maka_check_out_date').data("DateTimePicker").minDate(date);

                // $('#checkk_out').data("DateTimePicker").show();
            });
            $("#maka_check_in_date").on("dp.change", function (e) {

                var date = new Date(e.date);
                date.setDate(date.getDate() + 1);
                $('#maka_check_out_date').data("DateTimePicker").minDate(date);
                // $('#checkk_out').data("DateTimePicker").show();
            });
            $("#madina_check_in_date").on("dp.change", function (e) {

                var date = new Date(e.date);
                date.setDate(date.getDate() + 1);
                $('#madina_check_out_date').data("DateTimePicker").minDate(date);
                // $('#checkk_out').data("DateTimePicker").show();
            });
            $("#gada_check_in_date").on("dp.change", function (e) {

                var date = new Date(e.date);
                date.setDate(date.getDate() + 1);
                $('#gada_check_out_date').data("DateTimePicker").minDate(date);

                // $('#checkk_out').data("DateTimePicker").show();
            });

            $('input[name^="maka_check"]').each(function () {
                $(this).on("dp.change", function (e) {
                    var check_in = $('#maka_check_in_date').val();
                    var check_out = $('#maka_check_out_date').val();
                    if (check_in != '' && check_out != '') {
                        var data = {};
                        data['hotel_id'] = $('#maka_hotels_id').val();
                        data['check_in_date'] = check_in;
                        data['check_out_date'] = check_out;
                        $.each($('input[name^="room_num"').serializeArray(), function () {
                            data[this.name] = this.value;
                        });
                        hotelsCheck(data, 'maka');
                        return false;

                    }
                    // $('#checkk_out').data("DateTimePicker").show();
                });
            });
            $('input[name^="madina_check"]').each(function () {
                $(this).on("dp.change", function (e) {
                    var check_in = $('#madina_check_in_date').val();
                    var check_out = $('#madina_check_out_date').val();
                    if (check_in != '' && check_out != '') {
                        var data = {};
                        data['hotel_id'] = $('#madina_hotels_id').val();
                        data['check_in_date'] = check_in;
                        data['check_out_date'] = check_out;
                        $.each($('input[name^="room_num"').serializeArray(), function () {
                            data[this.name] = this.value;
                        });
                        hotelsCheck(data, 'madina');


                    }
                    // $('#checkk_out').data("DateTimePicker").show();
                });
            });
            $('input[name^="gada_check"]').each(function () {
                $(this).on("dp.change", function (e) {
                    var check_in = $('#gada_check_in_date').val();
                    var check_out = $('#gada_check_out_date').val();
                    if (check_in != '' && check_out != '') {
                        var data = {};
                        data['hotel_id'] = $('#gada_hotels_id').val();
                        data['check_in_date'] = check_in;
                        data['check_out_date'] = check_out;
                        $.each($('input[name^="room_num"').serializeArray(), function () {
                            data[this.name] = this.value;
                        });
                        hotelsCheck(data, 'gada');


                    }
                    // $('#checkk_out').data("DateTimePicker").show();
                });
            });

            $('#maka_hotels_id').on("change", function (e) {
                var check_in = $('#maka_check_in_date').val();
                var check_out = $('#maka_check_out_date').val();
                if (check_in != '' && check_out != '') {
                    var data = {};
                    data['hotel_id'] = $('#maka_hotels_id').val();
                    data['check_in_date'] = check_in;
                    data['check_out_date'] = check_out;
                    $.each($('input[name^="room_num"').serializeArray(), function () {
                        data[this.name] = this.value;
                    });
                    hotelsCheck(data, 'maka');


                }
                // $('#checkk_out').data("DateTimePicker").show();
            });
            $('#madina_hotels_id').on("change", function (e) {
                var check_in = $('#madina_check_in_date').val();
                var check_out = $('#madina_check_out_date').val();
                if (check_in != '' && check_out != '') {
                    var data = {};
                    data['hotel_id'] = $('#madina_hotels_id').val();
                    data['check_in_date'] = check_in;
                    data['check_out_date'] = check_out;
                    $.each($('input[name^="room_num"').serializeArray(), function () {
                        data[this.name] = this.value;
                    });
                    hotelsCheck(data, 'madina');


                }
                // $('#checkk_out').data("DateTimePicker").show();
            });
            $('#gada_hotels_id').on("change", function (e) {
                var check_in = $('#gada_check_in_date').val();
                var check_out = $('#gada_check_out_date').val();
                if (check_in != '' && check_out != '') {
                    var data = {};
                    data['hotel_id'] = $('#gada_hotels_id').val();
                    data['check_in_date'] = check_in;
                    data['check_out_date'] = check_out;
                    $.each($('input[name^="room_num"').serializeArray(), function () {
                        data[this.name] = this.value;
                    });
                    hotelsCheck(data, 'gada');


                }
                // $('#checkk_out').data("DateTimePicker").show();
            });



        }
        var handleChangePayWays = function () {
            $('#pay_ways_value').on('change', function () {
                var value = $(this).val();
                if ($('.pay_ways_box').hasClass('active')) {
                    $('.pay_ways_box.active').slideUp(1000, function () {
                        $('.pay_ways_box.active').removeClass('active');
                        $('#' + value).slideDown(1000);
                        $('#' + value).addClass('active');
                    });
                } else {
                    $('#' + value).slideDown(1000);
                    $('#' + value).addClass('active');
                }


            });
        }
        var addDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        var addDaystToDate = function (check_in_date) {
            var oneDay = 24 * 60 * 60 * 1000;
            var dd = check_in_date.getDate();
            var mm = check_in_date.getMonth() + 1;
            var y = check_in_date.getFullYear();
            var date = new Date(y, mm, dd);
            var new_date = date.getTime() + oneDay;
            alert(new_date);
        }
        var getYearsOrDaysCountBetweenTwoDates = function (check_in_date, check_out_date) {
            var oneDay = 24 * 60 * 60 * 1000;
            var oneYear = 31536000;
            var date1 = new Date(check_in_date);
            var date2 = new Date(check_out_date);
            var diff = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
            return diff;
        }
        var calculateAge = function (birthday) {
            var now = new Date();
            var past = new Date(birthday);
            var nowYear = now.getFullYear();
            var pastYear = past.getFullYear();
            var age = nowYear - pastYear;
            return age;
        };
        var handleChangeTravellersNum = function () {
            $('#no_of_adults').on('change keyup', function () {
                var adult_num = $(this).val();
                if (adult_num != '' && adult_num != 0) {
                    handlingFormForTravellersInfo(true, false, false, adult_num);
                } else {
                    $('#traveller-info-box-adult').remove();
                }
            });
            $('#no_of_childs').on('change keyup', function () {
                var childs_num = $(this).val();
                //alert(childs_num);
                if (childs_num != '' && childs_num != 0) {
                    handlingFormForTravellersInfo(false, true, false, childs_num);
                } else {
                    $('#traveller-info-box-childs').remove();
                }
            });
            $('#no_of_infants').on('change keyup', function () {
                var infant_num = $(this).val();
                if (infant_num != '' && infant_num != 0) {
                    handlingFormForTravellersInfo(false, false, true, infant_num);
                } else {
                    $('#traveller-info-box-infant').remove();
                }
            });
        }

        var handleChangeNumOfRooms = function () {
            var no_of_adults = $('#no_of_adults').val();
            var count = 0;
            $("input[id^='room_num']").each(function () {
                var room_num = parseInt($(this).val());
                if (room_num > 0) {
                    var max_adults = parseInt($(this).data('max-adults'));
                    var total = room_num * max_adults;
                    count += total;
                }

            });
            if (count > no_of_adults) {
                $('#travellers-num-alert').html(lang.room_num_validate).fadeIn(1000);
                next = false;

            } else {
                $('#travellers-num-alert').html('').fadeOut(500);
                next = true;
            }
        }
        var handleChangeRoomAdultsNum = function () {
            var alert_messages = {};
            var no_of_adults = $('#no_of_adults').val();
            var no_of_childs = $('#no_of_childs').val();
            var adults_count = 0;
            var childs_count = 0;
            $("input[id^='room_num']").each(function () {
                var room_num = parseInt($(this).val());
                if (room_num > 0) {
                    var max_adults = parseInt($(this).data('max-adults'));
                    var total = room_num * max_adults;
                    adults_count += total;
                }

            });
            $("input[id^='room_childs_num']").each(function () {
                var room_childs_num = parseInt($(this).val());
                if (room_childs_num > 0) {
                    //var max_childs = parseInt($(this).data('max-childs'));
                    var total = room_childs_num;
                    childs_count += total;
                }

            });

            if (adults_count != 0 && adults_count != no_of_adults) {
                alert_messages['room_adults_message'] = lang.adults_number_should_be_equal_to_total_of_adults_in_rooms_that_you_choosed_it;

            } else {
                delete alert_messages['room_adults_message'];

            }
            if (childs_count != 0 && childs_count != no_of_childs) {
                alert_messages['room_childs_message'] = lang.childs_number_should_be_equal_to_total_of_childs_in_rooms_that_you_choosed_it;

            } else {
                delete alert_messages['room_childs_message'];

            }

            var items = [];
            $.each(alert_messages, function (i, element) {
                items.push('<li class="list-group-item list-group-item-danger">' + element + '</li>');
            });
            console.log(items);
            if (items.length > 0) {
                $("#travellers-num-alert").html('').html(items.join('')).show(700);
                next = false;
            } else {
                $('#travellers-num-alert').html('').hide(700);
                next = true;
            }
        }
        var handleChangeRoomChildsNum = function () {
            var no_of_childs = $('#no_of_childs').val();
            var count = 0;
            $("input[id^='room_childs_num_']").each(function () {
                var room_childs_num = parseInt($(this).val());
                if (room_childs_num > 0) {
                    count += room_childs_num;
                }

            });
            if (count > no_of_childs) {
                $('#room_childs_num_message').html('error childs').fadeIn(1000);
                next = false;

            } else {
                $('#travellers-num-alert').html('').fadeOut(500);
                next = true;
            }
        }

        var handleChangeRequiredRadios = function (name, content) {
            $("input[name='" + name + "']").on('change', function () {
                if ($(this).val() == 1) {
                    $('#' + content).slideDown(500);
                    flight_bookings_section_open = true;
//                    if (inputs_required_ids) {
//                        for (var x = 0; x < inputs_required_ids.length; x++) {
//                            $('[name="' + inputs_required_ids[x] + '"]').rules("add", {
//                                required: true,
//                                messages: {
//                                    required: lang.required,
//                                }
//                            });
//                        }
//                    }

                } else {
                    $('#' + content).slideUp(500);
                    flight_bookings_section_open = false;
                    if (name == 'maka_hotels_required') {
                        maka_hotels_section_status = true;
                    } else if (name == 'madina_hotels_required') {
                        madina_hotels_section_status = true;
                    } else if (name == 'gada_hotels_required') {
                        gada_hotels_section_status = true;
                    } else if (name == 'flight_bookings_required') {
                        next = true;
                    }
                }
            });
        }


        var handleChangeServices = function () {
            $(document).on('change keyup', "input[id^='extra_service_for_person_num']", function () {
                var extra_service_for_person_id = $(this).attr('id');


                var extra_service_for_person_num_input_name = $(this).attr('name');
                $("input[name='" + extra_service_for_person_num_input_name + "']").rules("add", {
                    max: $('#adult_num').val(),
                    messages: {
                        max: "عدد الأفراد يجب ان يكون اقل من او يساوى عدد البالغين",
                    }
                });
                var extra_service_for_person_num = $(this).val();
                var extra_service_for_person_id = $(this).attr('id');
                var service_price = $(this).data('service-price');
                var service_cost = extra_service_for_person_num * service_price;
                //console.log(booking_price);
                booking_price[extra_service_for_person_id] = service_cost;
                var price = 0;
                for (var i in booking_price) {
                    price += booking_price[i];
                }
                $('#booking-price').html(price);

            });

            $("input[id^='extra_services_for_cards']").on('change', function () {
                if ($(this).is(':checked')) {
                    var service_price = $(this).data('service-price');
                    var service_id = $(this).attr('id');
                    booking_price[service_id] = service_price;
                    var price = 0;
                    for (var i in booking_price) {
                        price += booking_price[i];
                    }
                    $('#booking-price').html(price);
                } else {
                    var service_price = 0;
                    var service_id = $(this).attr('id');
                    booking_price[service_id] = service_price;
                    var price = 0;
                    for (var i in booking_price) {
                        price += booking_price[i];
                    }
                    $('#booking-price').html(price);
                }
            });
        }
        var calculatePrice = function () {

            //booking_price[name] = value;
            for (var i in booking_price) {
                price += booking_price[i];
            }

            $('#booking-price').html(price);
        }




        var handlePaymentSubmit = function () {
            $('#paymentForm').validate({
                rules: {
                    pay_ways_value: {
                        required: true,
                    },
                    home_phone: {
                        required: true,
                    },
                    home_date_of_collection: {
                        required: true,
                    },
                    home_address: {
                        required: true,
                    },
                    work_phone: {
                        required: true,
                    },
                    work_date_of_collection: {
                        required: true,
                    },
                    work_address: {
                        required: true,
                    },
                },
                messages: lang.payment_form_messages,
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
                }
            });
            $('#paymentForm .submit-form').click(function () {
                if ($('#paymentForm').validate().form()) {
                    $('#paymentForm').submit();
                }
                return false;
            });

            $('#paymentForm').submit(function () {
                var action = config.site_url + '/plan_your_trip/addPaymentDataToReservation';
                var formData = new FormData($(this)[0]);
                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);

                        if (data.type == 'success')
                        {

                            bootbox.dialog({
                                message: data.message,
                                title: lang.message,
                                buttons: {
                                    danger: {
                                        label: 'اغلاق',
                                        className: "red"
                                    }
                                }
                            });
                        } else {

                            if (typeof data.errors !== 'undefined') {   //validation errors so go on
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error');
                                    $('#' + i).parent().find(".help-block").html(data.errors[i]).css('opacity', 1)
                                }
                            }
                            if (typeof data.message !== 'undefined') {  //message to user
                                alert(data.message);
                            }
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $('.loading').addClass('hide');
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
                    dataType: "json",
                    type: "POST"
                });

                return false;

            })
        }
        var handleSubmit = function () {

            jQuery.validator.addMethod("checkAge", function (value) {
                var age = App.calculateAge(value);
                if (age < 16) {
                    return false;
                } else {
                    return true;
                }
            }, lang.client_age_validate);
            jQuery.validator.addMethod("checkAdultAge", function (value) {
                var age = App.calculateAge(value);
                if (age > 12) {
                    return true;
                } else {
                    return false;
                }
            }, lang.adult_age_validate);
            jQuery.validator.addMethod("checkChildAge", function (value) {
                var age = App.calculateAge(value);
                if (age >= 2 && age <= 12) {
                    return true;
                } else {
                    return false;
                }
            }, lang.child_age_validate);
            jQuery.validator.addMethod("checkInfantAge", function (value) {
                var age = App.calculateAge(value);
                if (age < 2) {
                    return true;
                } else {
                    return false;
                }
            }, lang.infant_age_validate);

            $('#travellers-num').validate({
                rules: {
                    no_of_adults: {
                        required: true,
                        min: 1,
                    },
                },
                messages: lang.travellers_num_messages,
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
                }
            });
            $('input[name^="room_childs_num"]').each(function () {
                $('input[name="room_childs_num[' + $(this).data('id') + ']"]').rules("add", {
                    max: $(this).data('max-childs'),
                    messages: {
                        max: lang.enter_a_value_less_than_or_equal_to + ' ' + $(this).data('max-childs'),
                    }
                });
            });
            $('#flight-bookings').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                    going_from: {
                        required: true,
                    },
                    going_to: {
                        required: true,
                    },
                    return_from: {
                        required: true,
                    },
                    return_to: {
                        required: true,
                    },
                    going_date: {
                        required: true,
                    },
                    return_date: {
                        required: true,
                    },
                },
                messages: lang.flight_bookings_messages,
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
                }
            });
            $('#hotel-bookings').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                    maka_hotels_id: {
                        required: true,
                    },
                    maka_check_in_date: {
                        required: true,
                    },
                    maka_check_out_date: {
                        required: true,
                    },
                    madina_hotels_id: {
                        required: true,
                    },
                    madina_check_in_date: {
                        required: true,
                    },
                    madina_check_out_date: {
                        required: true,
                    },
                    gada_hotels_id: {
                        required: true,
                    },
                    gada_check_in_date: {
                        required: true,
                    },
                    gada_check_out_date: {
                        required: true,
                    },
                },
                messages: lang.hotel_bookings_messages,
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
                }
            });
            $('#travellers-data').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                    name: {
                        required: true
                    },
                    phone_1: {
                        required: true
                    },
                    phone_2: {
                        required: true
                    },
                    email: {
                        required: true
                    },
                    birthdate: {
                        required: true,
                        checkAge: true
                    },
                },
                messages: lang.hotel_bookings_messages,
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('');
                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html());
                }
            });
            $(".next-step").click(function (e) {
                next = true;
                end = false;
                var form_type = $(this).data('form-type');
                var form_data = $('#' + form_type).serializeArray();
                var form_validate = $('#' + form_type).validate().form();
                if (!maka_hotels_section_status || !madina_hotels_section_status || !gada_hotels_section_status) {
                    form_validate = false;
                }

                if (form_validate == false) {
                    next = false;
                } else {
                    next = true;

                    if (form_type == 'travellers-num') {
                        //handleChangeNumOfRooms();
                        handleChangeRoomAdultsNum();
                        if (next) {
                            handleTravellersNum(form_data);

                        }
                    }
                    if (form_type == 'flight-bookings') {

                        handleFlightsBookings(form_data);
                    }
                    if (form_type == 'hotel-bookings') {
//                        if (maka_hotels_section_open || madina_hotels_section_open || gada_hotels_section_open) {
//                        }
                        handleHotelsBookings(form_data);
                    }
                    if (form_type == 'extra-services') {
                        handleExtraServices(form_data);
                    }
                    if (form_type == 'travellers-data') {
                        handleTravellersData(form_data);
                        end = true;
                    }

                }
                if (next) {
                    /*end*/
                    if (end) {
                        handleBooking();
                    }
                    //go to next tab
                    var $active = $('#myWizard .nav-pills li.active');
                    $active.next().removeClass('disabled');
                    nextTab($active);
                    return false;
                } else {
                    console.log('errors');
                    return false;
                }

            });
            $(".prev-step").click(function (e) {
                var $active = $('#myWizard .nav-pills li.active');
                prevTab($active);
                return false;
            });
            var nextTab = function (elem) {
                $(elem).next().find('a[data-toggle="tab"]').click();
            }
            var prevTab = function (elem) {
                $(elem).prev().find('a[data-toggle="tab"]').click();
            }



        }

        var handleExtraServices = function (form_data) {
            storeData(form_data);
            /*start sidebar*/
            for (var x = 0; x < form_data.length; x++) {
                var elem = form_data[x];
                var name = elem.name;
                var value = elem.value;
                if (name == 'transportation' || name == 'visa_required') {
                    var html = $('#' + name).find('option:selected').html();
                    if (value > 0) {
                        $('#s_' + name).html(html);
                    }
                } else {
                    var html = value;
                    $('#s_' + name).html(html);

                }

            }
            /*end*/

        }
        var handleTravellersData = function (form_data) {
            storeData(form_data);
        }
        var handleTravellersNum = function (form_data) {
            storeData(form_data);
            $('#rooms_info .table tbody').html('');
            $('#travellers_info .table tbody').html('');
            /*start sidebar*/
            var rooms_ids = [];
            var dataForShowingHotels = {};
            for (var x = 0; x < form_data.length; x++) {
                var elem = form_data[x];
                var name = elem.name;
                var value = elem.value;
                var html = '';
                if (name.match("^room_num")) {
                    if (value > 0) {
                        var id = $('input[name="' + name + '"]').data('id');
                        rooms_ids.push(id);
                        var type = $('input[name="' + name + '"]').data('type');
                        html = '<tr>' +
                                '<td>' + type + '</td>' +
                                '<td>' + value + '</td>' +
                                '</tr>';
                        $('#rooms_info .table tbody').append(html);
                    }


                } else if (name == 'no_of_adults' || name == 'no_of_childs' || name == 'no_of_infants') {
                    var type = $('#' + name).data('type');
                    if (value > 0) {
                        dataForShowingHotels[name] = value;
                        html = '<tr>' +
                                '<td>' + type + '</td>' +
                                '<td>' + value + '</td>' +
                                '</tr>';
                        $('#travellers_info .table tbody').append(html);
                    }

                }

            }
            /*end*/

            /*start show hotels according to rooms choosed*/
//            if (rooms_ids.length > 0) {
//                dataForShowingHotels['rooms_ids'] = rooms_ids;
//                handleShowHotelsAccordingToRoomsChoosed(dataForShowingHotels);
//
//            }
            /*end*/
        }
        var handleHotelsBookings = function (form_data) {
            storeData(form_data);  //store data in formData
            var hotels = [];
            /*start sidebar*/
            for (var x = 0; x < form_data.length; x++) {
                var elem = form_data[x];
                var name = elem.name;
                var value = elem.value;
                if (name == 'maka_no_of_nights' && value > 0) {
                    var hotel_title = $('#maka_hotels_id').find('option:selected').html();
                    var html = '<div class="col-md-12 rowing">' +
                            '<h5><i class="fa fa-hotel"></i>' + lang.maka + '</h5>' +
                            '<p>' + hotel_title + '</p>' +
                            '</div>';
                    html += '<div class="col-md-12 rowing">' +
                            '<h5><i class="fa fa-hotel"></i>' + lang.nights_number + '</h5>' +
                            '<p>' + value + '</p>' +
                            '</div>';
                    hotels.push(html);

                }
                if (name == 'madina_no_of_nights' && value > 0) {
                    var hotel_title = $('#madina_hotels_id').find('option:selected').html();
                    var html = '<div class="col-md-12 rowing">' +
                            '<h5><i class="fa fa-hotel"></i>' + lang.madina + '</h5>' +
                            '<p>' + hotel_title + '</p>' +
                            '</div>';
                    html += '<div class="col-md-12 rowing">' +
                            '<h5><i class="fa fa-hotel"></i>' + lang.nights_number + '</h5>' +
                            '<p>' + value + '</p>' +
                            '</div>';
                    hotels.push(html);

                }
                if (name == 'gada_no_of_nights' && value > 0) {
                    var hotel_title = $('#gada_hotels_id').find('option:selected').html();
                    var html = '<div class="col-md-12 rowing">' +
                            '<h5><i class="fa fa-hotel"></i>' + lang.gada + '</h5>' +
                            '<p>' + hotel_title + '</p>' +
                            '</div>';
                    html += '<div class="col-md-12 rowing">' +
                            '<h5><i class="fa fa-hotel"></i>' + lang.nights_number + '</h5>' +
                            '<p>' + value + '</p>' +
                            '</div>';
                    hotels.push(html);

                }
                $('#hotels_sidebar').html(hotels.join(''));

            }
            /*end*/

        }
        var handleFlightsBookings = function (form_data) {
            storeData(form_data);  //store data in formData
            var action = config.site_url + 'plan_your_trip/handleFlightsBookings';
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
                        flight_data = data.message;

                        /*start sidebar*/
                        for (var x = 0; x < form_data.length; x++) {
                            var elem = form_data[x];
                            var name = elem.name;
                            var value = elem.value;
                            var html = '';
                            if (name == 'going_from' || name == 'going_to' || name == 'return_from' || name == 'return_to') {

                                html = $('#' + elem.name).find('option:selected').html();
                            } else {

                                html = value;
                            }
                            $('#s_' + elem.name).html(html);

                        }
                        /*end*/


                    } else {
                        if (typeof data.errors !== 'undefined') {   //validation errors so go on

                        }
                        if (typeof data.message !== 'undefined') {  //message to user
                            $('#flight-bookings-alert').html(lang.not_available).fadeIn(1000);
                            next = false;
                        }

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
        var hotelsCheck = function (data, hotel_type) {
            var action = config.site_url + 'plan_your_trip/hotelsCheck';
            $.ajax({
                url: action,
                data: $.param(data),
                async: false,
                success: function (data) {
                    console.log(data);
                    if (data.type == 'success') {
                        // var nights = getYearsOrDaysCountBetweenTwoDates(data.check_in_date, data.check_out_date);
                        $('#' + hotel_type + '_no_of_nights').val(data.message);
                        $('#' + hotel_type + '_alert').html('').hide(500);
                        if (hotel_type == 'maka') {
                            maka_hotels_section_status = true;
                        } else if (hotel_type == 'madina') {
                            madina_hotels_section_status = true;
                        } else if (hotel_type == 'gada') {
                            gada_hotels_section_status = true;
                        }
                    } else {
                        var items = [];
                        for (var x = 0; x < data.errors.length; x++) {
                            items.push('<li class="list-group-item list-group-item-danger">' + lang.the_room + ' ' + data.errors[x][lang.title_slug] + ' ' + lang.that_you_choose_it_before + ' ' + lang.not_available + '</li>');
                        }
                        $('#' + hotel_type + '_alert').html('').html(items.join('')).show(500);
                        if (hotel_type == 'maka') {
                            maka_hotels_section_status = false;
                        } else if (hotel_type == 'madina') {
                            madina_hotels_section_status = false;
                        } else if (hotel_type == 'gada') {
                            gada_hotels_section_status = false;
                        }
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
        var handleShowingHotelRoomTypes = function (no_of_adults, no_of_childs, no_of_infants) {
            var action = config.site_url + 'plan_your_trip/handleShowingHotelRoomTypes';
            $.ajax({
                url: action,
                data: {
                    'no_of_adults': no_of_adults,
                    'no_of_childs': no_of_childs,
                    'no_of_infants': no_of_infants,
                },
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {

                    console.log(data);
                    if (data.type == 'success') {
                        $('#vpc_reservation_id').val(data.data.reservation_id);
                        $('#print_reservation_id').val(data.data.reservation_id);
                        if (data.data.reservation_by_visa) {
                            /*payment*/

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
        var handleShowingHotelRoomTypes = function (no_of_adults, no_of_childs, no_of_infants) {
            var action = config.site_url + 'plan_your_trip/handleShowingHotelRoomTypes';
            $.ajax({
                url: action,
                data: {
                    'no_of_adults': no_of_adults,
                    'no_of_childs': no_of_childs,
                    'no_of_infants': no_of_infants,
                },
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {

                    console.log(data);
                    if (data.type == 'success') {
                        $('#vpc_reservation_id').val(data.data.reservation_id);
                        $('#print_reservation_id').val(data.data.reservation_id);
                        if (data.data.reservation_by_visa) {
                            /*payment*/

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

        var handleShowHotelsAccordingToRoomsChoosed = function (data) {
            var action = config.site_url + 'plan_your_trip/handleShowHotelsAccordingToRoomsChoosed';
            $.ajax({
                url: action,
                data: $.param(data),
                async: false,
                success: function (data) {

                    console.log(data);
                    var maka_hotels = [];
                    var madina_hotels = [];
                    var gada_hotels = [];
                    if (data.type == 'success') {
                        for (var x = 0; x < data.data.length; x++) {
                            var one = data.data[x];
                            if (one.maka_or_madina_or_gada == 1) {   //maka hotels
                                maka_hotels.push('<option value="' + one['id'] + '">' + one[lang.title_slug] + '</option>');
                            }
                            if (one.maka_or_madina_or_gada == 2) {   //madina hotels
                                madina_hotels.push('<option value="' + one['id'] + '">' + one[lang.title_slug] + '</option>');
                            }
                            if (one.maka_or_madina_or_gada == 3) {   //gada hotels
                                gada_hotels.push('<option value="' + one['id'] + '">' + one[lang.title_slug] + '</option>');
                            }

                        }
                        if (maka_hotels.length > 0) {
                            $("#maka_hotels_box").show();
                            $("#maka_hotels_id").html(maka_hotels.join(''));
                        } else {
                            $("#maka_hotels_box").hide();
                        }
                        if (madina_hotels.length > 0) {
                            $("#madina_hotels_box").show();
                            $("#madina_hotels_id").html(madina_hotels.join(''));
                        } else {
                            $("#madina_hotels_box").hide();
                        }
                        if (gada_hotels.length > 0) {
                            $("#gada_hotels_box").show();
                            $("#gada_hotels_id").html(gada_hotels.join(''));
                        } else {
                            $("#maka_hotels_box").hide();
                        }

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
                title = lang.adults;
                div_content_id = 'traveller-info-box-adult';
                travellers_names_name = 'travellers_names_adult';
                travellers_gender_name = 'travellers_gender_adult';
                travellers_names_id = 'travellers_names_adult';
                birthdate_name = 'birthdate_adult';
                birthdate_id = 'birthdate_adult';
                birthdate_type = 'birthdate_adult';
            }
            if (child_num && !adult_num && !infant_num) {
                title = lang.childs;
                div_content_id = 'traveller-info-box-childs';
                travellers_names_name = 'travellers_names_childs';
                travellers_gender_name = 'travellers_gender_childs';
                travellers_names_id = 'travellers_names_childs';
                birthdate_name = 'birthdate_childs';
                birthdate_id = 'birthdate_childs';
                birthdate_type = 'birthdate_childs';
            }
            if (infant_num && !adult_num && !child_num) {
                title = lang.infants;
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
                        '<div class="form-group form-gp">' +
                        '<div class="control-label"> ' + lang.name + ': </div>' +
                        '<input class="form-control" type="text"  name="' + travellers_names_name + '[' + counter + ']" id="' + travellers_names_id_final + '">' +
                        '<div class="help-block"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-4 pull-left" >' +
                        '<div class="form-group form-gp" >' +
                        '<div class="control-label">  ' + lang.gender + ' </div>' +
                        '<select class="form-control amr color-3"  name="' + travellers_gender_name + '[' + counter + ']">' +
                        '<option selected disabled>  ' + lang.choose + ' </option>' +
                        '<option value=" ' + lang.male + '" >  ' + lang.male + ' </option>' +
                        '<option value=" ' + lang.female + '" >  ' + lang.female + ' </option>' +
                        '</select>' +
                        '<div class="help-block"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-4 pull-left">' +
                        '<div class="form-group form-gp">' +
                        '<div class="control-label"> ' + lang.birthdate + '</div>' +
                        '<div class="input-group" >' +
                        '<input class="form-control birthdates ' + birthdate_type + '" type="text"  data-birthdate-type="' + birthdate_type + '"  name="' + birthdate_name + '[' + counter + ']" id="' + birthdate_id_final + '">' +
                        '<span class="input-group-addon"><i class="fa fa-calendar fa-fw"></i></span>' +
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
            $('#' + div_content_id).show();
            /*validations fro adult*/
            if (adult_num && !child_num && !infant_num) {
                for (var x = 0; x < num; x++) {
                    //alert(x);
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
            /*end*/
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
                            required: lang.required,
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
        var handleBooking = function () {
            var action = config.site_url + 'plan_your_trip/BookNow';
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
                        $('#pay_ways').slideDown(1000, function () {
                            $('#booking_price').html('<h5>' + data.data.booking_price + ' EGP</h5>').removeClass('bigEntrance').addClass('bigEntrance');
                            $('#plan_your_trip_reservation_id').val(data.data.plan_your_trip_reservation_id);
                        });

                    } else {
                        for (var x = 0; x < data.errors.length; x++) {
                            $('.error-message').html('<li class="list-group-item list-group-item-danger">' + data.errors[x] + '</li>');
                            $('.error-message').fadeIn(1000);
                        }

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
                    //formData.append(elem.name, null);
                }

            }

            for (var x = 0; x < data.length; x++) {
                var elem = data[x];
                formData.append(elem.name, elem.value);
            }
        }

        return {
            init: function () {
                init();
            }
        };
    }();
    $(document).ready(function () {
        Plan_your_trip.init();


    });