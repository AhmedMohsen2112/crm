
    var Photo_gallery = function () {

        var init = function () {
            show_more_hotels();
        }

        var show_more_hotels = function () {
            $(document).on('click', '#show-more-btn', function () {
                $('#show-more-btn').html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
                $('#show-more-btn').prop('disabled', true);
                var all_photo_gallery_count = $(this).attr('data-all-photo-gallery-count');
                var photo_gallery_length_before_click = $(document).find('.photo-box').length;
                var action = config.site_url + 'ajax/morePhotoGallery';
                $.ajax({
                    url: action,
                    data: {offset: photo_gallery_length_before_click},
                    async: false,
                    beforeSend: function () {

                    },
                    success: function (data) {
                        console.log(data);
                        var html = '';
                        if (data.type == 'success') {
                            for (var x = 0; x < data.data.length; x++) {
                                var photo_title = data.data[x][lang.title_slug];
                                var image = data.data[x].image;
                                var image_url = image.substr(image.indexOf('_') + 1)
                                html += '  <div class="col-md-3 col-sm-4  pull-left photo-box">' +
                                        '<div class="image-wrapper">' +
                                        '<img src="' + config.url + 'uploads/photo_gallery/s_' + image_url + '" alt="cruise">' +
                                        '<div class="img-caption">' +
                                        '<div class="link">' +
                                        '<a title="' + photo_title + '" href="' + config.url + 'uploads/photo_gallery/l_' + image_url + '"><i class="fa fa-plus"></i></a>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                            }
                            setTimeout(function () {
                                $('#photo_gallery_content').append(html);
                                var photo_gallery_length_after_click = $(document).find('.photo-box').length;
                                if (photo_gallery_length_after_click == all_photo_gallery_count) {
                                    $('.show-more-box').hide();
                                }
                            }, 2000);
                            setTimeout(function () {
                                $('#show-more-btn').html(lang.show_more);
                                $('#show-more-btn').prop('disabled', false);
                            }, 2000);


                        }


                    },
                    error: function (xhr, textStatus, errorThrown) {
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
                    dataType: "JSON",
                    type: "POST"
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
        Photo_gallery.init();
    });


