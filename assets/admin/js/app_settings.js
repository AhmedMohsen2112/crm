
    var App_settings = function () {

        var init = function () {
            $.extend(lang, new_lang)
            handleSubmit();
        };

        var handleSubmit = function () {

            $('#editAppSettingsForm').validate({
                rules: {
                    phone: {
                        required: true

                    },
                    email: {
                        required: true,
                        email: true

                    },
                    usage_conditions_ar: {
                        required: true

                    },
                    usage_conditions_en: {
                        required: true

                    },
                    about_app_ar: {
                        required: true

                    },
                    about_app_en: {
                        required: true

                    },
                    no_of_free_ads: {
                        required: true

                    },
                },
                messages: lang.messages,
                highlight: function (element) { // hightlight error inputs
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');

                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-group').find('.help-block').html('').css('opacity', 0);

                },
                errorPlacement: function (error, element) {
                    $(element).closest('.form-group').find('.help-block').html($(error).html()).css('opacity', 1);
                }
            });
            $('#editAppSettingsForm .submit-form').click(function () {
                if ($('#editAppSettingsForm').validate().form()) {
                    $('#editAppSettingsForm').submit();
                }
                return false;
            });
            $('#editAppSettingsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#editAppSettingsForm').validate().form()) {
                        $('#editAppSettingsForm').submit();
                    }
                    return false;
                }
            });



            $('#editAppSettingsForm').submit(function () {
                var formData = new FormData($(this)[0]);
                var action = config.admin_url + '/app_settings/edit';

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
                            //console.log(data);
                            for (x in data.message)
                            {
                                if (x == 'site_contacts') {
                                    var site_contacts_json = data.message[x];
                                    var site_contacts = JSON.parse(site_contacts_json);
                                    //console.log(site_contacts);
                                    for (i in site_contacts)
                                    {
                                        $('#site_contacts_' + i).val(site_contacts[i]);

                                    }
                                } else if (x == 'visa_currency_id') {
                                    $('#currency_id').val(data.message[x]);
                                } else {
                                    $('#' + x).val(data.message[x]);
                                }

                            }
                            toastr.options = {
                                "debug": false,
                                "positionClass": "toast-bottom-left",
                                "onclick": null,
                                "fadeIn": 300,
                                "fadeOut": 1000,
                                "timeOut": 5000,
                                "extendedTimeOut": 1000
                            };
                            toastr.success(lang.updated_successfully, 'رسالة');

                        } else {
                            console.log(data)
                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error');
                                    $('#' + i).parent().find(".help-block").html(data.errors[i]).css('opacity', 1)
                                }
                            }
                            if (typeof data.message !== 'undefined') {
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

        return {
            init: function () {
                init();
            }
        };

    }();
    jQuery(document).ready(function () {
        App_settings.init();
    });
