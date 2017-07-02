    var is_logged = false;  //for check if user is logged before booking
    var map;
    var program_details = function () {

        var init = function () {
            handleShowHotelMap();
        }

        var handleShowHotelMap = function () {
            $('.hotel_map').on('click', function () {
                var hotel_title = $(this).attr('data-title');
                var hotel_longitude = $(this).data('lng');
                var hotel_latitude = $(this).data('lat');
                var hotel_href = $(this).data('uri');
                App.setModalTitle('#hotelMap', hotel_title);
                $('#hotelMap').modal('show');
                $("#hotelMap").on("shown.bs.modal", function () {

                    map = new GMaps({
                        el: '#map',
                        zoom: 17,
                        lat: hotel_latitude,
                        lng: hotel_longitude,
                    });
                    map.addMarker({
                        lat: hotel_latitude,
                        lng: hotel_longitude,
                        title: hotel_title,
                        click: function (e) {
                            window.location.href = hotel_href;
                        },
                        mouseover: function (e) {
                        }
                    });
//                    map.drawOverlay({
//                        lat: hotel_latitude,
//                        lng: hotel_longitude,
//                        layer: 'overlayLayer',
//                        content: '<div class="overlay">' + hotel_title + '<div class="overlay_arrow above"></div></div>',
//                        verticalAlign: 'middle',
//                        horizontalAlign: 'center'
//                    });
                    //map.refresh();
                    //resizeMap();
                });
                return false;
            })
        }


        var handleShowMaps = function () {

//            map.addMarker({
//                lat: -12.043333,
//                lng: -77.03,
//                title: 'Lima',
//                details: {
//                    database_id: 42,
//                    author: 'HPNeo'
//                },
//                click: function (e) {
//                    if (console.log)
//                        console.log(e);
//                    alert('You clicked in this marker');
//                },
//                mouseover: function (e) {
//                    if (console.log)
//                        console.log(e);
//                }
//            });

//            GMaps.geolocate({
//                success: function (position) {
//                    map.setCenter(position.coords.latitude, position.coords.longitude);
//                },
//                error: function (error) {
//                    alert('Geolocation failed: ' + error.message);
//                },
//                not_supported: function () {
//                    alert("Your browser does not support geolocation");
//                },
//                always: function () {
//                    alert("Done!");
//                }
//            });
            $("#Maps_mod").on("shown.bs.modal", function () {
                map = new GMaps({
                    el: '#map',
                    lat: 30.074781,
                    lng: 31.302321,
                });
                map.drawOverlay({
                    lat: map.getCenter().lat(),
                    lng: map.getCenter().lng(),
                    layer: 'overlayLayer',
                    content: '<div class="overlay">فندق الحرم المكى<div class="overlay_arrow above"></div></div>',
                    verticalAlign: 'middle',
                    horizontalAlign: 'center'
                });
                map.refresh();
                //resizeMap();
            });
//            map = new GMaps({
//                el: '#map',
//                zoom: 20,
//                lat: 30.074781,
//                lng: 31.302321,
//            });
//            map.addControl({
//                position: 'top_right',
//                content: 'Geolocate',
//                style: {
//                    margin: '5px',
//                    padding: '1px 6px',
//                    border: 'solid 1px #717B87',
//                    background: '#fff'
//                },
//                events: {
//                    click: function () {
//                        GMaps.geolocate({
//                            success: function (position) {
//                                map.setCenter(position.coords.latitude, position.coords.longitude);
//                            },
//                            error: function (error) {
//                                alert('Geolocation failed: ' + error.message);
//                            },
//                            not_supported: function () {
//                                alert("Your browser does not support geolocation");
//                            }
//                        });
//                    }
//                }
//            });
//            map = new GMaps({
//                el: '#map',
//                lat: 30.074781,
//                lng: 31.302321,
//                zoom: 16,
//                click: function (e) {
//                    alert('click');
//                },
//            });
//
//            map.drawOverlay({
//                lat: map.getCenter().lat(),
//                lng: map.getCenter().lng(),
//                layer: 'overlayLayer',
//                content: '<div class="overlay">فندق الحرم المكى<div class="overlay_arrow above"></div></div>',
//                verticalAlign: 'middle',
//                horizontalAlign: 'center'
//            });
//            map.addControl({
//                lat: map.getCenter().lat(),
//                lng: map.getCenter().lng(),
//                position: 'top_right',
//                content: 'Geolocate',
//                style: {
//                    margin: '5px',
//                    padding: '1px 6px',
//                    border: 'solid 1px #717B87',
//                    background: '#fff'
//                },
//                events: {
//                    click: function () {
//                        alert('here');
//                    }
//                }
//            });
//            $('.nav-tabs').on('shown.bs.tab', function () {
//                map.refresh();
//            });
        }

        var resizeMap = function () {
            if (typeof map == "undefined")
                return;
            setTimeout(function () {
                resizingMap();
            }, 400);
        }

        var resizingMap = function () {
            if (typeof map == "undefined")
                return;
//            var center = map.getCenter();
//            google.maps.event.trigger(map, "resize");
            GMaps.geolocate({
                success: function (position) {
                    map.setCenter(position.coords.latitude, position.coords.longitude);
                },
                error: function (error) {
                    alert('Geolocation failed: ' + error.message);
                },
                not_supported: function () {
                    alert("Your browser does not support geolocation");
                },
                always: function () {
                    alert("Done!");
                }
            });
            //map.setCenter(map.getCenter().lat(), map.getCenter().lng());
        }
        var checkLogin = function () {

            var action = config.base_url + '/home/checkLoginForAjax';
            $.ajax({
                url: action,
                async: false,
                data: {
                    program_id: $('#program_id').val()
                },
                success: function (data) {
                    console.log(data);
                    //return false;
                    if (data.type == 'success') {


                        is_logged = true;
                    } else {
                        $('#login-modal').modal('show');
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


        }

        return {
            init: function () {
                init();
            },
            goToPricesAndBookingSection: function () {
                var details_box_offset_top = $('.package-complete-detail').offset().top;
                $("html, body").animate({scrollTop: details_box_offset_top}, 1000, function () {
                    $('#prices_and_booking').trigger('click');

                });
                //alert(t.top);
            },
            goToBookingPage: function () {
                //alert('here');
                var program_id = $('#program_id').val();
                var program_trip_rates_id = $('#program_trip_rates_id').val();
                window.location.href = config.site_url + 'booking/' + program_id + '/' + program_trip_rates_id;
            }
        }

    }();

    jQuery(document).ready(function () {
        program_details.init();
    });



