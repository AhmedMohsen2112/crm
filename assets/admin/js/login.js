
    var errors = [];
    var Login = function () {

        var init = function () {

            handle_login();


        }
        var handle_login = function () {
            $("#login-form").validate({
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    username: {
                        required: lang.required
                    },
                    password: {
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
            $('#login-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#login-form').validate().form()) {
                        $('#login-form').submit();
                    }
                    return false;
                }
            });
            $('.submit-form').click(function () {
                //alert('33333');
                if ($('#login-form').validate().form()) {
                    $('#login-form').submit();
                }
                return false;
            });
            $('#login-form').submit(function () {
                $.ajax({
                    url: config.admin_url + "/login/check",
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        username: $('#username').val(),
                        password: $('#password').val(),
                        ajax: true
                    },
                    success: function (data)
                    {
                        console.log(data);
                        //return false;
                        if (data.type == 'success') {
                            window.location.href = config.admin_url;
                        } else {
                            if (typeof data.errors === 'undefined') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error').removeClass("has-info");
                                    $('#' + i).parent().find(".help-block").html(data.errors[i])
                                }
                            }
                            if (typeof data.message !== 'undefined') {
                                $('#alert-message').html(data.message).fadeIn(400).delay(3000).fadeOut(400);
                            }
                        }


                    },
                    error: function (xhr, textStatus, errorThrown) {
                        alert(xhr.responseText);
                        //$('.loading').addClass('hide');
//                        bootbox.dialog({
//                            message: xhr.responseText,
//                            title: 'sssss',
//                            buttons: {
//                                danger: {
//                                    label: 'esss',
//                                    className: "red"
//                                }
//                            }
//                        });
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
        Login.init();
    });


