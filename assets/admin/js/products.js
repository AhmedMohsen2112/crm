
    var products_id;
    var product_trip_rates_id;
    var Program_type;
    var Products_grid;
    var Products_images_grid;
    var Products_features_grid;
    var productTypeFormData;
    var images_ids = {};
    var Products = function () {

        var init = function () {
            $.extend(lang, new_lang);
            handleRecords();
            handleShowInSlider();
            handleSubmit();
            handleImagesFormSubmit();
            readImage();
            remove_image();
            handleCheckImagesForDelete();
            handleDatatables();
        };

        var readImage = function (input) {
            $("#product_image").change(function () {
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
            $("#prog_slider_image").change(function () {
                //alert($(this)[0].files.length);
                for (var i = 0; i < $(this)[0].files.length; i++) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.slider_image_uploaded').html('<img style="height:80px;width:150px;" id="slider_image_upload_preview" src="' + e.target.result + '" alt="your image" />');
                    }

                    reader.readAsDataURL($(this)[0].files[i]);
                }

                //readURL(this);
            });


        }
        var handleDatatables = function () {
            $(document).on('click', '.data-box', function () {

                var box_type = $(this).data('type');
                products_id = $(this).data('id');
                if (box_type == 'products') {
                    if (!$('#products_table').hasClass('active')) {
                        $('.table-box').removeClass('active').addClass('disabled');
                        $('#products_table').removeClass('disabled').addClass('active');

                    }

                    if (typeof Products_grid === 'undefined') {

                        Products_grid = $('#products_table .dataTable').dataTable({
                            //"processing": true,
                            "serverSide": true,
                            "ajax": {
                                "url": config.admin_url + "/products/data",
                                "type": "POST"
                            },
                            "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                                {"data": "product_title"},
                                {"data": "main_category"},
                                {"data": "price"},
                                {"data": "image"},
                                {"data": "options", orderable: false}
                            ],
                            "order": [
                                [1, "desc"]
                            ]

                        });
                    } else {
                        Products_grid.api().ajax.url(config.admin_url + "/products/data").load();
                    }
                }
                if (box_type == 'products_features') {
                    if (!$('#products_features_table').hasClass('active')) {
                        $('.table-box').removeClass('active').addClass('disabled');
                        $('#products_features_table').removeClass('disabled').addClass('active');

                    }

                    if (typeof Products_features_grid === 'undefined') {


                        Products_features_grid = $('#products_features_table .dataTable').dataTable({
                            //"processing": true,
                            "serverSide": true,
                            "ajax": {
                                "url": config.admin_url + "/products_features/data/?products_id=" + products_id,
                                "type": "POST"
                            },
                            "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                                {"data": "title_en"},
                                {"data": "options", orderable: false, }
                            ],
                            "order": [
                                [1, "desc"]
                            ]

                        });
                    } else {
                        Products_features_grid.api().ajax.url(config.admin_url + "/products_features/data/?products_id=" + products_id).load();
                    }
                }

                return false;
            });
        }
        var handleRecords = function () {
            Products_grid = $('#products_table .dataTable').dataTable({
                //"processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.admin_url + "/products/data",
                    "type": "POST"
                },
                "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                    {"data": "product_title"},
                    {"data": "category_title"},
                    {"data": "price"},
                    {"data": "client_name"},
                    {"data": "options", orderable: false}
                ],
                "order": [
                    [1, "desc"]
                ],
                "oLanguage": {"sUrl":config.base_url+'/datatable-lang-'+config.lang_code+'.json'}

            });
        }
        var handleSubmit = function () {

            $('#addEditProductsForm').validate({
                rules: {
                    title: {
                        required: true,
                    },
                    description: {
                        required: true,
                    },
                    phone: {
                        required: true,
                    },
                    price: {
                        required: true

                    },
                    countries_id: {
                        required: true

                    },
                    categories_id: {
                        required: true

                    },
                    brands_id: {
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
            $('#addEditProducts .submit-form').click(function () {
                if ($('#addEditProductsForm').validate().form()) {
                    $('#addEditProductsForm').submit();
                }
                return false;
            });
            $('#addEditProductsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#addEditProductsForm').validate().form()) {
                        $('#addEditProductsForm').submit();
                    }
                    return false;
                }
            });



            $('#addEditProductsForm').submit(function () {
                var id = $('#id').val();
                var action = config.admin_url + '/products/add';
                if (id != 0) {
                    action = config.admin_url + '/products/edit';
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
                            Products_grid.api().ajax.reload();
                            if (id != 0) {
                                $('#addEditProducts').modal('hide');
                            } else {
                                Products.products_empty();
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
       
        var handleImagesFormSubmit = function () {
            var action = config.admin_url + '/products/add_images';
            $('#addEditProductsImages .submit-form').click(function () {
                $('#addEditProductsImages .submit-form').prop('disabled', true);
                $('#addEditProductsImages .submit-form').html(lang.uploading + ' ......');
                var inputFile = $('#product_images');
                var formData = new FormData($("#addEditProductsImagesForm")[0]);
                var fileToUpload = inputFile[0].files;
                //return false;
                for (var x = 0; x < fileToUpload.length; x++) {
                    formData.append('file[]', fileToUpload[x]);
                }
                formData.append('products_id', products_id);

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
                            setTimeout(function () {
                                handleListImagesOnServer(products_id);
                                $('#addEditProductsImages .submit-form').prop('disabled', false);
                                $('#addEditProductsImages .submit-form').html(lang.upload);
                            }, 3000);

                        } else {
                            console.log(data)
                            if (typeof data.errors === 'object') {

                                var items = [];
                                $.each(data.errors, function (i, element) {
                                    items.push('<li class="list-group-item">' + i + ' : ' + element + '</li>');
                                });
                                console.log(items);
                                $("#files-not-uploaded").html('').html(items.join(''));

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
            });
        }
        var handleListImagesOnServer = function (products_id) {
            var action = config.admin_url + '/products/listFiles';
            $.ajax({
                url: action,
                data: {products_id: products_id},
                async: false,
                success: function (data) {
                    console.log(data);

                    if (data.type == 'success')
                    {
                        var items = [];
                        var count = 1;
                        for (var x = 0; x < data.data.length; x++) {
                            var image_id = 'product_images_' + count;
                            var html = '<div style="position:relative;float:right;padding: 5px 5px;">' +
                                    '<img style="height:80px;width:80px;" src="' + config.base_url + 'uploads/products/' + data.data[x].image + '"/>' +
                                    '<div style="position: absolute; top: 4px; left: 4px; width: 15px; height: 15px; text-align: center; line-height: 15px; border-radius: 50px;">' +
                                    '<div class="md-checkbox">' +
                                    ' <input type="checkbox" id="' + image_id + '"  name="product_images[]"  value="' + data.data[x].id + '" class="product_image md-check">' +
                                    '<label for="' + image_id + '">' +
                                    ' <span></span>' +
                                    '<span class="check"></span>' +
                                    '<span class="box" style="background-color: #fff;border: 2px solid #888;"></span></label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
//                            var html = '<div style="position:relative;float:right;padding: 5px 5px;"><img style="height:80px;width:80px;" src="' + config.base_url + 'uploads/products_slider/' + data.data[x].image + '"/><div style="position: absolute; top: -3px; left: 4px; width: 15px; height: 15px; text-align: center; line-height: 15px; background: #ab0101; border-radius: 50px;"><a href="" class="product_image" data-id="' + data.data[x].id + '" data-product-id="' + data.data[x].products_id + '" data-image="' + data.data[x].image + '" style="color:#fff;">x</a></div></div>';

                            items.push(html);
                            count++;
                        }
                        $("#products-images-box").html('').html(items.join(''));

                    } else {
                        $("#products-images-box").html('');
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
        }
        var handleCheckImagesForDelete = function () {
            $(document).on('change', '.product_image', function () {
                images_ids = {};
                var count = 0;
                $(".product_image").each(function () {
                    var input_id = $(this).attr('id');
                    var value = $(this).val();
                    if ($(this).is(':checked')) {
                        //alert(input_id);
                        images_ids[input_id] = value;
                        count++;
                    } else {
                        //alert('here');
                        delete images_ids[input_id];
                    }
                });
                if (count > 0) {
                    $('.delete-product-images').prop('disabled', false);
                } else {
                    $('.delete-product-images').prop('disabled', true);
                }
                console.log(images_ids);

            });

        }
        var remove_image = function () {
            $(document).on('click', '.delete-product-images', function () {
                $('.delete-product-images').prop('disabled', true);
                $('.delete-product-images').html(lang.deleting + ' ......');
                var action = config.admin_url + '/products/remove_image';

                $.ajax({
                    url: action,
                    data: $.param(images_ids),
                    async: false,
                    success: function (data) {
                        console.log(data);

                        if (data.type == 'success')
                        {

                            setTimeout(function () {
                                handleListImagesOnServer(products_id);
                                $('.delete-product-images').prop('disabled', false);
                                $('.delete-product-images').html(lang.delete);
                            }, 3000);


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
            });

        }
        var handleShowInSlider = function () {
            $('#show_in_slider').on('change', function () {
                var show_in_slider = $(this).val();
                if (show_in_slider == 1) {
                    $('#slider-image-upload-box').slideDown(500);
                    $("#prog_slider_image").rules("add", {
                        required: true,
                        messages: {
                            required: "لا يوجد ملف للرفع",
                        }
                    });
                } else {
                    $("#prog_slider_image").rules("remove", "required");
                    $("#prog_slider_image").closest('.form-group').removeClass('has-error');
                    $("#prog_slider_image").closest('.form-group').find('.help-block').html('');
                    $('#slider-image-upload-box').slideUp(500);
                }
            });
        }

        return {
            init: function () {
                init();
            },
            edit_products: function (t) {



                My.editForm({
                    element: t,
                    url: config.admin_url + '/products/row',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Products.products_empty();
                        My.setModalTitle('#addEditProducts', lang.edit_product);

                        for (i in data.message)
                        {
                            if (i == 'image') {
                                $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + config.base_url + 'uploads/products/' + data.message[i] + '" alt="your image" />');
                            } else if (i == 'main_categories_id') {
                                $('#' + i).val(data.message[i]);
                            } else {
                                $('#' + i).val(data.message[i]);
                            }

                        }
                        $('#addEditProducts').modal('show');
                    }
                });

            },
            edit_products_features: function (t) {
                My.editForm({
                    element: t,
                    url: config.admin_url + '/products_features/row',
                    data: {products_features_id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        console.log(data);

                        Products.products_features_empty();
                        My.setModalTitle('#addEditProductsFeatures', lang.edit_products_features);
                        products_id = data.message['products_id'];
                        $('#products_features_id').val(data.message['id']);
                        $('#title_enn').val(data.message['title_en']);
                        $('#addEditProductsFeatures').modal('show');
                    }
                });

            },
            delete_products: function (t) {
                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/products/delete',
                    data: {id: $(t).attr("data-id")},
                    success: function (data)
                    {

                        Products_grid.api().ajax.reload();


                    }
                });

            },
            delete_products_features: function (t) {
                My.deleteForm({
                    element: t,
                    url: config.admin_url + '/products_features/delete',
                    data: {products_features_id: $(t).attr("data-id")},
                    success: function (data)
                    {
                        Products_features_grid.api().ajax.reload();


                    }
                });

            },
            add_products: function () {
                Products.products_empty();
                My.setModalTitle('#addEditProducts', lang.add_product);
                $('#addEditProducts').modal('show');
            },
            add_products_features: function () {
                Products.products_features_empty();
                My.setModalTitle('#addEditProductsFeatures', lang.add_products_features);
                $('#addEditProductsFeatures').modal('show');
            },
            gallery: function (element) {
                products_id = $(element).data('id');
                $("#products-images-box").html('');
                $("#product_images").val('');
                handleListImagesOnServer(products_id);
                My.setModalTitle('#addEditProductsImages', lang.add_products_images);
                $('#addEditProductsImages').modal('show');
            },
            products_empty: function () {
                $('#id').val(0);
                $('#main_categories_id').find('option').eq(0).prop('selected', true);
                $('#product_image').val('');
                $('.image_uploaded').html('<img src="' + config.base_url + 'no-image.jpg" width="150" height="80" />');
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                $('.help-block').html('');
                My.emptyForm();
            },
            products_features_empty: function () {
                $('#products_features_id').val(0);
                $('.has-error').removeClass('has-error');
                $('.has-success').removeClass('has-success');
                $('.help-block').html('');
                My.emptyForm();
            },
        };

    }();
    jQuery(document).ready(function () {
        Products.init();
    });

