<?php

    class Plan_your_trip extends MY_Controller{

        private $booking_price = 0;

        public function __construct(){

            parent::__construct();
            $this->load->model('Countries_model', 'countries');
            $this->load->model('Hotel_room_types_model', 'hotel_room_types');
            $this->load->model('Maka_madina_hotels_rooms_prices_dates_model', 'maka_madina_hotels_rooms_prices_dates');
            $this->load->model('Front_maka_madina_hotels_model', 'front_maka_madina_hotels');
            $this->load->model('Front_plan_your_trip_model', 'front_plan_your_trip');
            $this->load->model('Front_plan_your_trip_reservation_model', 'front_plan_your_trip_reservation');
            $this->load->model('Front_plan_your_trip_flight_bookings_model', 'front_plan_your_trip_flight_bookings');
            $this->load->model('Front_plan_your_trip_maka_madina_hotels_model', 'front_plan_your_trip_maka_madina_hotels');
            $this->load->model('Front_plan_your_trip_maka_madina_hotels_rooms_model', 'front_plan_your_trip_maka_madina_hotels_rooms');
            $this->load->model('Front_plan_your_trip_travellers_model', 'front_plan_your_trip_travellers');
            $this->load->model('Plan_your_trip_payment_data_model', 'plan_your_trip_payment_data');
        }

        public function index(){
            $egypt = $this->countries->findByCol('code', $this->settings->egy_code);
            $usa = $this->countries->findByCol('code', $this->settings->usa_code);
            $this->data['egy_cities'] = $this->countries->get(array('parent_id' => $egypt->id));
            $this->data['usa_cities'] = $this->countries->get(array('parent_id' => $usa->id));
            $this->data['hotel_room_types'] = $this->hotel_room_types->get();
            $this->data['maka_hotels'] = $this->front_maka_madina_hotels->hotelsThatHavePrices(array('maka_madina_hotels.maka_or_madina_or_gada' => 1));
            $this->data['madina_hotels'] = $this->front_maka_madina_hotels->hotelsThatHavePrices(array('maka_madina_hotels.maka_or_madina_or_gada' => 2));
            $this->data['gada_hotels'] = $this->front_maka_madina_hotels->hotelsThatHavePrices(array('maka_madina_hotels.maka_or_madina_or_gada' => 3));
            $main_content = 'plan_your_trip/index';
            $this->_view($main_content);
        }

        public function handleFlightsBookings(){
            //pri($_POST);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('going_from', _lang('going_from'), 'required');
            $this->form_validation->set_rules('going_to', _lang('going_to'), 'required');
            $this->form_validation->set_rules('going_date', _lang('going_date'), 'required');
            $this->form_validation->set_rules('return_from', _lang('return_from'), 'required');
            $this->form_validation->set_rules('return_to', _lang('return_to'), 'required');
            $this->form_validation->set_rules('return_date', _lang('return_date'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $days = GetDays($_POST['going_date'], $_POST['return_date']);
                array_shift($days);
                $findFlightsBookings = $this->front_plan_your_trip->findFlightsBookings(array(
                    'going_from' => $_POST['going_from'],
                    'going_to' => $_POST['going_to'],
                    'return_from' => $_POST['return_from'],
                    'return_to' => $_POST['return_to'],
                    'going_date' => $_POST['going_date'],
                    'return_date' => $_POST['return_date'],
                ));
                //pri($findFlightsBookings);
                if ($findFlightsBookings) {
                    print_json('success', 'available');
                } else {
                    print_json('error', _lang('not_available'));
                }
            }
        }

        public function handleShowHotelsAccordingToRoomsChoosed(){
            //pri($_POST);
            $rooms_ids = $_POST['rooms_ids'];
            foreach ($rooms_ids as $room_id) {

            }
            $maka_madina_hotels = $this->front_plan_your_trip->getHotelsAccordingToRoomsChoosed($rooms_ids);
            //pri($maka_madina_hotels);
            if ($maka_madina_hotels) {
                print_json('success', $maka_madina_hotels);
            } else {
                print_json('error', _lang('not_available'));
            }
        }

        public function BookNow(){
            //pri($_POST);
            $no_of_adults = $_POST['no_of_adults'];
            $no_of_childs = $_POST['no_of_childs'];
            $no_of_infants = $_POST['no_of_infants'];
            $room_num = $_POST['room_num'];
            $room_childs_num = $_POST['room_childs_num'];
            $flight_bookings_required = $_POST['flight_bookings_required'];
            $maka_hotels_required = $_POST['maka_hotels_required'];
            $madina_hotels_required = $_POST['madina_hotels_required'];
            $gada_hotels_required = $_POST['gada_hotels_required'];
            $visa_required = $_POST['visa_required'];
            $transportation = $_POST['transportation'];
            if ($no_of_childs > 0) {
                $birthdate_childs = $_POST['birthdate_childs'];
            } else {
                $birthdate_childs = array();
            }
            /* start add to plan_your_trip_reservations */
            $plan_your_trip_reservation_data['name'] = $_POST['name'];
            $plan_your_trip_reservation_data['phone_1'] = $_POST['phone_1'];
            $plan_your_trip_reservation_data['phone_2'] = $_POST['phone_2'];
            $plan_your_trip_reservation_data['email'] = $_POST['email'];
            $plan_your_trip_reservation_data['birthdate'] = $_POST['birthdate'];
            $plan_your_trip_reservation_data['no_of_adults'] = $no_of_adults;
            $plan_your_trip_reservation_data['no_of_childs'] = $no_of_childs;
            $plan_your_trip_reservation_data['no_of_infants'] = $no_of_infants;
            $plan_your_trip_reservation_data['visa_required'] = $visa_required;
            $plan_your_trip_reservation_id = $this->front_plan_your_trip_reservation->add($plan_your_trip_reservation_data);
            /* end */
            $flight_booking_adult_price = 0;
            $flight_booking_child_price = 0;
            $flight_booking_infant_price = 0;
            if ($flight_bookings_required == 1) {
                $going_from = $_POST['going_from'];
                $going_to = $_POST['going_to'];
                $going_date = $_POST['going_date'];
                $return_from = $_POST['return_from'];
                $return_to = $_POST['return_to'];
                $return_date = $_POST['return_date'];
                $flight_dates = GetDays($_POST['going_date'], $_POST['return_date']);
                array_shift($flight_dates);
                $findFlightsBookings = $this->front_plan_your_trip->findFlightsBookings(array(
                    'going_from' => $going_from,
                    'going_to' => $going_to,
                    'return_from' => $return_from,
                    'return_to' => $return_to,
                    'going_date' => $going_date,
                ));
                $findFlightsBookingsPrice = $this->front_plan_your_trip->findFlightsBookingsPrice($findFlightsBookings->id, $_POST['going_date']);
                $amount_le = $findFlightsBookings->amount_le;
                $cost = $findFlightsBookingsPrice->cost;
                $profit = $findFlightsBookingsPrice->profit;
                $total = $cost + $profit;
                $flight_booking_adult_price = $total * $amount_le;

                if ($no_of_childs > 0) {
                    $child_price_object = json_decode($findFlightsBookings->child_price);
                    $cost = $child_price_object->cost;
                    $profit = $child_price_object->profit;
                    $total = $cost + $profit;
                    $flight_booking_child_price = $total * $amount_le;
                    //pri($childs_price);
                }
                if ($no_of_infants > 0) {
                    $infant_price_object = json_decode($findFlightsBookings->infant_price);
                    $cost = $infant_price_object->cost;
                    $profit = $infant_price_object->profit;
                    $total = $cost + $profit;
                    $flight_booking_infant_price = $total * $amount_le;
                }
                /* start add to plan_your_trip_flight_bookings */
                $plan_your_trip_reservation_flight_bookings_date['plan_your_trip_reservation_id'] = $plan_your_trip_reservation_id;
                $plan_your_trip_reservation_flight_bookings_date['flight_bookings_id'] = $findFlightsBookings->id;
                $plan_your_trip_reservation_flight_bookings_date['going_from'] = $going_from;
                $plan_your_trip_reservation_flight_bookings_date['going_to'] = $going_to;
                $plan_your_trip_reservation_flight_bookings_date['return_from'] = $return_from;
                $plan_your_trip_reservation_flight_bookings_date['return_to'] = $return_to;
                $plan_your_trip_reservation_flight_bookings_date['going_date'] = $going_date;
                $plan_your_trip_reservation_flight_bookings_date['return_date'] = $return_date;
                $plan_your_trip_reservation_flight_bookings_date['adult_price'] = $flight_booking_adult_price;
                $plan_your_trip_reservation_flight_bookings_date['child_price'] = $flight_booking_child_price;
                $plan_your_trip_reservation_flight_bookings_date['infant_price'] = $flight_booking_infant_price;
                $plan_your_trip_flight_bookings_id = $this->front_plan_your_trip_flight_bookings->add($plan_your_trip_reservation_flight_bookings_date);
                /* end */
            }
            $flight_bookings_prices = array(
                'adult_price' => $flight_booking_adult_price,
                'child_price' => $flight_booking_child_price,
                'infant_price' => $flight_booking_infant_price,
            );
            if ($maka_hotels_required == 0 && $madina_hotels_required == 0 && $gada_hotels_required == 0) {
                $adult_price = $flight_bookings_prices['adult_price'] * $no_of_adults;
                $child_price = $flight_bookings_prices['child_price'] * $no_of_childs;
                $infant_price = $flight_bookings_prices['infant_price'] * $no_of_infants;
                if ($visa_required == 0) {
                    $adult_price += $this->visa_price * $no_of_adults;
                    $child_price += $this->visa_price * $no_of_childs;
                    $infant_price += $this->visa_price * $no_of_infants;
                }
                $this->booking_price = $adult_price + $child_price + $infant_price;
            }
            if ($maka_hotels_required == 1) {
                $maka_hotels_id = $_POST['maka_hotels_id'];
                $maka_check_in_date = $_POST['maka_check_in_date'];
                $maka_check_out_date = $_POST['maka_check_out_date'];
                $maka_no_of_nights = $_POST['maka_no_of_nights'];
                $maka_dates = GetDays($_POST['maka_check_in_date'], $_POST['maka_check_out_date']);
                array_pop($maka_dates);
                $this->handle($flight_bookings_prices, $maka_hotels_id, $maka_check_in_date, $maka_check_out_date, $maka_no_of_nights, $room_num, $room_childs_num, $no_of_childs, $birthdate_childs, $plan_your_trip_reservation_id);
                //pri($maka_rates_array);
            }
            if ($madina_hotels_required == 1) {
                //pri('madina');
                $madina_hotels_id = $_POST['madina_hotels_id'];
                $madina_check_in_date = $_POST['madina_check_in_date'];
                $madina_check_out_date = $_POST['madina_check_out_date'];
                $madina_no_of_nights = $_POST['madina_no_of_nights'];
                $this->handle($flight_bookings_prices, $madina_hotels_id, $madina_check_in_date, $madina_check_out_date, $madina_no_of_nights, $room_num, $room_childs_num, $no_of_childs, $birthdate_childs, $plan_your_trip_reservation_id);
            }
            if ($gada_hotels_required == 1) {
                $gada_hotels_id = $_POST['gada_hotels_id'];
                $gada_check_in_date = $_POST['gada_check_in_date'];
                $gada_check_out_date = $_POST['gada_check_out_date'];
                $gada_no_of_nights = $_POST['gada_no_of_nights'];
                $this->handle($flight_bookings_prices, $gada_hotels_id, $gada_check_in_date, $gada_check_out_date, $gada_no_of_nights, $room_num, $room_childs_num, $no_of_childs, $birthdate_childs, $plan_your_trip_reservation_id);
            }

            /* start add travellers */
            $travellers_names_adult = (!empty($_POST['travellers_names_adult'])) ? $_POST['travellers_names_adult'] : array();
            $travellers_names_childs = (!empty($_POST['travellers_names_childs'])) ? $_POST['travellers_names_childs'] : array();
            $travellers_names_infant = (!empty($_POST['travellers_names_infant'])) ? $_POST['travellers_names_infant'] : array();
            $travellers_gender_adult = (!empty($_POST['travellers_gender_adult'])) ? $_POST['travellers_gender_adult'] : array();
            $travellers_gender_childs = (!empty($_POST['travellers_gender_childs'])) ? $_POST['travellers_gender_childs'] : array();
            $travellers_gender_infant = (!empty($_POST['travellers_gender_infant'])) ? $_POST['travellers_gender_infant'] : array();
            $travellers_birthdates_adult = (!empty($_POST['birthdate_adult'])) ? $_POST['birthdate_adult'] : array();
            $travellers_birthdates_childs = (!empty($_POST['birthdate_childs'])) ? $_POST['birthdate_childs'] : array();
            $travellers_birthdates_infant = (!empty($_POST['birthdate_infant'])) ? $_POST['birthdate_infant'] : array();
            $travellers_names = array_merge($travellers_names_adult, $travellers_names_childs, $travellers_names_infant);
            $travellers_gender = array_merge($travellers_gender_adult, $travellers_gender_childs, $travellers_gender_infant);
            $travellers_birthdates = array_merge($travellers_birthdates_adult, $travellers_birthdates_childs, $travellers_birthdates_infant);
            foreach ($travellers_names as $key => $value) {
                $plan_your_trip_travellers_data['plan_your_trip_reservation_id'] = $plan_your_trip_reservation_id;
                $plan_your_trip_travellers_data['name'] = $value;
                $plan_your_trip_travellers_data['gender'] = $travellers_gender[$key];
                $plan_your_trip_travellers_data['birthdate'] = $travellers_birthdates[$key];
                $this->front_plan_your_trip_travellers->add($plan_your_trip_travellers_data);
            }
            /* end */
            $this->front_plan_your_trip_reservation->update(array('reservation_price' => $this->booking_price), array('id' => $plan_your_trip_reservation_id));
            print_json('success', array(
                'booking_price' => $this->booking_price,
                'plan_your_trip_reservation_id' => $plan_your_trip_reservation_id
            ));
        }

        public function handle($flight_bookings_prices, $hotel_id, $check_in, $check_out, $no_of_nights, $room_num, $room_childs_num, $no_of_childs, $birthdate_childs, $plan_your_trip_reservation_id){
            $plan_your_trip_reservation = $this->front_plan_your_trip_reservation->find($plan_your_trip_reservation_id);
            $flight_booking_adult_price = $flight_bookings_prices['adult_price'];
            $flight_booking_child_price = $flight_bookings_prices['child_price'];
            $flight_booking_infant_price = $flight_bookings_prices['infant_price'];
            $plan_your_trip_maka_madina_hotels_id = $this->front_plan_your_trip_maka_madina_hotels->add(array(
                'plan_your_trip_reservation_id' => $plan_your_trip_reservation_id,
                'maka_madina_hotels_id' => $hotel_id,
                'check_in' => $check_in,
                'check_out' => $check_out,
                'no_of_nights' => $no_of_nights,
            ));
            $dates = GetDays($check_in, $check_out);
            array_pop($dates);
            foreach ($room_num as $key => $value) {
                $num = $value;
                $room_id = $key;
                $room = $this->hotel_room_types->find($room_id);
                if ($num == 0) {
                    continue;
                }
                $childs_num_in_room = $room_childs_num[$room_id];
                $adults_price = 0;
                $childs_price = 0;
                foreach ($dates as $date) {
                    $maka_madina_hotels_rooms_prices = $this->front_plan_your_trip->findMakaORMadinaOrGadaRoomsPricesId($hotel_id, $room_id, $date);
//                    $this->maka_madina_hotels_rooms_prices_dates->update(array(), array(
//                        'maka_madina_hotels_rooms_prices' => $maka_madina_hotels_rooms_prices,
//                        'hotel_room_types_id' => $room_id,
//                        'date' => $date,
//                    ));
                    $room_price = $this->front_plan_your_trip->findRoomPrice($maka_madina_hotels_rooms_prices->id, $date);
                    $child_price_object = json_decode($maka_madina_hotels_rooms_prices->childs_price);
                    //pri($maka_madina_hotels_rooms_prices->id);
                    //pri($child_price_object);
                    $amount_le = $room_price->amount_le;
                    $cost = $room_price->cost;
                    $profit = $room_price->profit;
                    $total = ($cost + $profit);
                    $adults_price += ($total * $amount_le);   //room price in date
                    //$this->booking_price+=$adults_price;
                    //pri($birthdate_childs[0]);
                    if ($childs_num_in_room > 0) {
                        $count = 1;
                        for ($x = 0; $x < $childs_num_in_room; $x++) {
                            $child_age = (int) get_age(date('Y-m-d'), $birthdate_childs[$x]);
                            if ($child_age > 6) {
                                $child_number = 'child-' . $count;
                                $child_age = '6-12';
                                $child_price = $child_price_object->{$child_number};
                                $child_price = $child_price->{$child_age};
                                //pri($child_price);
                                $cost = $child_price->cost;
                                $profit = $child_price->profit;
                                $total = $cost + $profit;
                                //pri($child_price_in_one_room);
                                $childs_price += ($total * $amount_le);
                            } else {
                                $child_number = 'child-' . $count;
                                $child_age = '2-6';
                                $child_price = $child_price_object->{$child_number};
                                $child_price = $child_price->{$child_age};
                                $cost = $child_price->cost;
                                $profit = $child_price->profit;
                                $total = $cost + $profit;
                                //pri($total);
                                $childs_price += ($total * $amount_le);
                            }
                            //pri($childs_price);
                            //$this->booking_price+=$childs_price;
                            $count++;
                        }
                    }
                }

                $this->front_plan_your_trip_maka_madina_hotels_rooms->add(array(
                    'plan_your_trip_maka_madina_hotels_id' => $plan_your_trip_maka_madina_hotels_id,
                    'hotel_room_types_id' => $room_id,
                    'no_of_room' => $num,
                    'adults_price' => $adults_price,
                    'childs_price' => $childs_price,
                    'no_of_childs_in_room' => $childs_num_in_room,
                    'room_price' => ($adults_price + $childs_price) * $num,
                ));

                /* calculate price */
                $adult_price = $adults_price + ($flight_booking_adult_price * $room->max_adults) * $num;
                $child_price = $childs_price + ($flight_booking_child_price * $childs_num_in_room ) * $num;
                if ($plan_your_trip_reservation->visa_required == 1) {
                    $adult_price+=$room->max_adults * $this->visa_price;
                    $child_price+=$childs_num_in_room * $this->visa_price;
                }

                $this->booking_price+=$adult_price + $child_price;
                /**/
            }
            $infant_price = ($flight_booking_infant_price * $plan_your_trip_reservation->no_of_infants );
            if ($plan_your_trip_reservation->visa_required == 1) {
                $infant_price+=$plan_your_trip_reservation->no_of_infants * $this->visa_price;
            }
            $this->booking_price+=$infant_price;
        }

        public function print_report(){
            $plan_your_trip_reservation_id = $_POST['plan_your_trip_reservation_id'];
            //$plan_your_trip_reservation_id = $id;
            $plan_your_trip_reservation = $this->front_plan_your_trip_reservation->find($plan_your_trip_reservation_id);
            if (!$plan_your_trip_reservation) {
                err_404();
            }
            /* find plan your trip flight bookings */
            $plan_your_trip_flight_bookings = $this->front_plan_your_trip_flight_bookings->getPlanYourTripFlightBookings($plan_your_trip_reservation_id);
            $plan_your_trip_flight_maka_madina_hotels = $this->front_plan_your_trip_maka_madina_hotels->getPlanYourTripMakaMadinaHotels($plan_your_trip_reservation_id);
            $plan_your_trip_reservation_travellers = $this->front_plan_your_trip_travellers->get(array('plan_your_trip_reservation_id' => $plan_your_trip_reservation_id));
            $plan_your_trip_flight_maka_madina_hotels_rooms = $this->front_plan_your_trip_maka_madina_hotels_rooms->getPlanYourTripMakaMadinaHotelsRooms($plan_your_trip_reservation_id);

            $this->data['plan_your_trip_reservation'] = $plan_your_trip_reservation;
            $this->data['plan_your_trip_flight_bookings'] = $plan_your_trip_flight_bookings;
            $this->data['plan_your_trip_flight_maka_madina_hotels'] = $plan_your_trip_flight_maka_madina_hotels;
            $this->data['plan_your_trip_flight_maka_madina_hotels_rooms'] = $plan_your_trip_flight_maka_madina_hotels_rooms;
            $this->data['plan_your_trip_reservation_travellers'] = $plan_your_trip_reservation_travellers;
            $report = $this->load->view('main_content/plan_your_trip/print', $this->data, true);
            echo $report;
        }

        public function hotelsCheck(){
            //pri($_POST);
            $hotel_id = $_POST['hotel_id'];
            $room_num = $_POST['room_num'];
            $dates = GetDays($_POST['check_in_date'], $_POST['check_out_date']);
            array_pop($dates);
            //pri(count($dates));
            $rooms_ids_errors = array();
            foreach ($room_num as $key => $value) {
                $num = $value;
                $room_id = $key;
                if ($num == 0) {
                    continue;
                }
                $errors = 0;
                foreach ($dates as $date) {
                    $maka_madina_hotels_rooms_prices = $this->front_plan_your_trip->findMakaORMadinaOrGadaRoomsPricesId($hotel_id, $room_id, $date);
                    if (!$maka_madina_hotels_rooms_prices) {
                        $errors++;
                    }
                }
                if ($errors > 0) {
                    $rooms_ids_errors[] = $this->hotel_room_types->find($room_id);
                }
            }
            if (!empty($rooms_ids_errors)) {
                print_json('error', $rooms_ids_errors);
            } else {
                $nights = count($dates);
                print_json('success', $nights);
            }
        }

        public function addPaymentDataToReservation(){
            //pri($_POST);
            $pay_ways_value = xss_clean($_POST['pay_ways_value']);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('pay_ways_value', _lang('pay_ways_value'), 'required');
            if ($pay_ways_value == 'home') {
                $this->form_validation->set_rules('home_phone', _lang('home_phone'), 'required');
                $this->form_validation->set_rules('home_date_of_collection', _lang('date_of_collection'), 'required');
                $this->form_validation->set_rules('home_address', _lang('home_address'), 'required');
            }
            if ($pay_ways_value == 'work') {
                $this->form_validation->set_rules('work_phone', _lang('work_phone'), 'required');
                $this->form_validation->set_rules('work_date_of_collection', _lang('date_of_collection'), 'required');
                $this->form_validation->set_rules('work_address', _lang('home_address'), 'required');
            }

            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {

                $data['plan_your_trip_reservation_id'] = xss_clean($_POST['plan_your_trip_reservation_id']);
                $data['pay_ways_value'] = xss_clean($_POST['pay_ways_value']);
                if ($pay_ways_value == 'home') {
                    $data['home_phone'] = xss_clean($_POST['home_phone']);
                    $data['home_date_of_collection'] = xss_clean($_POST['home_date_of_collection']);
                    $data['home_address'] = xss_clean($_POST['home_address']);
                }
                if ($pay_ways_value == 'work') {
                    $data['work_phone'] = xss_clean($_POST['work_phone']);
                    $data['work_date_of_collection'] = xss_clean($_POST['work_date_of_collection']);
                    $data['work_address'] = xss_clean($_POST['work_address']);
                }
                $add = $this->plan_your_trip_payment_data->add($data);
                if ($add) {
                    $message = '<p class="text-center">';
                    $message .= _lang('thank_you_for_joining_the_national_egypt_tourism_family');
                    $message .= '<br>';
                    $message .= _lang('we_know_what_you_deserve');
                    $message .= '<br>';
                    $message .= _lang('the_customer_service_team_will_communicate_with_you_within_48_hours');
                    $message .= '</p>';
                    print_json('success', $message);
                } else {
                    print_json('error', _lang('error'));
                }
            }
        }

    }
