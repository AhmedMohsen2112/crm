    var Brands_grid;
    var parent_id = 0;

    var Brands = function () {

        var init = function () {
            $.extend(lang, new_lang);
            handleMainBrandsTable();
            handleSubmit();
            readImage();


        };
        var readImage = function (input) {
            $("#brand_image").change(function () {
                //alert($(this)[0].files.length);
                for (var i = 0; i < $(this)[0].files.length; i++) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + e.target.result + '" alt="your image" />');
                    }

                    reader.readAsDataURL($(this)[0].files[i]);
                }

                //readURL(this);
            });



        }
        var handleMainBrandsTable = function () {
            Brands_grid = $('.dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/brands/data",
                    "type": "POST",
                },
                "columns": [
//                  {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "title_en"},
                    {"data": "image"},
                    {"data": "active"},
                    {"data": "options", orderable: false, }
                ],
                "order": [
                    [1, "desc"]
                ],
            "oLanguage": {"sUrl":config.base_url+'/datatable-lang-'+config.lang_code+'.json'}

            });
        }
        var handleSubmit = function () {
            $('#addEditBrandsForm').validate({
                rules: {
                    this_order: {
                        required: true,
                    },
                    title_en: {
                        required: true,
                    },
                    title_ar: {
                        required: true,
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
            $('#addEditBrands .submit-form').click(function () {
                if ($('#addEditBrandsForm').validate().form()) {
                    $('#addEditBrandsForm').submit();
                }
                return false;
            });
            $('#addEditBrandsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditBrandsForm').validate().form()) {
                        $('#addEditBrandsForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditBrandsForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/brands/add';
                if (id != 0) {
                    action = config.admin_url + '/brands/edit';
                }
                var formData = new FormData($(this)[0]);
                formData.append('parent_id', parent_id);
                $.ajax({
                    url: action,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);

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
                            Brands_grid.api().ajax.reload();
                            if (id != 0) {
                                $('#addEditBrands').modal('hide');
                            } else {
                                Brands.empty();
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
                    url: config.admin_url + '/brands/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Brands.empty();
                        My.setModalTitle('#addEditBrands', lang.edit_brand);

                        for (i in data.message)
                        {
                            if (i == 'image') {
                                $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + config.base_url + 'uploads/brands/' + data.message[i] + '" alt="your image" />');
                            } else if (i == 'categories') {
                                for (var x = 0; x < data.message[i].length; x++) {
                                    var category_id = 'category_' + data.message[i][x].categories_id;
                                    $('#' + category_id).prop('checked', true);
                                }
                            }else {
                                $('#' + i).val(data.message[i]);
                            }

                        }
                        $('#addEditBrands').modal('show');
                    }
                });

            },
            delete: function (t) {
                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/brands/delete',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        $.alert(data.message);
                        Brands_grid.api().ajax.reload();


                    }
                });

            },
            add: function () {
                Brands.empty();
                My.setModalTitle('#addEditBrands', lang.add_brand);
                $('#addEditBrands').modal('show');
            },
            empty: function () {
                $('#id').val(0)
                $('#active').find('option').eq(0).prop('selected', true);
                $('.image_uploaded').html('<img src="' + config.base_url + 'no-image.jpg" width="150" height="80" />');
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                $('.help-block').html('');
                My.emptyForm();
            }
        };

    }();
    jQuery(document).ready(function () {
        Brands.init();
    });

