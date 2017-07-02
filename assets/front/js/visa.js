    var rules_ok = false;
    var is_logged = false;
    var Visa = function () {

        var init = function () {
            $.extend(lang, new_lang)
            handleChnageCountry();
            handleShowDocuments();
            handleSubmit();
            handle_change_rules_ok();

        }
        var handle_change_rules_ok = function () {
//            $('#visa_rules').on('scroll', function () {
//                var container_height = $(this).innerHeight();//146
//                var container_scroll_height = $(this)[0].scrollHeight; //256
//                var container_scroll_top = $(this).scrollTop(); //58
//                if (container_scroll_top == container_scroll_height - container_height) {
//                    $('#visaApplicationForm .submit-form').prop('disabled', false);
//                }
//            });
            $('#visa_rules_ok').on('change', function () {
                if ($(this).is(':checked')) {
                    $(this)
                            .closest('.form-group').removeClass('has-error').removeClass("has-info");
                } else {
                    $(this)
                            .closest('.form-group').addClass('has-error').removeClass("has-info");
                }
            });
        }
        var handleSubmit = function () {

            $('#visaApplicationForm').validate({
                rules: {
                    name: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    address: {
                        required: true,
                    },
                    phone_1: {
                        required: true,
                        number: true,
                    },
                    mobile_1: {
                        required: true,
                        number: true,
                    },
                    places_id: {
                        required: true,
                    },
                    visa_types: {
                        required: true,
                    },
                    visa_periods: {
                        required: true

                    },
                    visa_jobs: {
                        required: true

                    },
                },
                messages: lang.messages,
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
            $('#visaApplicationForm .submit-form').click(function () {
                if ($('#visaApplicationForm').validate().form()) {
                    $('#visaApplicationForm').submit();

                }
                return false;
            });




            $('#visaApplicationForm').submit(function () {
                checkLogin();
                if (!is_logged) {
                    return false;
                }
                var id = $('#id').val();
                var action = config.base_url + '/visa/add';
                var formData = new FormData($(this)[0]);
                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data.type == 'success')
                        {

                            if (data.data.url != false) {
                                $('#visaApplicationForm .submit-form').val(lang.waiting + '.....');
                                $('#visaApplicationForm .submit-form').prop('disabled', true);
                                setTimeout(function () {
                                    window.location.href = data.data.url;
                                }, 2000);
                            } else {
                                $('#visaApplicationForm .submit-form').val(lang.waiting + '.....');
                                $('#visaApplicationForm .submit-form').prop('disabled', true);
                                setTimeout(function () {
                                    $('#visaApplicationForm .submit-form').val(lang.process_done);
                                }, 2000);

                            }



                        } else {
                            //console.log(data)

                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    if (i == 'visa_rules_ok') {
                                        $('[name="' + i + '"]')
                                                .closest('.form-group').addClass('has-error').removeClass("has-info");
                                    } else {
                                        $('[name="' + i + '"]')
                                                .closest('.form-group').addClass('has-error').removeClass("has-info");
                                        $('#' + i).closest('.form-group').find(".help-block").html(data.errors[i])
                                    }
                                }
                            } else {
                                $.confirm({
                                    title: lang.error,
                                    content: data.message,
                                    type: 'red',
                                    typeAnimated: true,
                                    buttons: {
                                        tryAgain: {
                                            text: lang.try_again,
                                            btnClass: 'btn-red',
                                            action: function () {
                                            }
                                        }
                                    }
                                });
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
        var handleShowDocuments = function () {
            var data = {};
            $(document).on('change', 'select[name^="visa"]', function () {
                $('select[name^="visa"]').each(function () {
                    if ($(this).val !== null) {
                        var id = $(this).attr('id');
                        var value = $(this).val();
                        data[id] = value;
                    }
                });

                getDocuments(data);
            });

        }
        var getDocuments = function (data) {
            data['places_id'] = $('#places_id').val();
            $.ajax({
                url: config.base_url + "visa/getVisaDocuments",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (data)
                {
                    console.log(data);

                    if (data.type == 'success') {
                        $('#visa_id').val(data.data.visa_details.id);
                        $('#visa_price').html(data.data.visa_details.net_price + ' ' + data.data.visa_details.currency_sign);
                        /*payment*/
                        $('#vpc_Amount').val(data.data.visa_details.net_price);
                        var payment_config_json = $('#payment_config').val();
                        var payment_config = JSON.parse(payment_config_json);
                        var payment_config_of_currency = payment_config[data.data.visa_details.currency_sign];
                        $('#vpc_Merchant').val(payment_config_of_currency.merchant_id);
                        $('#vpc_Currency').val(data.data.visa_details.currency_sign);
                        $('#vpc_AccessCode').val(payment_config_of_currency.access_code);
                        /*end*/
                        var html = '';
                        var title = 'title_' + lang.lang_code;
                        var count = 1;
                        for (var x = 0; x < data.data.visa_documents.length; x++) {
                            var input_file_name = 'document_' + count;
                            html += '<div class="col-xs-12 col-sm-12 col-md-6">' +
                                    '<div class="form-group">' +
                                    '<label>' + data.data.visa_documents[x][title] + '</label>' +
                                    '<input type="file" class="form-control" id="' + input_file_name + '" name="' + input_file_name + '">' +
                                    '<div class="help-block"></div>' +
                                    '</div>' +
                                    '</div>';
                            count++;


                        }
                        $('#visa_documents').html(html);

                    } else {
//                        $.confirm({
//                            title: lang.error,
//                            content: data.message,
//                            type: 'red',
//                            typeAnimated: true,
//                            buttons: {
//                                tryAgain: {
//                                    text: lang.try_again,
//                                    btnClass: 'btn-red',
//                                    action: function () {
//                                    }
//                                }
//                            }
//                        });
                    }


                },
                error: function (xhr, textStatus, errorThrown) {
                    //$('.loading').addClass('hide');
                    bootbox.dialog({
                        message: xhr.responseText,
                        title: 'TEST',
                        buttons: {
                            danger: {
                                label: 'close',
                                className: "red"
                            }
                        }
                    });
                },
            });
        }
        var checkLogin = function () {

            var action = config.base_url + '/home/checkLoginForAjax';
            $.ajax({
                url: action,
                async: false,
                data: {},
                success: function (data) {
                    console.log(data);
                    //return false;
                    if (data.type == 'success') {


                        is_logged = true;
                    } else {
                        $('#login-modal').modal('show');
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
        var handleChnageCountry = function () {
            $('#places_id').on('change', function () {
                var place_id = $(this).val();
                $.ajax({
                    url: config.base_url + "visa/getVisaTypesPeriodsJobs",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        place_id: place_id,
                    },
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {
                            for (var i in data.data) {
                                var html = '<option selected disabled>' + lang.choose + '</option>';
                                var title;
                                if (i == 'visa_periods') {
                                    title = 'period';
                                } else {
                                    title = 'title_' + lang.lang_code;
                                }
                                for (var x = 0; x < data.data[i].length; x++) {
                                    html += '<option value="' + data.data[i][x]['id'] + '">' + data.data[i][x][title] + '</option>';
                                }
                                $('#' + i).html(html);
                            }
                        } else {
//                            $.confirm({
//                                title: lang.error,
//                                content: data.message,
//                                type: 'red',
//                                typeAnimated: true,
//                                buttons: {
//                                    tryAgain: {
//                                        text: lang.try_again,
//                                        btnClass: 'btn-red',
//                                        action: function () {
//                                        }
//                                    }
//                                }
//                            });
                        }


                    },
                    error: function (xhr, textStatus, errorThrown) {
                        //$('.loading').addClass('hide');
                        bootbox.dialog({
                            message: xhr.responseText,
                            title: 'TEST',
                            buttons: {
                                danger: {
                                    label: 'close',
                                    className: "red"
                                }
                            }
                        });
                    },
                });
            });
        }

        return {
            init: function () {
                init();
            },
            empty: function () {
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                $('.help-block').html('');

                App.emptyForm();
            },
        }

    }();

    jQuery(document).ready(function () {
        Visa.init();
    });


