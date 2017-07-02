    var Packages_grid;
    var Packages = function () {
        var init = function () {
            $.extend(lang, new_lang);
            handleRecords();
            handleSubmit();

        };
   handleRecords = function () {

            Packages_grid = $('.dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/packages/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "title"},
                    {"data": "period"},
                    {"data": "price"},
                    {"data": "no_of_ads"},
                    {"data": "active"},
                    {"data": "options", orderable: false}
                ],
                "order": [
                    [1, "desc"]
                ],
            "oLanguage": {"sUrl":config.base_url+'/datatable-lang-'+config.lang_code+'.json'}

            });
        }
        var handleSubmit = function () {

            $('#addEditPackagesForm').validate({
                rules: {
                    title_ar: {
                        required: true

                    },
                    title_en: {
                        required: true

                    },
                    desc_ar: {
                        required: true

                    },
                    desc_en: {
                        required: true

                    },
                    price: {
                        required: true

                    },
                    period: {
                        required: true

                    },
                    no_of_ads: {
                        required: true

                    },
                    this_order: {
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
            $('#addEditPackages .submit-form').click(function () {
                if ($('#addEditPackagesForm').validate().form()) {
                    $('#addEditPackagesForm').submit();
                }
                return false;
            });
            $('#addEditPackagesForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditPackagesForm').validate().form()) {
                        $('#addEditPackagesForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditPackagesForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/packages/add';
                if (id != 0) {
                    action = config.admin_url + '/packages/edit';
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
                            Packages_grid.api().ajax.reload();

                            if (id != 0) {
                                $('#addEditPackages').modal('hide');
                            } else {
                                Packages.empty();
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
                    url: config.admin_url + '/packages/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Packages.empty();
                        My.setModalTitle('#addEditPackages', lang.edit_packages);

                        for (i in data.message)
                        {

                            $('#' + i).val(data.message[i]);
                        }
                        $('#addEditPackages').modal('show');
                    }
                });

            },
            delete: function (t) {
                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/packages/delete',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        Packages_grid.api().ajax.reload();


                    }
                });
            },
            add: function () {
                Packages.empty();
                My.setModalTitle('#addEditPackages', lang.add_packages);
                $('#addEditPackages').modal('show');
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
        Packages.init();
    });