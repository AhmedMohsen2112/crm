

    var Register = function () {

        var init = function () {
            //alert('here');
            handle_login();


        }
        var handle_login = function () {
            $("#register-form").validate({
                rules: {
                    fullname: {
                        required: true
                    },
                    email: {
                        required: true
                    },
                    email_confirmation: {
                        required: true,
                        equalTo: "#email"
                    },
                    password: {
                        required: true
                    },
                    password_confirmation: {
                        required: true,
                        equalTo: "#password"
                    },
                },
                messages: {
                    fullname: {
                        required: 'ادخل الاسم بالكامل'
                    },
                    email: {
                        required: 'ادخل البريد الإلكترونى'
                    },
                    email_confirmation: {
                        required: 'ادخل تأكيد البريد الإلكترونى',
                        equalTo: "البريد الإلكترونى غير مطابق الأخر"
                    },
                    password: {
                        required: 'ادخل كلمة السر'
                    },
                    password_confirmation: {
                        required: 'ادخل تأكيد كلمة السر',
                        equalTo: "كلمة السر غير مطابقة الأخرى"

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
            $('.submit-form').click(function () {
                if ($('#register-form').validate().form()) {
                    $('#register-form').submit();
                }
                return false;
            });
            $('#register-form').submit(function () {
                var data = $(this).serializeArray();
                data.push({name: 'ajax', value: true});
                var new_data = $.param(data);
                $.ajax({
                    url: config.base_url + "register/add",
                    type: 'POST',
                    dataType: 'json',
                    data: new_data,
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {

                            $('#success-message').html('تم تسجيلك بنجاح وسوف يتم تحويلك الأن الى صفحة تسجيل الدخول');
                            $('#success-message').fadeIn(1000, function () {
                                setTimeout(function () {
                                    window.location.href = config.base_url + 'login';
                                }, 3000);

                            });


                        } else {

                            if (data.message != undefined) {
                                $('#alert-message').html(data.message).fadeIn(400).delay(4000).fadeOut(1000);
                            } else {
                                for (i in data.errors)
                                {
                                    if (i != '') {
                                        $('[name="' + i + '"]')
                                                .closest('.form-group').addClass('has-error').removeClass("has-info");
                                        $('#' + i).parent().find(".help-block").html(data.errors[i]);
                                    }
                                }
                            }
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

        return {
            init: function () {
                init();
            }
        }

    }();

    jQuery(document).ready(function () {
        Register.init();
    });


