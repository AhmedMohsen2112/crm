    var App = function () {

        // IE mode
        var isRTL = false;
        var isIE8 = false;
        var isIE9 = false;
        var isIE10 = false;

        var resizeHandlers = [];

        var assetsPath = 'assets/';

        var globalImgPath = 'global/img/';

        var globalPluginsPath = 'global/plugins/';

        var globalCssPath = 'global/css/';

        // theme layout color set

        var brandColors = {
            'blue': '#89C4F4',
            'red': '#F3565D',
            'green': '#1bbc9b',
            'purple': '#9b59b6',
            'grey': '#95a5a6',
            'yellow': '#F8CB00'
        };



        return {
            //main function to initiate the theme
            init: function () {
            },
            set_error: function (id, msg) {
                $('[name="' + id + '"]')
                        .closest('.form-group').addClass('has-error').removeClass("has-info");
                $('#' + id).parent()

                if ($("#" + id).parent().hasClass("input-group"))
                {
                    $help_block = $('#' + id).parent().parent().find('.help-block');
                } else {
                    $help_block = $('#' + id).parent().find('.help-block');
                }


                if ($help_block.length)
                {
                    $help_block.html(msg);
                } else {
                    if ($("#" + id).parent().hasClass("input-group"))
                        $('#' + id).parent().parent().append('<span class="help-block">' + msg + '</span>');
                    else
                        $('#' + id).parent().append('<span class="help-block">' + msg + '</span>');
                }
            },
            set_errors: function (errors) {
                for (var i in errors)
                {
                    App.set_error(i, errors[i]);
                }
            },
            getDays: function (date1, date2) {
                var dt1 = new Date(date1);
                var dt2 = new Date(date2);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());
                var secondDate = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());

                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                return diffDays;
            },
            calculateAge: function (birthday) {
                var now = new Date();
                var past = new Date(birthday);
                var nowYear = now.getFullYear();
                var pastYear = past.getFullYear();
                var age = nowYear - pastYear;
                return age;
            },
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },
            getCookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            checkCookie: function () {
                var user = getCookie("username");
                if (user != "") {
                    alert("Welcome again " + user);
                } else {
                    user = prompt("Please enter your name:", "");
                    if (user != "" && user != null) {
                        setCookie("username", user, 30);
                    }
                }
            },
            initCheckbox: function () {

                if ($('#checkAll').length == 0)
                    return false;

                var checkboxes = document.querySelectorAll('input.check-me'),
                        checkall = document.getElementById('checkAll');

                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].onclick = function () {
                        var checkedCount = document.querySelectorAll('input.check-me:checked').length;

                        checkall.checked = checkedCount > 0;
                        checkall.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
                        if (checkedCount > 0)
                        {
                            $('#delete-selected').prop("disabled", false);
                        } else {
                            $('#delete-selected').prop("disabled", true);
                        }
                        if (checkedCount > 0 && checkedCount < checkboxes.length)
                        {
                            $('#checkAll').parent().addClass("indeterminate").removeClass("checked");
                        } else {
                            $('#checkAll').parent().removeClass("indeterminate");
                        }
                        $('#delete-num').html(checkedCount)
                    }
                }

                checkall.onclick = function () {

                    var checkedCount = document.querySelectorAll('input.check-me:checked').length;
                    if (checkedCount > 0 && checkedCount < checkboxes.length)
                    {
                        this.checked = true;
                    } else if (checkedCount == 0) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }

                    $('#checkAll').parent().addClass("checked").removeClass("indeterminate");

                    for (var i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].checked = this.checked;
                    }

                    if (document.querySelectorAll('input.check-me:checked').length > 0)
                    {
                        $('#delete-selected').prop("disabled", false);
                    } else {
                        $('#delete-selected').prop("disabled", true);
                    }

                    $('#delete-num').html(document.querySelectorAll('input.check-me:checked').length)
                }
            },
            emptyForm: function () {
                // $('[data-role="tagsinput"]').tagsinput('removeAll');
                $('input[type="text"],input[type="email"],input[type="date"],input[type="password"],input[type="number"],textarea').val("");
                $('input[type="checkbox"]').prop("checked", false).trigger("change");
            },
            scrollTo: function (el, offeset) {
                var pos = (el && el.size() > 0) ? el.offset().top : 0;

                if (el) {
                    if ($('body').hasClass('page-header-fixed')) {
                        pos = pos - $('.page-header').height();
                    } else if ($('body').hasClass('page-header-top-fixed')) {
                        pos = pos - $('.page-header-top').height();
                    } else if ($('body').hasClass('page-header-menu-fixed')) {
                        pos = pos - $('.page-header-menu').height();
                    }
                    pos = pos + (offeset ? offeset : -1 * el.height());
                }

                $('html,body').animate({
                    scrollTop: pos
                }, 'slow');
            },
            setModalTitle: function (id, title)
            {
                $(id + 'Label').html(title);
            },
            clearToolTip: function () {
                $('.tooltip.fade').each(function () {
                    if ($(this).attr("id"))
                    {
                        var $id = $(this).attr("id");
                        $('[aria-describedby="' + $id + '"]').removeAttr("aria-describedby");
                        $(this).remove()
                    }
                })
            },
            editForm: function (args) {

                //App.clearToolTip();

                $(args.element).html('<i class="fa fa-2x fa-spin fa-spinner"></i>');
                $.ajax({
                    url: args.url,
                    data: args.data,
                    success: function (data)
                    {
                        $(args.element).html('<i class="fa fa-2x fa-edit"></i>');

                        args.success(data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $('.loading').addClass('hide');
                        bootbox.dialog({
                            message: xhr.responseText,
                            title: lang.messages_error,
                            buttons: {
                                danger: {
                                    label: lang.close,
                                    className: "red"
                                }
                            }
                        });
                        $(args.element).html('<i class="fa fa-edit fa-2x"></i>');
                    },
                    dataType: "json",
                    type: "post"
                })
                return false;

            },
            clearFormErrors: function () {
                $('.has-error').removeClass("has-error");
                $('.help-block').html("");
            },
            Ajax: function (args) {

                App.clearToolTip();

                $.ajax({
                    url: config.site_url + args.url,
                    data: args.data,
                    success: function (data)
                    {
                        args.success(data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        bootbox.dialog({
                            message: xhr.responseText,
                            title: lang.messages_error,
                            buttons: {
                                danger: {
                                    label: lang.close,
                                    className: "red"
                                }
                            }
                        });
                    },
                    dataType: "json",
                    type: "post"
                })
                return false;

            },
            deleteForm2: function (args) {

                //App.clearToolTip();
//                $(args.element).confirmation({
//                    onConfirm: function () {
//
//                        $(args.element).html('<i class="fa fa-spin fa-spinner"></i>');
//
//                        $.ajax({
//                            url: args.url,
//                            data: args.data,
//                            success: function (data) {
//
//                                $(args.element).html('<i class="fa fa-trash fa-1-8x text-danger"></i>');
//
//                                if (data.type == 'success')
//                                {
//
//                                    $(args.element).parent().parent().fadeOut('slow');
//                                    args.success(data);
//
//                                }
//
//                            },
//                            error: function (xhr, textStatus, errorThrown) {
//                                $(args.element).html('<i class="fa fa-trash fa-1-8x text-danger"></i>');
//
//                                $('.loading').addClass('hide');
//                                bootbox.dialog({
//                                    message: xhr.responseText,
//                                    title: lang.messages_error,
//                                    buttons: {
//                                        danger: {
//                                            label: lang.close,
//                                            className: "red"
//                                        }
//                                    }
//                                });
//                            },
//                            dataType: "json",
//                            type: "post"
//                        })
//
//                        return false;
//                    }
//                }).confirmation({'trigger': 'click'});
            },
            deleteForm: function (args) {

                $(args.element).html('<i class="fa fa-spin fa-spinner"></i>');

                $.ajax({
                    url: args.url,
                    data: args.data,
                    success: function (data) {
                        console.log(data);


                        if (data.type == 'success') {

                            $(args.element).closest('tr').fadeOut('slow');
                            args.success(data);

                        } else {
                            $(args.element).html('<i class="fa fa-times fa-1-8x text-danger"></i>');
                            bootbox.dialog({
                                message: '<p>' + data.message + '</p>',
                                title: 'رسالة تنبيه',
                                buttons: {
                                    danger: {
                                        label: 'اغلاق',
                                        className: "red"
                                    }
                                }
                            });
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $(args.element).html('<i class="fa fa-trash fa-1-8x text-danger"></i>');

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
                    type: "post"
                })

            },
            multiDeleteForm: function (args) {

                App.clearToolTip();

                if ($(args.element).hasClass("has-confirm")) {
                    $(args.element).confirmation('show');
                    return false;
                }
                $(args.element).addClass("has-confirm");
                $(args.element).confirmation({
                    href: "javascript:;",
                    onConfirm: function () {

                        $.ajax({
                            url: config.site_url + args.url,
                            data: args.data,
                            success: function (data) {

                                if (data.type == 'success')
                                {
                                    args.success(data);
                                    $(args.element).prop("disabled", true);
                                    $('#delete-num').html(0);
                                    $('#checkAll').prop("indeterminate", false).parent().removeClass("indeterminate");

                                } else {
                                    bootbox.dialog({
                                        message: data.message,
                                        title: lang.messages_error,
                                        buttons: {
                                            danger: {
                                                label: lang.close,
                                                className: "red"
                                            }
                                        }
                                    });
                                }

                            },
                            error: function (xhr, textStatus, errorThrown) {

                                $('.loading').addClass('hide');
                                bootbox.dialog({
                                    message: xhr.responseText,
                                    title: lang.messages_error,
                                    buttons: {
                                        danger: {
                                            label: lang.close,
                                            className: "red"
                                        }
                                    }
                                });
                            },
                            dataType: "json",
                            type: "post"
                        })

                        return false;
                    }
                }).confirmation('show');
            },
        };

    }();

    jQuery(document).ready(function () {
        App.init();
    });

