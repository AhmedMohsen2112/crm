
    var Pjax = function () {

        var is_back;

        function initHistory() {
            (function (e, t) {//alert('init');
                if (document.location.protocol === "file:") {
                    alert("The HTML5 History API (and thus History.js) do not work on files, please upload it to a server.")
                }
                var n = e.History, r = n.getState();

                console.log(r);
                n.log("initial:", r.data, r.title, r.url);
                n.Adapter.bind(e, "statechange", function () {
                    var e = n.getState();
                    ajaxPage(e.url, "#pjax-container");
                    console.log(e.url);
                    n.log("statechange:", e.data, e.title, e.url)
                })
            })(window);
        }

        function initHistory2() {
            (function (window, t) {//alert('init');


                History.Adapter.bind(window, "statechange", function () {
                    var state = History.getState();
                    $.ajax
                            ({
                                type: "get",
                                url: state.url,
                                beforeSend: function () {
                                    $('.loading-div').show();
                                },
                                success: function (data)
                                {
//                                    $(".pagy a.page").each(function () {
//                                        if ($(this).attr('href') == state.url) {
//                                            $(this).addClass('active').siblings().removeClass('active');
//                                        }
//                                    });
                                    setTimeout(function () {
                                        $(".programs-content").html(data);
                                    }, 1000);
                                    setTimeout(function () {
                                        $('.loading-div').hide();
                                    }, 1500);
                                }
                            });
                    console.log(state.url);
                    History.log("statechange:", state.data, state.title, state.url)
                })
            })(window);
        }


        function ajax_links() {
            $("a[data-pjax]").each(function () {
                // $(this).unbind('click');
                $(this).click(function () {//alert('dffd');
                    not_pjax = false;
                    is_back = false;
                    History.pushState(null, null, $(this).attr("href"));
                    ajaxPage($(this).attr("href"), "#pjax-container");
                    return false
                })
            });
        }

        function ajax_links2() {
            $("a[data-pjax]").each(function () {
                // $(this).unbind('click');
                $(this).click(function () {//alert('dffd');

                    History.pushState(null, null, $(this).attr("href"));
                    ajaxPage2($(this).attr("href"), "#pjax-container");
                    return false
                })
            });
        }
        function ajaxPage(e, t) {
            if (not_pjax == false) {

                $.ajax({
                    url: e,
                    type: "POST",
                    data: {
                        pjax: "true"
                    },
                    xhr: function () {
                        var e = new window.XMLHttpRequest;
                        e.addEventListener("progress", function (e) {
                            if (e.lengthComputable) {
                                var t = e.loaded / e.total;
                                console.log(t);
                            }
                        }, false);
                        return e
                    },
                    xhrFields: {
                        onprogress: function (e) {
                            if (e.lengthComputable) {
                                console.log(e.loaded / e.total * 100 + "%")
                            }
                        }
                    },
                    success: function (e) {//alert('suuuu');
                        $(t).html(e);
                        //ajax_links();

                        if (is_back == false)
                        {
                            $("html, body").animate({scrollTop: 0}, 1e3);
                        }
                        is_back = true;
                    }
                })
            }
        }

        function ajaxPage2(e, t) {


            $.ajax({
                url: e,
                type: "POST",
                data: {
                    pjax: "true"
                },
                xhr: function () {
                    var e = new window.XMLHttpRequest;
                    e.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            var t = e.loaded / e.total;
                            console.log(t);
                        }
                    }, false);
                    return e
                },
                xhrFields: {
                    onprogress: function (e) {
                        if (e.lengthComputable) {
                            console.log(e.loaded / e.total * 100 + "%")
                        }
                    }
                },
                success: function (e) {//alert('suuuu');
                    $(t).html(e);
                    //ajax_links();

                    if (is_back == false)
                    {
                        $("html, body").animate({scrollTop: 0}, 1e3);
                    }
                    is_back = true;
                }
            })

        }
        return {
            init: function () {

                initHistory2();
                //ajax_links2();

            }
        };

    }();

    Pjax.init();