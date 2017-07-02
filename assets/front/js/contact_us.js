
    var Contact_us = function () {

        var init = function () {
            //alert('here');
            $.extend(lang, new_lang)
            handleSubmit();

        };



        var handleSubmit = function () {

            $('#contact_us_form').validate({
                rules: {
                    name: {
                        required: true

                    },
                    subject: {
                        required: true

                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true

                    }
                },
                messages: lang.messages,
                highlight: function (element) { // hightlight error inputs #8fea93
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
            $('#contact_us_form .submit-form').click(function () {
                if ($('#contact_us_form').validate().form()) {
                    $('#contact_us_form').submit();
                }
                return false;
            });
            $('#contact_us_form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#contact_us_form').validate().form()) {
                        $('#contact_us_form').submit();
                    }
                    return false;
                }
            });



            $('#contact_us_form').submit(function () {
                $('#contact_us_form .submit-form').prop('disabled', true);
                $('#contact_us_form .submit-form').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
                var formData = new FormData($(this)[0]);
                var action = config.site_url + 'contact_us/send';

                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {


                    },
                    success: function (data) {
                        console.log(data);

                        if (data.type == 'success')
                        {
                            setTimeout(function () {
                                $('#contact_us_form .submit-form').html(lang.message_sent);
                            }, 1000);

                        } else {
                            console.log(data)

                            for (i in data.errors)
                            {
                                $('[name="' + i + '"]')
                                        .closest('.form-group').addClass('has-error').removeClass("has-info");
                                $('#' + i).parent().find(".help-block").html(data.errors[i])

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
        Contact_us.init();
    });


