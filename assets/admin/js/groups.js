    var Groups_grid;
    var Groups = function () {
        var init = function () {
            //alert('heree');
            $.extend(lang, new_lang);
            //console.log(lang);
            handleRecords();
            handleSubmit();

        };

        var handleRecords = function () {

            Groups_grid = $('.dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/groups/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "name"},
                    {"data": "active"},
                    {"data": "options", orderable: false}
                ],
                "order": [
                    [1, "desc"]
                ]

            });
        }
        var handleSubmit = function () {

            $('#addEditGroupsForm').validate({
                rules: {
                    name: {
                        required: true

                    }
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
            $('#addEditGroups .submit-form').click(function () {
                if ($('#addEditGroupsForm').validate().form()) {
                    $('#addEditGroupsForm').submit();
                }
                return false;
            });
            $('#addEditGroupsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditGroupsForm').validate().form()) {
                        $('#addEditGroupsForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditGroupsForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/groups/add';
                if (id != 0) {
                    action = config.admin_url + '/groups/edit';
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
                            Groups_grid.api().ajax.reload();

                            if (id != 0) {
                                $('#addEditGroups').modal('hide');
                            } else {
                                Groups.empty();
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
                    url: config.admin_url + '/groups/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);
                        Groups.empty();
                        My.setModalTitle('#addEditGroups', lang.edit_user);

                        $('#id').val(data.message['id']);
                        $('#name').val(data.message['name']);
                        $('#active').val(data.message['active']);
                        var permissions = data.message['permissions'];
                        for (i in permissions)
                        {
                            var page_name = i;
                            var page_permissions = permissions[i];
                            for (x in page_permissions)
                            {
                                $('#' + page_name + '_' + x).prop("checked", true).trigger("change");

                            }

                        }
                        $('#addEditGroups').modal('show');
                    }
                });

            },
            delete: function (t) {
                //$(document).find(t).confirmation('show');


                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/groups/delete',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        $.alert(data.message);
                        groups_grid.api().ajax.reload();


                    }
                });
            },
            add: function () {
                Groups.empty();
                My.setModalTitle('#addEditGroups', lang.add_group);
                $('#addEditGroups').modal('show');
            },
            empty: function () {
                $('#id').val(0);
                $('#active').find('option').eq(0).prop('selected', true);
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                $('.help-block').html('');
                $('input[type="checkbox"]').prop("checked", false).trigger("change");
                My.emptyForm();
            },
        };
    }();
    $(document).ready(function () {
        Groups.init();
    });