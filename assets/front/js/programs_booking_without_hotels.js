    var formData = new FormData();
    var booking_price = {};
    var next = true;
    var end = false;
    var count = 2;
    var countForName = 1;
    var Booking = function () {

        var init = function () {
            $.extend(lang, new_lang);
            handleDatesJs();
            handleSubmit();
            handleChangeLeftBar();
            handleChangeAdultChildInfantNum();
            handleChangeServices();
            handleAddRemoveMoreExtraServicesPersonRow();
            printing();
        };
        var handleDatesJs = function () {

            $('#birthdate').datetimepicker(
                    {
                        format: 'YYYY-MM-DD',
                        useCurrent: false,
                        maxDate: new Date()
                    }
            );



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

        var calculatePriceBs = function (booking_price) {
            var price = 0;
            for (var i in booking_price) {
                price += booking_price[i];
            }
            $('#booking-price').html(price);
        }

        var calculatePriceOfChildsAndInfants = function (type) {
            if (type == 'childs') {
                var childs_num = $('#childs_num').val();
                var child_price = $('#childs_num').data('child-price');

                if (childs_num != '' && childs_num != 0) {
                    calculatePrice('child_price', parseInt(child_price) * parseInt(childs_num));
                } else {
                    calculatePrice('child_price', 0);
                }
            }
            if (type == 'infants') {
                var infant_num = $('#infant_num').val();
                var infant_price = $('#infant_num').data('infant-price');

                if (infant_num != '' && infant_num != 0) {
                    calculatePrice('infant_price', parseInt(infant_price) * parseInt(infant_num));
                } else {
                    calculatePrice('infant_price', 0);
                }
            }
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
                calculatePrice(extra_service_for_person_id, service_cost);

            });

            $("input[id^='extra_services_for_cards']").on('change', function () {
                if ($(this).is(':checked')) {
                    var service_price = $(this).data('service-price');
                    var service_id = $(this).attr('id');
                    calculatePrice(service_id, service_price);
                } else {
                    var service_price = 0;
                    var service_id = $(this).attr('id');
                    calculatePrice(service_id, service_price);
                }
            });
        }
        var handleChangeAdultChildInfantNum = function () {

            $('#adult_num,#childs_num,#infant_num').on('keyup change', function () {

                var num = $(this).val();
                var price = $(this).data('price');
                var total = num * price;
                var id = $(this).attr('id');
                calculatePrice(id, total);
            });
        }
        var calculatePrice = function (name, value) {

            booking_price[name] = value;
            var price = 0;
            for (var i in booking_price) {
                price += booking_price[i];
            }
            //alert(price);
            $('#booking-price').html(price);
        }


        var handleChangeLeftBar = function () {
            $('#adult_num').on('change keyup', function () {
                var adult_num = $(this).val();
                //this action for extra_service_for_person_num field max number
                $("input[name^='extra_service_for_person_num']").each(function () {
                    $(this).attr('max', adult_num);
                });

                if (adult_num != '' && adult_num != 0) {
                    $('#adult_num_span').html(adult_num);
                    handlingFormForTravellersInfo(true, false, false, adult_num);
                } else {
                    $('#adult_num_span').html(0);
                    $('#traveller-info-box-adult').hide();
                }
            });
            $('#childs_num').on('change keyup', function () {
                var childs_num = $(this).val();
                if (childs_num != '' && childs_num != 0) {
                    $('#childs_num_span').html(childs_num);
                    handlingFormForTravellersInfo(false, true, false, childs_num);
                } else {
                    $('#childs_num_span').html(0);
                    $('#traveller-info-box-childs').hide();
                }
                calculatePriceOfChildsAndInfants('childs');
            });
            $('#infant_num').on('change keyup', function () {
                var infant_num = $(this).val();
                if (infant_num != '' && infant_num != 0) {
                    $('#infant_num_span').html(infant_num);
                    handlingFormForTravellersInfo(false, false, true, infant_num);
                } else {
                    $('#infant_num_span').html(0);
                    $('#traveller-info-box-infant').hide();
                }
                calculatePriceOfChildsAndInfants('infants');
            });

            $("input[id^='extra_services_for_cards']").on('change', function () {
                var html = '';
                //alert($("input[id^='extra_services_for_cards']:checked").length);
                if ($("input[id^='extra_services_for_cards']:checked").length > 0) {
                    $("input[id^='extra_services_for_cards']:checked").each(function () {
                        var service_title = $(this).data('service-title');
                        var service_price = $(this).data('service-price');
                        //var service_id = $(this).attr('id');
                        html += '<div class="col-md-12 pull-left">' +
                                '<h6 class="pull-left"> <span class="booktit">  ' + lang.title + ': </span></h6>' +
                                '<h6 class="pull-left"> ' + service_title + '</h6>' +
                                '</div>';
                    });
                }

                $('#extra-services-cards-box-left-bar').html(html);
            });
            $(document).on('change keyup', "input[id^='extra_service_for_person_num']", function () {
                var html = '';
                $("input[id^='extra_service_for_person']").each(function () {
                    //alert('here');
                    var extra_service_for_person_num = $(this).val();
                    var extra_service_for_person_id = $(this).attr('id');
                    if (extra_service_for_person_num > 0) {
                        var service_title = $(this).data('service-title');
                        var service_price = $(this).data('service-price');
                        html += '<div class="col-md-12 pull-left ' + extra_service_for_person_id + '">' +
                                '<h6 class="pull-left"><span class="booktit"> ' + lang.title + ':</span></h6>' +
                                '<h6 class="pull-left">' + service_title + '</h6>' +
                                '</div>' +
                                '<div class="col-md-12 pull-left ' + extra_service_for_person_id + '">' +
                                '<h6 class="pull-left"><span class="booktit"> ' + lang.number_of_persons + ':</span></h6>' +
                                '<h6 class="pull-left">' + extra_service_for_person_num + '</h6>' +
                                '</div>';
                    } else {
                        $('.' + extra_service_for_person_id).hide();
                    }
                });
                $('#extra-services-persons-box-left-bar').html(html);

            });

        }
        var handleAddRemoveMoreExtraServicesPersonRow = function () {
            var programs_extra_service_person_count = $('#programs_extra_service_person_count').val();
            var program_id = $('#program_id').val();
            var currency_sign = $('#currency_sign').val();

            $('#add-more-extra-services-person').on('click', function () {
                var adult_num = $('#adult_num').val();
                var row_extra_services_person_length = $('.row-extra-services-person').length;
                //alert(row_extra_services_person_length);
                if (row_extra_services_person_length < programs_extra_service_person_count) {
                    var action = config.base_url + 'programs/getProgramsFlightExtraServicesPerson';
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
                                        '<div class="col-xs-12 col-sm-5">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2"> ' + lang.title + '</div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<select name="extra_service_for_person_ids[]" id="extra_service_for_person_' + count + '" class="form-control amr color-3" data-placeholder="">';



                                html += ' <option value="' + data.data[0].extra_service_id + ' "    class="option_' + data.data[0].extra_service_id + '">' + data.data[0][title] + ' : <span class="price"> ' + data.data[0].price + ' </span> ' + currency_sign + ' </option>';
                                html += '</select>' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-5">' +
                                        '<div class="form-group form-block type-2 clearfix">' +
                                        '<div class="control-label form-label color-dark-2"> ' + lang.number_of_persons + '</div>' +
                                        '<div class="input-style-1 b-50 brd-0 type-2 color-3">' +
                                        '<input class="form-control" min="1" type="number" max="' + adult_num + '" id="extra_service_for_person_num_' + count + '" data-service-title="' + data.data[0][title] + '" data-service-price="' + data.data[0].price + '" name="extra_service_for_person_num[' + data.data[0].extra_service_id + ']">' +
                                        '</div>' +
                                        '<div class="help-block"></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-2" style="padding-top:35px;">' +
                                        '<a class="btn btn-danger" id="remove-more-extra-services-person" data-left-bar-div="extra_service_for_person_num_' + count + '">x</a>' +
                                        '</div>' +
                                        '</div>';

                                $('#extra-services-person-box').append(html);
                                $("input[name=' extra_service_for_person_num['" + countForName + "'] ']").rules("add", {
                                    max: $('#adult_num').val(),
                                    messages: {
                                        max: lang.max_adults_validate,
                                    }
                                });
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
                if (count > 1 && countForName > 2) {
                    count--;
                    countForName--;
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
//            $('#form-client').validate({
//                errorElement: 'span', //default input error message container
//                errorClass: 'help-block help-block-error', // default input error message class
//                focusInvalid: false, // do not focus the last invalid input
//
//                rules: {
//                    username: {
//                        required: true
//                    },
//                    phone: {
//                        required: true
//                    },
//                    email: {
//                        required: true
//                    },
//                    address: {
//                        required: true
//                    },
//                    birthdate: {
//                        required: true,
//                        checkAge: true
//                    },
//                },
//                messages: lang.form_client,
//                highlight: function (element) {
//                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
//                },
//                unhighlight: function (element) {
//                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
//                    $(element).closest('.form-group').find('.help-block').html('');
//                },
//                errorPlacement: function (error, element) {
//                    $(element).closest('.form-group').find('.help-block').html($(error).html());
//                }
//            });
            $('#form-travellersnum').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                    adult_num: {
                        required: true,
                        min: 1
                    }
                },
                messages: lang.form_travellers_num,
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
            $('#form-services').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                },
                messages: lang.form_travellers,
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
            $('#form-travellersinfo').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input

                rules: {
                },
                messages: lang.form_travellers_info,
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
                    if (form_type == 'form-travellersnum') {

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

                    /*end*/
                    if (end) {
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
                title = 'بيانات البالغين';
                div_content_id = 'traveller-info-box-adult';
                travellers_names_name = 'travellers_names_adult';
                travellers_gender_name = 'travellers_gender_adult';
                travellers_names_id = 'travellers_names_adult';
                birthdate_name = 'birthdate_adult';
                birthdate_id = 'birthdate_adult';
                birthdate_type = 'birthdate_adult';
            }
            if (child_num && !adult_num && !infant_num) {
                title = 'بيانات الأطفال';
                div_content_id = 'traveller-info-box-childs';
                travellers_names_name = 'travellers_names_childs';
                travellers_gender_name = 'travellers_gender_childs';
                travellers_names_id = 'travellers_names_childs';
                birthdate_name = 'birthdate_childs';
                birthdate_id = 'birthdate_childs';
                birthdate_type = 'birthdate_childs';
            }
            if (infant_num && !adult_num && !child_num) {
                title = 'بيانات الرضع';
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
        var printing = function () {
            $('.print-btn').on('click', function () {
                var action = config.base_url + '/programs/print_reservation';
                $.ajax({
                    url: action,
                    data: {
                        reservation_id: $('#print_reservation_id').val(),
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