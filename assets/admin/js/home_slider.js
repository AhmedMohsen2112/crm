var Home_slider_grid;
var images_ids = {};
var Home_slider = function () {

    var init = function () {
        $.extend(lang, new_lang);
        handleSubmit();
        handleCheckImagesForDelete();
        remove_image()
    };
    var handleCheckImagesForDelete = function () {
        $(document).on('change', '.slide_image', function () {
            images_ids = {};
            var count = 0;
            $(".slide_image").each(function () {
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
                $('.delete-slider-images').prop('disabled', false);
            } else {
                $('.delete-slider-images').prop('disabled', true);
            }
            console.log(images_ids);

        });

    }
    var remove_image = function () {
        $(document).on('click', '.delete-slider-images', function () {
            $('.delete-slider-images').prop('disabled', true);
            $('.delete-slider-images').html(lang.deleting + ' ......');
            var action = config.admin_url + '/home_slider/remove_image';

            $.ajax({
                url: action,
                data: $.param(images_ids),
                async: false,
                success: function (data) {
                    console.log(data);

                    if (data.type == 'success')
                    {

                        setTimeout(function () {
                            handleListImagesOnServer();
                            $('.delete-slider-images').prop('disabled', false);
                            $('.delete-slider-images').html(lang.delete);
                        }, 1000);


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
    var handleListImagesOnServer = function () {
        var action = config.admin_url + '/home_slider/listFiles';
        $.ajax({
            url: action,
            async: false,
            success: function (data) {
                console.log(data);

                if (data.type == 'success')
                {
                    var items = [];
                    var count = 1;

                    for (var x = 0; x < data.data.length; x++) {
                        var image_id = 'slider_images_' + count;
                        var html = '<div style="position:relative;float:right;padding: 5px 5px;">' +
                                '<img style="height:80px;width:80px;" src="' + config.base_url + 'uploads/home_slider/' + data.data[x].image + '"/>' +
                                '<div style="position: absolute; top: 4px; left: 4px; width: 15px; height: 15px; text-align: center; line-height: 15px; border-radius: 50px;">' +
                                '<div class="md-checkbox">' +
                                ' <input type="checkbox" id="' + image_id + '"  name="slider_images[]"  value="' + data.data[x].id + '" class="slide_image md-check">' +
                                '<label for="' + image_id + '">' +
                                ' <span></span>' +
                                '<span class="check"></span>' +
                                '<span class="box" style="background-color: #fff;border: 2px solid #888;"></span></label>' +
                                '</div>' +
                                '</div>' +
                                '</div>';

                        items.push(html);
                        count++;
                    }
                    $("#uploading_files_content").html('').html(items.join(''));
                    $("#uploading_files_content").append('<div class="clearfix"></div><button type="button" disabled class="btn btn-info delete-slider-images">'+lang.delete+'</button>');
                    $('.delete-slider-images').show();

                } else {
                    $('#uploading_files_content').html('');
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
    var handleSubmit = function () {

        var action = config.admin_url + '/home_slider/add';
        $('.submit-form').click(function () {
            var options = {
                beforeSubmit: function () {

                    $('#bar').width('0%');
                    $('#percent').html('0%');
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    $('#progress_div').show();
                    $('#bar').width(percentComplete + '%');
                    $('#percent').html(percentComplete + '%');
                },
                success: function (data) {
                    console.log(data);
                    $('#progress_div').fadeOut();
                    $('#bar').width('0%');
                    $('#percent').html('0%');
                    if (data.type == 'success')
                    {
                        setTimeout(function () {
                            handleListImagesOnServer();
                            $('#addEditProductsImages .submit-form').prop('disabled', false);
                            $('#addEditProductsImages .submit-form').html(lang.upload);
                        }, 1000);

                    } else {
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
                url: action,
                dataType: "json",
                type: "POST",
            };
            var inputFile = $('#home_slider_image');
            var fileToUpload = inputFile[0].files;
            if (fileToUpload.length > 0) {
                $('#homeSliderForm').ajaxSubmit(options);
            } else {
                $.confirm({
                    title: lang.error,
                    content: lang.no_file_to_upload,
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


            return false;
        });






    }

    return {
        init: function () {
            init();
        },
        edit: function (t) {



            My.editForm({
                element: t,
                url: config.admin_url + '/home_slider/row',
                data: {id: $(t).attr("data-id")},
                success: function (data)
                {
                    console.log(data);

                    Home_slider.empty();
                    My.setModalTitle('#addEditHomeSlider', lang.edit_category);

                    for (i in data.message)
                    {
                        if (i == 'image') {
                            $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + config.base_url + 'uploads/home_slider/' + data.message[i] + '" alt="your image" />');
                        } else {
                            $('#' + i).val(data.message[i]);
                        }

                    }
                    $('#addEditHomeSlider').modal('show');
                }
            });

        },
        delete: function (t) {
            My.deleteForm({
                element: t,
                url: config.admin_url + '/home_slider/delete',
                data: {id: $(t).attr("data-id")},
                success: function (data)
                {
                    $.alert(data.message);
                    Home_slider_grid.api().ajax.reload();


                }
            });

        },
        add: function () {
            Home_slider.empty();
            My.setModalTitle('#addEditHomeSlider', lang.add_category);
            $('#addEditHomeSlider').modal('show');
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
    Home_slider.init();
});




