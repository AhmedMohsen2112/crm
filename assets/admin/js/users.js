    var Users_grid;
    var Users = function () {
        var init = function () {
            //alert('heree');
            $.extend(lang, new_lang);
            //console.log(lang);
            handleRecords();
            handleSubmit();
            handlePasswordActions();

        };
        var handlePasswordActions = function (string_length) {
            $('#show-password').click(function () {
                if ($('#password').val() != '') {
                    $("#password").attr("type", "text");

                } else {
                    $("#password").attr("type", "password");

                }
            });
            $('#random-password').click(function () {
                $('[id^="password"]').closest('.form-group').removeClass('has-error').addClass('has-success');
                $('[id^="password"]').closest('.form-group').find('.help-block').html('').css('opacity', 0);
                $('[id^="password"]').val(randomPassword(8));
            });
        }
        var randomPassword = function (string_length) {
            var chars = "0123456789!@#$%^&*abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXTZ!@#$%^&*";
            var myrnd = [], pos;
            while (string_length--) {
                pos = Math.floor(Math.random() * chars.length);
                myrnd += chars.substr(pos, 1);
            }
            return myrnd;
        }
        var handleRecords = function () {

            Users_grid = $('.dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/users/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "username"},
                    {"data": "group_name"},
                    {"data": "active"},
                    {"data": "options", orderable: false}
                ],
                "order": [
                    [1, "desc"]
                ]

            });
        }
        var handleSubmit = function () {

            $('#addEditUsersForm').validate({
                rules: {
                    username: {
                        required: true

                    },
                    groups_id: {
                        required: true

                    },
                    companies_id: {
                        required: true,
                    },
                    address: {
                        required: true,
                    },
                    phone: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
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
            $('#addEditUsers .submit-form').click(function () {
                if ($('#addEditUsersForm').validate().form()) {
                    $('#addEditUsersForm').submit();
                }
                return false;
            });
            $('#addEditUsersForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditUsersForm').validate().form()) {
                        $('#addEditUsersForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditUsersForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/users/add';
                if (id != 0) {
                    action = config.admin_url + '/users/edit';
                }
                var formData = new FormData($(this)[0]);


                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        //console.log(data);

                        if (data.type == 'success')
                        {
                            toastr.options = {
                                "debug": false,
                                "positionClass": "toast-bottom-left",
                                "onclick": null,
                                "fadeIn": 300,
                                "fadeOut": 1000,
                                "timeOut": 5000,
                                "extendedTimeOut": 1000,
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                            };
                            toastr.success(data.message, 'رسالة');
                            Users_grid.api().ajax.reload();

                            if (id != 0) {
                                $('#addEditUsers').modal('hide');
                            } else {
                                Users.empty();
                            }

                        } else {
                            console.log(data)
                            if (typeof data.errors === 'object') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error');
                                    $('#' + i).parent().find(".help-block").html(data.errors[i]).css('opacity', 1)
                                }
                            } else {
                                //alert('here');
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



        return{
            init: function () {
                init();
            },
            edit: function (t) {



                My.editForm({
                    element: t,
                    url: config.admin_url + '/users/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Users.empty();
                        My.setModalTitle('#addEditUsers', lang.edit_user);

                        for (i in data.message)
                        {
                            if (i == 'password') {
                                continue;
                            }

                            $('#' + i).val(data.message[i]);
                        }
                        $('#addEditUsers').modal('show');
                    }
                });

            },
            delete: function (t) {
                //$(document).find(t).confirmation('show');


                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/users/delete',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        $.alert(data.message);
                        Users_grid.api().ajax.reload();


                    }
                });
            },
            add: function () {
                Users.empty();
                My.setModalTitle('#addEditUsers', lang.add_user);
                $('#addEditUsers').modal('show');
            },
            empty: function () {
                $('#id').val(0);
                $('#active').find('option').eq(0).prop('selected', true);
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                $('.help-block').html('');
                My.emptyForm();
            },
        };
    }();
    $(document).ready(function () {
        Users.init();
    });