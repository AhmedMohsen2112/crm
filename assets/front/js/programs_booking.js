    var formData = new FormData();
    var booking_price = {};
    var next = true;
    var count = 2;
    var countForName = 1;
    var price = 0;
    var Booking = function () {

        var init = function () {
            handleTabs();
            $.extend(lang, new_lang);
            handleDatesJs();
            handleSubmit();
            handleChangeRoomAdultsAndChildsAndInfants();
            handleChangeServices();
            handleAddRemoveMoreExtraServicesPersonRow();
            handleChangePayWays();
            printing();
            handlePaymentSubmit();
        };
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
                var action = config.site_url + '/programs/addPaymentDataToReservation';
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
        var printing = function () {
            $(document).on('click', '#print-btn', function () {
                var action = config.site_url + '/programs/print_report';
                $.ajax({
                    url: action,
                    data: {
                        programs_reservations_id: $('#programs_reservations_id').val(),
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
        var calculatePrice = function (name, value) {
            booking_price[name] = value;
            price = 0;
            for (var i in booking_price) {
                price += booking_price[i];
            }
            $('#booking-price').html(price);
        }
        var handleChangeRoomAdultsAndChildsAndInfants = function () {
            $("input[id^='room_adult_num']").on('change keyup', function () {
                var alert_messages = {};
                var html = '';
                var adults_count = 0;
                var childs_count = 0;
                $("input[id^='room_adult_num']").each(function () {
                    var adults_num_in_room = parseInt($(this).val());
                    if (isNaN(adults_num_in_room)) {
                        adults_num_in_room = 0;
                    }
                    var room_type = $(this).data('type');
                    if (adults_num_in_room > 0) {
                        /*start update sidebar rooms*/
                        html += '<tr>';
                        html += '<td>' + room_type + '</td>';
                        html += '<td>' + adults_num_in_room + '</td>';
                        html += '</tr>';
                        /*end*/
                        adults_count += adults_num_in_room;
                        childs_count += $(this).data('max-childs');
                    }
                    calculatePrice($(this).attr('id'), $(this).data('adult-price') * adults_num_in_room);

                });
                $('#adult_num_span').html(adults_count);
                $('#room-reserved-box').html(html);
                if (adults_count > 0) {
                    delete alert_messages['no_rooms_message'];
                    if (childs_count != 0 && childs_count < $('#childs_num').val()) {
                        alert_messages['max_childs_message'] = lang.childs_number_should_be_less_than_or_equal_to_childs_number_in_every_room;

                    } else {
                        delete alert_messages['max_childs_message'];

                    }
                } else {
                    alert_messages['no_rooms_message'] = lang.you_donnot_choose_any_room;

                }
                var items = [];
                $.each(alert_messages, function (i, element) {
                    items.push('<li class="list-group-item list-group-item-danger">' + element + '</li>');
                });
                if (items.length > 0) {
                    $("#travellers-num-alert").html('').html(items.join('')).show(500);
                    next = false;
                } else {
                    $('#travellers-num-alert').html('').hide(500);
                    next = true;
                }
            });
            $('#childs_num').on('change keyup', function () {
                var childs_num = parseInt($(this).val());
                if (isNaN(childs_num)) {
                    childs_num = 0;
                }
                if (childs_num != '' && childs_num != 0) {
                    $('#childs_num_span').html(childs_num);
                } else {
                    $('#childs_num_span').html(0);
                }
                calculatePrice($(this).attr('id'), $(this).data('price') * childs_num);
            });
            $('#infants_num').on('change keyup', function () {
                var infant_num = parseInt($(this).val());
                if (isNaN(infant_num)) {
                    infant_num = 0;
                }
                if (infant_num != '' && infant_num != 0) {
                    $('#infant_num_span').html(infant_num);
                } else {
                    $('#infant_num_span').html(0);
                }
                calculatePrice($(this).attr('id'), $(this).data('price') * infant_num);
            });
        }
        var handleChangeRoomAdultsBeforeSubmit = function () {
            var alert_messages = {};
            var adults_count = 0;
            $("input[id^='room_adult_num']").each(function () {
                var adults_num_in_room = parseInt($(this).val());
                if (isNaN(adults_num_in_room)) {
                    adults_num_in_room = 0;
                }
                if (adults_num_in_room > 0) {
                    adults_count += adults_num_in_room;
                }

            });
            if (adults_count > 0) {
                delete alert_messages['no_rooms_message'];
            } else {
                alert_messages['no_rooms_message'] = lang.you_donnot_choose_any_room;

            }
            var items = [];
            $.each(alert_messages, function (i, element) {
                items.push('<li class="list-group-item list-group-item-danger">' + element + '</li>');
            });
            if (items.length > 0) {
                $("#travellers-num-alert").html('').html(items.join('')).show(500);
                next = false;
            } else {
                $('#travellers-num-alert').html('').hide(500);
                next = true;
            }

        }

        var handleDatesJs = function () {

            $('#birthdate').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        maxDate: new Date()
                    }
            );
            $('#home_date_of_collection,#work_date_of_collection').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        minDate: new Date()
                    }
            );



        }
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
        var getYearsCountBetweenTwoDates = function () {
            var oneDay = 24 * 60 * 60 * 1000;
            var oneYear = 31536000;
            var date1 = new Date(1992, 01, 12);
            var date2 = new Date(2008, 01, 22);
            var diff = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
            alert(diff);
        }
        var calculateAge = function (birthday) {
            var now = new Date();
            var past = new Date(birthday);
            var nowYear = now.getFullYear();
            var pastYear = past.getFullYear();
            var age = nowYear - pastYear;
            return age;
        };
        var getAdultsNum = function () {
            var adult_num = 0;
            $("input[id^='room_adult_num']").each(function () {
                var room_adult_num = parseInt($(this).val());
                if (room_adult_num > 0) {
                    adult_num += room_adult_num;
                }

            });
            return adult_num;
        }

        var handleChangeServices = function () {
            $(document).on('change keyup', "input[id^='extra_service_for_person_num']", function () {
                var html = '';
                var adult_num = getAdultsNum;
                $("input[id^='extra_service_for_person_num']").each(function () {
                    $("input[name='" + $(this).attr('name') + "']").rules("add", {
                        max: adult_num,
                        messages: {
                            max: lang.max_adults_validate,
                        }
                    });
                    var extra_service_for_person_num = parseInt($(this).val());
                    if (isNaN(extra_service_for_person_num)) {
                        extra_service_for_person_num = 0;
                    }
                    var service_type = $(this).data('type');
                    if (extra_service_for_person_num > 0) {
                        /*start update sidebar services persons*/
                        html += '<tr class="extra-services-persons-sidebar-row">';
                        html += '<td>' + service_type + '</td>';
                        html += '<td>' + extra_service_for_person_num + '</td>';
                        html += '</tr>';
                        /*end*/
                    }
                    calculatePrice($(this).attr('id'), $(this).data('price') * extra_service_for_person_num);

                });
                $('#extra-services-persons-sidebar').html(html);
                if ($('.extra-services-persons-sidebar-row').length == 0) {
                    $('#extra-services-persons-sidebar').html('<tr><td colspan="2">لا يوجد</td></tr>');
                }

            });

            $("input[id^='extra_services_for_cards']").on('change', function () {
                var html = '';
                if ($(this).is(':checked')) {
                    calculatePrice($(this).attr('id'), $(this).data('price'));
                } else {
                    calculatePrice($(this).attr('id'), 0);
                }
                $("input[id^='extra_services_for_cards']:checked").each(function () {
                    var service_type = $(this).data('type');
                    /*start update sidebar services cards*/
                    html += '<tr class="extra-services-cards-sidebar-row">';
                    html += '<td>' + service_type + '</td>';
                    html += '</tr>';
                    /*end*/

                });
                $('#extra-services-cards-sidebar').html(html);
                if ($('.extra-services-cards-sidebar-row').length == 0) {
                    $('#extra-services-cards-sidebar').html('<tr><td>لا يوجد</td></tr>');
                }
            });
        }


        var handleAddRemoveMoreExtraServicesPersonRow = function () {
            var program_extra_services_persons_count = $('#program_extra_services_persons_count').val();
            var program_id = $('#program_id').val();
            $('#add-more-extra-services-person').on('click', function () {
                var adult_num = 0;
                $("input[id^='room_adult_num']").each(function () {
                    var room_adult_num = parseInt($(this).val());
                    if (room_adult_num > 0) {
                        adult_num += room_adult_num;
                    }

                });
                var row_extra_services_person_length = $('.row-extra-services-person').length;
                //alert(row_extra_services_person_length);
                if (row_extra_services_person_length < program_extra_services_persons_count) {
                    var action = config.site_url + 'programs/getProgramExtraServicesPerson';
                    $.ajax({
                        url: action,
                        data: {
                            program_id: program_id,
                            offset: row_extra_services_person_length,
                        },
                        async: false,
                        success: function (data) {

                            console.log(data);

                            if (data.type == 'success') {
                                var title = 'title_' + lang.lang_code;
                                var html = '<div class="row row-extra-services-person">' +
                                        '<div class="form-gp  col-md-4 pull-left">' +
                                        ' <label>الخدمة</label>' +
                                        ' <input class="form-control" disabled type="text" name="extra_service_for_person_ids[' + data.data[0].id + ']" id="extra_service_for_person_' + data.data[0].id + '" value="' + data.data[0][title] + ' : ' + data.data[0].price + '">' +
                                        '</div>' +
                                        '<div class="form-group form-gp  col-md-3 pull-left">' +
                                        ' <label class="control-label">عدد الافراد</label>' +
                                        '<input type="number" class="form-control" id="extra_service_for_person_num_' + data.data[0].id + '" name="extra_service_for_person_num[' + data.data[0].id + ']" value="0"  data-type="' + data.data[0][title] + '" data-price="' + data.data[0].price + '" class="form-control quantity-padding">' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '<div class="form-gp  col-md-2 pull-left">' +
                                        '<label>حذف خدمة</label>' +
                                        '<a class="btn btn-danger pull-right" id="remove-more-extra-services-person" href="#" style="width: 100%;"><i class="fa fa-plus"></i></a>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';

                                $('#extra-services-persons-box').append(html);

                                count++;
                                countForName++;

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

                return false;
            });
            $(document).on('click', '#remove-more-extra-services-person', function () {
                if (count > 1) {
                    count--;
                }

                //alert(count)
                $(this).closest('.row-extra-services-person').remove();
                var div_in_left_bar = $(this).data('left-bar-div');
                var extra_service_for_person_id_num_id = $(this).data('left-bar-div');
                $('.' + div_in_left_bar).remove();
                calculatePrice(extra_service_for_person_id_num_id, 0); //delete from price object
                return false;
            });
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
                if (age >= 2 && age < 10) {
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
            $('#programsBookingForm').validate({
                rules: {
                    fullname: {
                        required: true
                    },
                    phone: {
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
                messages: lang.form_client,
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
            $('input[name^="room_adult_num"]').each(function () {
                $('input[name="room_adult_num[' + $(this).data('id') + ']"]').rules("add", {
                    max: $(this).data('max-adults'),
                    messages: {
                        max: lang.enter_a_value_less_than_or_equal_to + ' ' + $(this).data('max-adults'),
                    }
                });
            });
            $('#programsBookingForm .submit-form').click(function () {

                if ($('#programsBookingForm').validate().form()) {

                    handleChangeRoomAdultsBeforeSubmit();
                    if (next) {
                        $('#programsBookingForm .submit-form').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i><span class="sr-only">Loading...</span>');
                        $('#programsBookingForm .submit-form').prop('disabled', true);
                        setTimeout(function () {
                            $('#programsBookingForm').submit();
                        }, 1000);


                    }
                }

                return false;
            });
            $('#programsBookingForm input').keypress(function (e) {
                if (e.which == 13) {
                    $('#programsBookingForm').submit(); //form validation success, call ajax form submit
                    return false;
                }
            });
            $('#programsBookingForm').submit(function () {
                //$('#programsBookingForm .submit-form').html('loading.....');
                var action = config.site_url + '/programs/BookNow';
                var formData = new FormData($(this)[0]);
                var adults_num = getAdultsNum();
                formData.append('adults_num', adults_num);
                formData.append('booking_price', price);

                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);

                        console.log(data)
                        if (data.type == 'success') {
                            $('#bookingBox').slideUp(500, function () {
                                $('#paymentBox').slideDown(500, function () {
                                    $('#programs_reservations_id').val(data.data.reservation_id);
                                    var details_box_offset_top = $('#myWizard').offset().top;
                                    $("html, body").animate({scrollTop: details_box_offset_top}, 500);
                                });
                            });
                        } else {
                            $('#programsBookingForm .submit-form').html(lang.save_and_continue);
                            $('#programsBookingForm .submit-form').prop('disabled', false);
                            var items = [];
                            for (var x = 0; x < data.errors.length; x++) {
                                items.push('<li class="list-group-item list-group-item-danger">' + data.errors[x] + '</li>');
                            }
                            if (items.length > 0) {
                                $("#errors_messages").html('').html(items.join('')).show(500);
                            } else {
                                $('#errors_messages').html('').hide(500);
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
        var handleBooking = function () {
            var action = config.base_url + 'programs/BookNow';
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
                        '<div class="form-group form-block type-2 clearfix">' +
                        '<div class="control-label form-label color-dark-2"> ' + lang.name + ': </div>' +
                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                        '<input class="form-control" type="text"  name="' + travellers_names_name + '[' + counter + ']" id="' + travellers_names_id_final + '">' +
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
                        '<div class="form-item date" >' +
                        '<input class="form-control birthdates ' + birthdate_type + '" type="text"  data-birthdate-type="' + birthdate_type + '"  name="' + birthdate_name + '[' + counter + ']" id="' + birthdate_id_final + '">' +
                        '<i class="awe-icon awe-icon-calendar"></i>' +
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