
    var About_us = function () {

        var init = function () {
            $.extend(lang, new_lang)
            handleSubmit();
            readImage();
        };
        var readImage = function (input) {
            $("#about_us_image").change(function () {
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
        var handleSubmit = function () {

            $('#editAboutUsForm').validate({
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
            $('#editAboutUs .submit-form').click(function () {
                if ($('#editAboutUsForm').validate().form()) {
                    $('#editAboutUsForm').submit();
                }
                return false;
            });
            $('#editAboutUsForm input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#editAboutUsForm').validate().form()) {
                        $('#editAboutUsForm').submit();
                    }
                    return false;
                }
            });



            $('#editAboutUsForm').submit(function () {
                var formData = new FormData($(this)[0]);
                var action = config.admin_url + '/about_us/edit';

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
                            for (x in data.message)
                            {
                                if (x == 'desc_ar' || x == 'title_ar') {
                                    $('#' + x).val(data.message[x]);
                                }
                                if (x == 'image') {
                                    $('.about_us_image').attr('src', config.base_url + 'uploads/about_us/' + data.message[x]);
                                }
                            }
                            toastr.options = {
                                "debug": false,
                                "positionClass": "toast-bottom-left",
                                "onclick": null,
                                "fadeIn": 300,
                                "fadeOut": 1000,
                                "timeOut": 5000,
                                "extendedTimeOut": 1000
                            };
                            toastr.success('تم التعديل بنجاح', 'رسالة');

                        } else {
                            console.log(data)
                            if (typeof data.errors !== 'undefined') {
                                for (i in data.errors)
                                {
                                    $('[name="' + i + '"]')
                                            .closest('.form-group').addClass('has-error');
                                    $('#' + i).parent().find(".help-block").html(data.errors[i]).css('opacity', 1)
                                }
                            }
                            if (typeof data.message !== 'undefined') {
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
            }
        };

    }();
    jQuery(document).ready(function () {
        About_us.init();
    });
