    var Currency_grid;

    var Currency = function () {

        var init = function () {
            //alert('heree');
            $.extend(lang, new_lang);
            //console.log(lang);
            handleRecords();
            handleSubmit();

        };
        var handleRecords = function () {

            Currency_grid = $('.dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/currency/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "title_ar"},
                    {"data": "title_en"},
                    {"data": "sign"},
                    {"data": "options", orderable: false}
                ],
                "order": [
                    [1, "desc"]
                ],
            "oLanguage": {"sUrl":config.base_url+'/datatable-lang-'+config.lang_code+'.json'}

            });
        }
        var handleSubmit = function () {

            $('#addEditCurrencyForm').validate({
                rules: {
                    title_ar: {
                        required: true

                    },
                    title_en: {
                        required: true

                    },
                    sign: {
                        required: true

                    },
                    amount_le: {
                        required: true,
                        number: true,
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
            $('#addEditCurrency .submit-form').click(function () {
                if ($('#addEditCurrencyForm').validate().form()) {
                    $('#addEditCurrencyForm').submit();
                }
                return false;
            });
            $('#addEditCurrencyForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditCurrencyForm').validate().form()) {
                        $('#addEditCurrencyForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditCurrencyForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/currency/add';
                if (id != 0) {
                    action = config.admin_url + '/currency/edit';
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
                                "extendedTimeOut": 1000
                            };
                            toastr.success(data.message, 'رسالة');
                            Currency_grid.api().ajax.reload();

                            if (id != 0) {
                                $('#addEditCurrency').modal('hide');
                            } else {
                                Currency.empty();
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
            },
            edit: function (t) {



                My.editForm({
                    element: t,
                    url: config.admin_url + '/currency/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Currency.empty();
                        My.setModalTitle('#addEditCurrency', lang.edit_currency);

                        for (i in data.message)
                        {
                            $('#' + i).val(data.message[i]);
                        }
                        $('#addEditCurrency').modal('show');
                    }
                });

            },
            delete: function (t) {
                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/currency/delete',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        Currency_grid.api().ajax.reload();
                    }
                });
            },
            add: function () {
                Currency.empty();
                My.setModalTitle('#addEditCurrency', lang.add_currency);
                $('#addEditCurrency').modal('show');
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
    jQuery(document).ready(function () {
        Currency.init();
    });

