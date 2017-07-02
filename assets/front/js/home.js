
    var today = new Date();
    var inputs = {};
    var Home = function () {
        var p_search_form_messages = {
            p_city: 'ادخل المدينة',
            p_hotel: 'ادخل الفندق',
            p_arrive_date: 'ادخل تاريخ الوصول',
            p_departing_date: 'ادخل تاريخ المغادرة',
        };
        var h_search_form_messages = {
            country_hotel: 'ادخل مدينة او فندق محدد',
            h_arrive_date: 'ادخل تاريخ الوصول',
            h_departing_date: 'ادخل تاريخ المغادرة',
        };

        var init = function () {

//            handleSelectJs();
//            handleDatesJs();
//            handle_programs_search();
//            handle_hotels_search();
//            handleCountryHotelAutoComplete();
//            getHotelsInCountry();
            handleSubscribe();
            handleChangeMainCategories();
            handleSearch();
            handlePlaces();

        }
        var handlePlaces = function () {
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyDsshcWfauVkoW5bbTJHpMQG9aiOUnuygA",
                async: false,
                success: function (data) {
                    console.log(data);

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr.responseText);

                },
                dataType: "json",
                type: "POST"
            });
        }
        var handleChangeMainCategories = function () {
            $("#main_categories_id").change(function () {
                var main_categories_id = $(this).val();
                //alert(country_id);
                $.ajax({
                    type: "post",
                    url: config.site_url + '/ajax/getSubCategories',
                    data: {main_categories_id: main_categories_id},
                    success: function (data) {
                        //console.log(data)
                        $("#sub_categories_id").html(data);
                    }
                });
            });

        }
        var handleSubscribe = function () {
            $('#subscribeForm').validate({
                rules: {
                    email: {
                        required: true,
                        email: true,
                    }
                },
                messages: {
                    email: {
                        required: lang.required,
                        email: lang.email_not_valid
                    }
                },
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
            $('#subscribeForm .submit-form').on('click', function () {
                if ($('#subscribeForm').validate().form()) {
                    $('#subscribeForm').submit();
                }
                return false;
            });




            $('#subscribeForm').submit(function () {

                var action = config.site_url + '/home/subscribe';
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

                            $('.alert_custom').css({
                                'background-color': '#00a2ff'
                            });
                            $('#alert_message').html(data.message);
                            $('.alert_custom').fadeIn(500).delay(2000).fadeOut(500);

                        } else {
                            console.log(data)
                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error').removeClass("has-info");
                                    $('#' + i).parent().find(".help-block").html(data.errors[i])
                                }
                            } else {
                                $('.alert_custom').css({
                                    'background-color': '#c04848'
                                });
                                $('#alert_message').html(data.message);
                                $('.alert_custom').fadeIn(500).delay(2000).fadeOut(500);
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
        var validationForSearch = function (form) {
            var inputs_not_null_count = 0;
            for (var i = 0; i < form.length; i++)
            {
                var item = form[i];
                var name = item.name;
                var value = item.value;
                if (value != 0) {
                    inputs[name] = value;
                    inputs_not_null_count++;
                }
            }
//            if (inputs_not_null_count == 0) {
//                return {type: "error", message: 'يجب ادخال قيمة حقل واحد على الأقل'};
//            } else {
//
//                return {type: "success", message: 'success'};
//            }

        }
        var getObjectLength = function (obj) {
            var count = 0;
            var i;

            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
        }
        var validate = function (form, cancel, messages) {
            var errors = [];
            for (var i = 0; i < form.length; i++)
            {
                var item = form[i];
                console.log();
                if (cancel && cancel.indexOf(item.name) != -1) {
                    continue;
                }
                var error = validate_one(item, 'req', messages);
                if (!$.isEmptyObject(error)) {
                    //console.log(error);
                    errors.push(error);
                }

            }
            if (errors.length > 0) {
                return {type: "error", errors: errors};
            } else {
                return {type: "success"};

            }
        }
        var validate_one = function (item, rule, messages) {
            var error = {};
            if (rule)
            {
                var name = item.name;
                var value = item.value;

                switch (rule)
                {
                    case "req":
                        if (value.length == 0 || value == 'اختر')
                        {
                            error.name = name;
                            error.error_message = messages[name];

                        } else {
//                            for (var i = 0; i < inputs_values_for_url.length; i++) {
//                                var index = inputs_values_for_url.indexOf(value)
//                                if (index > -1) {
//                                    inputs_values_for_url.splice(index, 1);
//                                }
//                            }

                            inputs[name] = value;
                        }
                        break;

                }

            }
            return error;
        }
        var handle_programs_search = function () {
            jQuery.validator.addMethod("notEqual", function (value) {
                var p_from = $('#p_from').val();
                var p_to = $('#p_to').val();

                if (p_from == p_to) {
                    return false;
                } else {
                    return true;
                }
            }, "مدينة المغادرة لا يجب ان تكون نفس مدينة الذهاب");
            $('#search-form').validate({
                rules: {
                },
                messages: {
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
            $('#p-search-form .search-btn').click(function () {
                if ($('#p-search-form').validate().form()) {
                    $('#p-search-form').submit();
                }
                return false;
            });
            $('#p-search-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#p-search-form').validate().form()) {
                        $('#p-search-form').submit();
                    }
                    return false;
                }
            });
            $('#p-search-form').submit(function () {
                var search_type = $('#p-search-form .search-btn').data('search-type');
                $.ajax({
                    url: config.base_url + "search/save_query",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        query: $.param($('#p-search-form').serializeArray())
                    },
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {
                            var query_id = data.message;
                            console.log($.param(inputs));
                            console.log(getObjectLength(inputs));
                            window.location.href = config.base_url + 'search/' + search_type + '/' + query_id;
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

                return false;

            });

        }
        var handleSearch = function () {
            $('#search-form').validate({
                rules: {
                    main_categories_id: {
                        required: true
                    }
                },
                messages: {
                    main_categories_id: {
                        required: lang.required
                    }
                },
                highlight: function (element) { // hightlight error inputs
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
            $('#search-form .search-btn').unbind('click').click(function () {
                if ($('#search-form').validate().form()) {
                    $('#search-form').submit();
                }
                return false;
            });
            $('#search-form').submit(function () {
                validationForSearch($('#search-form').serializeArray());
                //console.log(inputs);
                //return false;
                var inputs_url = '';
                var count = 0;
                var title_in_url = '';
                for (var i in inputs) {
                    var value = inputs[i];
                    if (i == 'main_categories_id') {
                        if (value != 0) {
                            var title = $('#' + i).find('option:selected').data('title');
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                    }
                    if (i == 'sub_categories_id') {
                        if (value != 0) {
                            var title = $('#' + i).find('option:selected').data('title');
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                    }
                    if (i == 'sort_value') {
                        if (value != 0) {
                            var title = $('#' + i).find('option:selected').html();
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                    }
                    if (i == 'period') {
                        if (value != 0) {
                            var title = $('#' + i).find('option:selected').html();
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                    }
                    if (i == 'going_from_id') {
                        if (value != 0) {
                            var title = $('#' + i).find('option:selected').data('title');
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                    }
                    count++;
                    inputs_url += title_in_url;
                    if (count < getObjectLength(inputs)) {
                        inputs_url += '/';
                    }
                }
                $.ajax({
                    url: config.site_url + "search/save_query",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        query: $.param(inputs)
                    },
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {
                            var query_id = data.message;
                            window.location.href = config.site_url + 'search/' + 'q-' + query_id;
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

                return false;



            });

        }
        var handleSearch2 = function () {

            $('#search-btn').unbind('click').on('click', function () {
                validate_success = validationForSearch($('#search-form').serializeArray());

                if (validate_success.type == 'success') {
                    var inputs_url = '';
                    var count = 0;
                    var title_in_url = '';
                    for (var i in inputs) {
                        var value = inputs[i];
                        if (i == 'main_categories_id') {
                            var title = $('#' + i).find('option:selected').data('title');
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                        if (i == 'sub_categories_id') {
                            var title = $('#' + i).find('option:selected').data('title');
                            title_in_url = title.trim().replace(/ /g, "-");
                        }
                        if (i == 'price') {
                            title_in_url = value;
                        }
                        if (i == 'period') {
                            if (value != 0) {
                                var title = $('#' + i).find('option:selected').html();
                                title_in_url = title.trim().replace(/ /g, "-");
                            }
                        }
                        if (i == 'from_to') {
                            if (value != 0) {
                                var title = $('#' + i).find('option:selected').data('title');
                                title_in_url = title.trim().replace(/ /g, "-");
                            }
                        }
                        count++;
                        inputs_url += title_in_url;
                        if (count < getObjectLength(inputs)) {
                            inputs_url += '/';
                        }
                    }
//                    console.log(inputs_url);
//                    return false;
                    $.ajax({
                        url: config.site_url + "search/save_query",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            query: $.param(inputs)
                        },
                        success: function (data)
                        {
                            console.log(data);
                            if (data.type == 'success') {
                                var query_id = data.message;
                                window.location.href = config.site_url + 'search/' + inputs_url + '/' + query_id;
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

                    return false;

                } else {
                    $('.alert_custom').css({
                        'background-color': '#c04848'
                    });
                    $('#alert_message').html(validate_success.message);
                    $('.alert_custom').fadeIn(500).delay(2000).fadeOut(500);
                    return false;
                }


            });

        }
        var handle_programs_search3 = function () {

            $('.search-btn').on('click', function () {
                var search_type = $(this).data('search-type');
                if (search_type == 'programs') {
                    var validate_success = validate($('#p-search-form').serializeArray(), false, p_search_form_messages);
                } else {
                    var validate_success = validate($('#h-search-form').serializeArray(), false);
                    return false;
                }

                if (validate_success.type == 'success') {

                    var inputs_url = '';
                    var count = 0;
                    for (var i in inputs) {
                        var value = inputs[i];
                        if (i == 'p_arrive_date' || i == 'p_departing_date') {
                            value = value.replace(/-/g, "_");
                        }
                        if (i == 'p_city' || i == 'p_hotel') {
                            value = value.replace(/ /g, "_");
                        }
                        inputs_url += value;
                        count++;
                        if (count < getObjectLength(inputs)) {
                            inputs_url += '-';
                        }
                    }
                    $.ajax({
                        url: config.base_url + "search/save_query",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            query: $.param(inputs)
                        },
                        success: function (data)
                        {
                            console.log(data);
                            if (data.type == 'success') {
                                var query_id = data.message;
                                console.log($.param(inputs));
                                console.log(getObjectLength(inputs));
                                window.location.href = config.base_url + 'search/' + search_type + '/' + inputs_url + '-' + query_id;
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

                    return false;

                } else {
                    var html = '<ul>';
                    for (var x = 0; x < validate_success.errors.length; x++) {
                        if (validate_success.errors[x].name == 'p_city' || validate_success.errors[x].name == 'p_hotel') {
                            $('#' + validate_success.errors[x].name).closest('.form-group').find('.select2-container--default .select2-selection--single').css({'border': '1px solid #de7c7c'});
                        } else {
                            $('#' + validate_success.errors[x].name).css({'border': '1px solid #de7c7c'});
                        }

                        html += '<li>' + validate_success.errors[x].error_message + '</li>';
                    }
                    html += '</ul>';
                    $('.alert-msg').html(html);
                    $('.alert_custom').fadeIn(400).delay(7000).fadeOut(400);
                    return false;
                }


            });

        }
        var handle_programs_search2 = function () {

            $('.p-search-btn').on('click', function () {
                var search_type = $(this).data('search-type');
                var validate_success = validate($('#p-search-form').serializeArray(), false);
                if (validate_success.type == 'success') {

                    var inputs_url = '';
                    var count = 0;
                    for (var i in inputs) {
                        var value = inputs[i];
                        if (i == 'p_arrive_date' || i == 'p_departing_date') {
                            value = value.replace(/-/g, "_");
                        }
                        if (i == 'p_city' || i == 'p_hotel') {
                            value = value.replace(/ /g, "_");
                        }
                        inputs_url += value;
                        count++;
                        if (count < getObjectLength(inputs)) {
                            inputs_url += '-';
                        }
                    }
                    $.ajax({
                        url: config.base_url + "search/save_query",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            query: $.param(inputs)
                        },
                        success: function (data)
                        {
                            console.log(data);
                            if (data.type == 'success') {
                                var query_id = data.message;
                                console.log($.param(inputs));
                                console.log(getObjectLength(inputs));
                                window.location.href = config.base_url + 'search/' + search_type + '/' + inputs_url + '-' + query_id;
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

                    return false;

                } else {
                    var html = '<ul>';
                    for (var x = 0; x < validate_success.errors.length; x++) {
                        if (validate_success.errors[x].name == 'p_city' || validate_success.errors[x].name == 'p_hotel') {
                            $('#' + validate_success.errors[x].name).closest('.form-group').find('.select2-container--default .select2-selection--single').css({'border': '1px solid #de7c7c'});
                        } else {
                            $('#' + validate_success.errors[x].name).css({'border': '1px solid #de7c7c'});
                        }

                        html += '<li>' + validate_success.errors[x].error_message + '</li>';
                    }
                    html += '</ul>';
                    $('.alert-msg').html(html);
                    $('.alert_custom').fadeIn(400).delay(7000).fadeOut(400);
                    return false;
                }


            });

        }
        var handle_hotels_search = function () {
            jQuery.validator.addMethod("notEqual", function (value) {
                var h_arrive_date = $('#h_arrive_date').val();
                var h_departing_date = $('#h_departing_date').val();

                if (h_arrive_date == h_departing_date) {
                    return false;
                } else {
                    return true;
                }
            }, "تاريخ الوصول لا يجب ان تكون نفس تاريخ المغادرة ");
            $('#h-search-form').validate({
                rules: {
                    search: {
                        required: true,
                    },
                    h_arrive_date: {
                        required: true,
                        notEqual: true,
                    },
                    h_departing_date: {
                        required: true
                    }
                },
                messages: {
                    search: {
                        required: 'ادخل مدينة او فندق',
                    },
                    h_arrive_date: {
                        required: 'ادخل تاريخ المغادرة'
                    },
                    h_departing_date: {
                        required: 'ادخل تاريخ العودة'
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
            $('#h-search-form .search-btn').click(function () {
                //alert($('#search').data('id'));
                //return false;
                if ($('#h-search-form').validate().form()) {
                    $('#h-search-form').submit();
                }
                return false;
            });
            $('#h-search-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#h-search-form').validate().form()) {
                        $('#h-search-form').submit();
                    }
                    return false;
                }
            });
            $('#h-search-form').submit(function () {
                var search_type = $('#h-search-form .search-btn').data('search-type');
                var data = $('#h-search-form').serializeArray();
                data.push({name: 'hotel_id', value: $('#search').data('id')});
                //return false;
                $.ajax({
                    url: config.base_url + "search/save_query",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        query: $.param(data)
                    },
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {
                            var query_id = data.message;
                            window.location.href = config.base_url + 'search/' + search_type + '/' + query_id;
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

                return false;



            });

        }
        var handle_hotels_search3 = function () {

            $('.h-search-btn').on('click', function () {
                var search_type = $(this).data('search-type');
                var validate_success = validationForprograms($('#h-search-form').serializeArray());

                if (validate_success.type == 'success') {

                    var inputs_url = '';
                    var count = 0;
                    for (var i in inputs) {
                        var value = inputs[i];
                        if (i == 'h_arrive_date' || i == 'h_departing_date') {
                            value = value.replace(/-/g, "_");
                        }
                        if (i == 'country_hotel') {
                            value = value.replace(/ /g, "_");
                        }
                        inputs_url += value;
                        count++;
                        if (count < getObjectLength(inputs)) {
                            inputs_url += '-';
                        }
                    }
                    $.ajax({
                        url: config.base_url + "search/save_query",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            query: $.param(inputs)
                        },
                        success: function (data)
                        {
                            console.log(data);
                            if (data.type == 'success') {
                                var query_id = data.message;
                                console.log($.param(inputs));
                                console.log(getObjectLength(inputs));
                                window.location.href = config.base_url + 'search/' + search_type + '/' + inputs_url + '-' + query_id;
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

                    return false;

                } else {
                    var html = '<ul>';
                    html += '<li>' + validate_success.message + '</li>';
                    html += '</ul>';
                    $('.alert-msg').html(html);
                    $('.alert_custom').fadeIn(400).delay(7000).fadeOut(400);
                    return false;
                }


            });

        }
        var handle_hotels_search2 = function () {
            $('.h-search-btn').on('click', function () {
                var search_type = $(this).data('search-type');
                var validate_success = validate($('#h-search-form').serializeArray(), false, h_search_form_messages);

                if (validate_success.type == 'success') {

                    var inputs_url = '';
                    var count = 0;
                    for (var i in inputs) {
                        var value = inputs[i];
                        if (i == 'h_arrive_date' || i == 'h_departing_date') {
                            value = value.replace(/-/g, "_");
                        }
                        if (i == 'country_hotel') {
                            value = value.replace(/ /g, "_");
                        }
                        inputs_url += value;
                        count++;
                        if (count < getObjectLength(inputs)) {
                            inputs_url += '-';
                        }
                    }
                    $.ajax({
                        url: config.base_url + "search/save_query",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            query: $.param(inputs)
                        },
                        success: function (data)
                        {
                            console.log(data);
                            if (data.type == 'success') {
                                var query_id = data.message;
                                console.log($.param(inputs));
                                console.log(getObjectLength(inputs));
                                window.location.href = config.base_url + 'search/' + search_type + '/' + inputs_url + '-' + query_id;
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

                    return false;

                } else {
                    var html = '<ul>';
                    for (var x = 0; x < validate_success.errors.length; x++) {
                        if (validate_success.errors[x].name == 'p_city' || validate_success.errors[x].name == 'p_hotel') {
                            $('#' + validate_success.errors[x].name).closest('.form-group').find('.select2-container--default .select2-selection--single').css({'border': '1px solid #de7c7c'});
                        } else {
                            $('#' + validate_success.errors[x].name).css({'border': '1px solid #de7c7c'});
                        }

                        html += '<li>' + validate_success.errors[x].error_message + '</li>';
                    }
                    html += '</ul>';
                    $('.alert-msg').html(html);
                    $('.alert_custom').fadeIn(400).delay(7000).fadeOut(400);
                    return false;
                }


            });

        }

        return {
            init: function () {
                init();
            }
        }

    }();

    jQuery(document).ready(function () {
        Home.init();
    });


