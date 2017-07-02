
    var Settings = function () {

        var init = function () {
            $.extend(lang, new_lang)
            handleSubmit();
        };

        var handleSubmit = function () {

            $('#editSettingsForm').validate({
                rules: {
                    site_title_ar: {
                        required: true

                    },
                    site_title_en: {
                        required: true

                    },
                    site_phone: {
                        required: true

                    },
                    site_email: {
                        required: true

                    },
                    site_address_ar: {
                        required: true

                    },
                    site_address_en: {
                        required: true

                    },
                    site_desc_ar: {
                        required: true

                    },
                    site_desc_en: {
                        required: true

                    },
                    site_keywords_ar: {
                        required: true

                    },
                    site_keywords_en: {
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
            $('#editSettings .submit-form').click(function () {
                if ($('#editSettingsForm').validate().form()) {
                    $('#editSettingsForm').submit();
                }
                return false;
            });
            $('#editSettingsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#editSettingsForm').validate().form()) {
                        $('#editSettingsForm').submit();
                    }
                    return false;
                }
            });



            $('#editSettingsForm').submit(function () {
                var formData = new FormData($(this)[0]);
                var action = config.admin_url + '/settings/edit';

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
        Settings.init();
    });
