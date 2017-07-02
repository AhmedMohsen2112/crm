var Countries_grid;

var Countries = function () {

    var init = function () {
        $.extend(lang, new_lang);
        handleRecords();
        handleSubmit();
        readImage();
     
    };

    var readImage = function () {
        $("#country_image").change(function () {
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

    var handleRecords = function () {
        Countries_grid = $('#countries_table .dataTable').dataTable({
            //"processing": true,
            "serverSide": true,
            "ajax": {
                "url": config.admin_url + "/countries/data/",
                "type": "POST",
            },
            "columns": [
//                    {"data": "user_input", orderable: false, "class": "text-center"},
                {"data": "title_ar"},
                {"data": "title_en"},
                {"data": "image"},
//                    {"data": "cities"},
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
        jQuery.validator.addMethod("onlyArabic", function (value) {
            var arabic = /[\u0600-\u06FF0-9,-.]/;
            var space = /\s/;
            var count = 0;
            for (var i = 0; i < value.length; i++) {
                if (space.test(value.charAt(i)) == false) {
                    if (arabic.test(value.charAt(i))) {

                    } else {
                        count++;
                    }
                }


            }

            if (count > 0) {
                return false;
            } else {
                return true;
            }
        }, "ادخل الحروف بالغة العربية");
        jQuery.validator.addMethod("onlyEnglish", function (value) {
            var endlish = /[A-Za-z0-9,-.]/;
            var space = /\s/;
            var count = 0;
            for (var i = 0; i < value.length; i++) {
                if (space.test(value.charAt(i)) == false) {
                    if (endlish.test(value.charAt(i))) {

                    } else {
                        count++;
                    }
                }
            }

            if (count > 0) {
                return false;
            } else {
                return true;
            }
        }, "ادخل الحروف بالغة الإنجليزية");
        $('#addEditCountriesForm').validate({
            rules: {
                title_ar: {
                    required: true,
                },
                title_en: {
                    required: true,
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
        $('#addEditCountries .submit-form').click(function () {
            if ($('#addEditCountriesForm').validate().form()) {
                $('#addEditCountriesForm').submit();
            }
            return false;
        });
        $('#addEditCountriesForm input').keypress(function (e) {
            if (e.which == 13) {
                if ($('#addEditCountriesForm').validate().form()) {
                    $('#addEditCountriesForm').submit();
                }
                return false;
            }
        });
        $('#addEditCountriesForm').submit(function () {
            var id = $('#id').val();
            var action = config.admin_url + '/countries/add';
            if (id != 0) {
                action = config.admin_url + '/countries/edit';
            }
            var formData = new FormData($(this)[0]);
            var options = {
               
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
                        Countries_grid.api().ajax.reload();

                        if (id != 0) {
                            $('#addEditCountries').modal('hide');
                        } else {
                            Countries.empty();
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
                uploadProgress:function(event,position,total,percentComplete){
                    console.log(percentComplete);
                },
                url: action,
                dataType: "json",
                type: "POST",
            };
            $(this).ajaxSubmit(options);
         

            return false;

        })


//        $('#addEditCountriesForm').submit(function () {
//            var id = $('#id').val();
//            var action = config.admin_url + '/countries/add';
//            if (id != 0) {
//                action = config.admin_url + '/countries/edit';
//            }
//            var formData = new FormData($(this)[0]);
//            $.ajax({
//                url: action,
//                data: formData,
//                async: false,
//                cache: false,
//                contentType: false,
//                processData: false,
//                success: function (data) {
//                    console.log(data);
//
//                    if (data.type == 'success')
//                    {
//                        toastr.options = {
//                            "debug": false,
//                            "positionClass": "toast-bottom-left",
//                            "onclick": null,
//                            "fadeIn": 300,
//                            "fadeOut": 1000,
//                            "timeOut": 5000,
//                            "extendedTimeOut": 1000
//                        };
//                        toastr.success(data.message, 'رسالة');
//                        Countries_grid.api().ajax.reload();
//
//                        if (id != 0) {
//                            $('#addEditCountries').modal('hide');
//                        } else {
//                            Countries.empty();
//                        }
//
//                    } else {
//                        console.log(data)
//                        if (typeof data.errors === 'object') {
//                            for (i in data.errors)
//                            {
//                                $('[name="' + i + '"]')
//                                        .closest('.form-group').addClass('has-error');
//                                $('#' + i).parent().find(".help-block").html(data.errors[i]).css('opacity', 1)
//                            }
//                        } else {
//                            $.confirm({
//                                title: lang.error,
//                                content: data.message,
//                                type: 'red',
//                                typeAnimated: true,
//                                buttons: {
//                                    tryAgain: {
//                                        text: lang.try_again,
//                                        btnClass: 'btn-red',
//                                        action: function () {
//                                        }
//                                    }
//                                }
//                            });
//                        }
//                    }
//                },
//                error: function (xhr, textStatus, errorThrown) {
//                    $('.loading').addClass('hide');
//                    bootbox.dialog({
//                        message: xhr.responseText,
//                        title: 'رسالة تنبيه',
//                        buttons: {
//                            danger: {
//                                label: 'اغلاق',
//                                className: "red"
//                            }
//                        }
//                    });
//                },
//                dataType: "json",
//                type: "POST"
//            });
//
//            return false;
//
//        })




    }

    return {
        init: function () {
            init();
        },
        edit: function (t) {



            My.editForm({
                element: t,
                url: config.admin_url + '/countries/row',
                data: {id: $(t).attr("data-id")},
                success: function (data)
                {
                    console.log(data);

                    Countries.empty();
                    My.setModalTitle('#addEditCountries', lang.edit_country);

                    for (i in data.message)
                    {

                        if (i == 'image') {
                            $('.image_uploaded').html('<img style="height:80px;width:150px;" id="image_upload_preview" src="' + config.base_url + 'uploads/countries/' + data.message[i] + '" />');

                        } else {
                            $('#' + i).val(data.message[i]);
                        }

                    }
                    $('#addEditCountries').modal('show');
                }
            });

        },
        delete: function (t) {
            My.deleteForm({
                element: t,
                url: config.admin_url + '/countries/delete',
                data: {id: $(t).attr("data-id")},
                success: function (data)
                {
                    //$.alert(data.message);
                    Countries_grid.api().ajax.reload();


                }
            });

        },
        add: function () {
            Countries.empty();
            My.setModalTitle('#addEditCountries', 'اضافة');
            $('#addEditCountries').modal('show');
        },
        empty: function () {
            $('#id').val(0);
            $('#country_image').val('');
            $('.image_uploaded').html('<img src="' + config.base_url + 'no-image.jpg" width="150" height="80" />');
            $('select').find('option').eq(0).prop('selected', true);
            $('.has-error').removeClass('has-error');
            $('.has-success').removeClass('has-success');
            $('.help-block').html('');
            My.emptyForm();
        }
    };

}();
jQuery(document).ready(function () {
    Countries.init();
});

