    var Login = function () {

        var init = function () {
            //alert('here');
            handle_login();
            handle_rgister();


        }
        var handle_login = function () {
            $("#login-form").validate({
                rules: {
                    l_email: {
                        required: true
                    },
                    l_password: {
                        required: true
                    }
                },
                messages: {
                    l_email: {
                        required: lang.required
                    },
                    l_password: {
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
            $('#login-form .submit-form').click(function () {
                if ($('#login-form').validate().form()) {
                    $('#login-form').submit();
                }
                return false;
            });
            $('#login-form').submit(function () {
                $.ajax({
                    url: config.base_url + "login/check",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        l_email: $('#l_email').val(),
                        l_password: $('#l_password').val(),
                        ajax: true
                    },
                    success: function (data)
                    {
                        console.log(data);
                        if (data.type == 'success') {
                            window.location.href = data.data.url;

                        } else {

                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error').removeClass("has-info");
                                    $('#' + i).parent().find(".help-block").html(data.errors[i])
                                }
                            } else {
                                $('#login-alert-message').html(data.message).addClass('alert-danger').fadeIn(500).delay(3000).fadeOut(2000);
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
        var handle_rgister = function () {
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
                        required: lang.required
                    },
                    email: {
                        required: lang.required
                    },
                    email_confirmation: {
                        required: lang.required,
                        equalTo: lang.email_not_equal
                    },
                    password: {
                        required: lang.required,
                    },
                    password_confirmation: {
                        required: lang.required,
                        equalTo: lang.password_not_equal

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
            $('#register-form .submit-form').click(function () {
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
                            $('#register-alert-message').html(data.data.message).addClass('alert-success').fadeIn(500).delay(3000).fadeOut(2000);
                            setTimeout(function () {

                            }, 3000);
                        } else {

                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error').removeClass("has-info");
                                    $('#' + i).parent().find(".help-block").html(data.errors[i])
                                }
                            } else {
                                $('#register-alert-message').html(data.message).fadeIn(500).delay(3000).fadeOut(2000);
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
        Login.init();
    });


