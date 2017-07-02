<?php

if (!function_exists('_lang')) {

    function _lang($item) {
        $IM = & get_instance();
        $line = $IM->lang->line($item);
        $line = $line ? $line : str_replace('_', ' ', ucwords($item));
        return $line;
    }

}
if (!function_exists('_lang')) {

    //if $item is array
    function __lang($item, $var = false, $var2 = false) {
        $IM = & get_instance();
        $line = $IM->lang->line($item);
        if (is_array($line) && $var) {
            if (is_array($line[$var]))
                return $line[$var];
        }
        return $line;
//        if( $var && is_array($line)) return (
//            $var2 && is_array($line[$var]) ?
//                isset($line[$var][$var2]) ? $line[$var][$var2] : "" :
//                $line[$var]
//        );
        return $line;
    }

}

if (!function_exists('print_json')) {

    function print_json($type = 'success', $data = NULL, $http_code = 200, $exit = true) {
        $json = array();
        $json['type'] = $type;
        if ($type == 'error' && is_array($data) && !empty($data)) {
            
            $json['errors'] = $data;
        } else if ($type == 'success' && is_array($data)&& !empty($data))
            $json['data'] = $data;
        else {
            $json['message'] = $data;
        }
        $http_code = (int) $http_code;
        header('Content-Type: application/json; charset=utf-8');
        set_status_header($http_code);

        echo json_encode($json);
        if ($exit)
            exit;
    }

}
if (!function_exists('print_json2')) {

    function print_json2($type = 'success', $data = "", $exit = true) {
        $json = array();
        $json['type'] = $type;
        if ($type == 'error' && is_array($data)) {
            $json['errors'] = $data;
        } else if ($type == 'success' && is_array($data))
            $json['data'] = $data;
        else {
            $json['message'] = $data;
        }
        header('Content-Type: application/json');
        echo json_encode($json);
        if ($exit)
            exit;
    }

}
if (!function_exists('img_descoder')) {

    function img_descoder($encoded_string, $path) {
        $image_name = time().uniqid(rand()).'.jpg';
        $new_path = FCPATH . 'uploads' . DIRECTORY_SEPARATOR .$path . DIRECTORY_SEPARATOR . $image_name;
        $decoded_string = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $encoded_string));
        $file=  fopen($new_path, 'wb');
        $is_writen=  fwrite($file, $decoded_string);
        fclose($file);
        if($is_writen > 0){
         return $image_name;
        }
       
    }

}

if (!function_exists('pri')) {

    function pri($mixed, $exit = true) {
        echo "<pre>" . print_r($mixed) . "</pre>";
        if ($exit)
            exit;
    }

}

if (!function_exists('ArabicDate')) {

    function arabicDate($date, $get_all_date = false) {
        $months = array("Jan" => "يناير", "Feb" => "فبراير", "Mar" => "مارس", "Apr" => "أبريل", "May" => "مايو", "Jun" => "يونيو", "Jul" => "يوليو", "Aug" => "أغسطس", "Sep" => "سبتمبر", "Oct" => "أكتوبر", "Nov" => "نوفمبر", "Dec" => "ديسمبر");
        $your_date = $date; // The Current Date
        $en_month = date("M", strtotime($your_date));
        foreach ($months as $en => $ar) {
            if ($en == $en_month) {
                $ar_month = $ar;
            }
        }

        $find = array("Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri");
        $replace = array("السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة");
        $ar_day_format = date('D', strtotime($your_date)); // The Current Day
        $ar_day = str_replace($find, $replace, $ar_day_format);

        $standard = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
        $eastern_arabic_symbols = array("٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩");
        //$current_date = $ar_day . ' ' . date('d', strtotime($your_date)) . ' - ' . $ar_month . ' - ' . date('Y');
        //$current_date = $ar_day . ' ' . date('d', strtotime($your_date)) . ' ' . $ar_month;
        if ($get_all_date) {
            $current_date = $ar_day . ' ' . date('d', strtotime($your_date)) . ' - ' . $ar_month . ' - ' . date('Y');
        } else {
            $current_date = date('d', strtotime($your_date)) . ' ' . $ar_month;
        }

        $arabic_date = str_replace($standard, $eastern_arabic_symbols, $current_date);

        return $arabic_date;
    }

}
if (!function_exists('img_resize')) {

    function img_resize($file_name, $path) {
        $file_path = $path;
        $percent = 0.5;
        // Content type
        header('Content-Type: image/jpeg');

        // Get new sizes
        list($width, $height) = getimagesize($file_path);
        $newwidth = $width * $percent;
        $newheight = $height * $percent;

        // create black image with width and hieght that i want to be in my image
        $ext = end(explode('.', $file_name));
        if (strtolower($ext) == "jpg")
            $source = imagecreatefromjpeg($img);
        elseif (strtolower($ext) == "gif")
            $source = imagecreatefromgif($img);
        elseif (strtolower($ext) == "png")
            $source = imagecreatefrompng($img);
        elseif (strtolower($ext) == "bmp")
            $source = imagecreatefromwbmp($img);
        $destination = imagecreatetruecolor($newwidth, $newheight);


        // Resize
        ImageCopyResampled($destination, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        // Output
        imagejpeg($thumb);
    }

}
if (!function_exists('get_years_days_months_count')) {

    function get_years_days_months_count($date1, $date2) {

        $diff = abs(strtotime($date2) - strtotime($date1));

        $years = floor($diff / (365 * 60 * 60 * 24));
        $months = floor(($diff - $years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24));
        $days = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24) / (60 * 60 * 24));

        printf("%d years, %d months, %d days\n", $years, $months, $days);
    }

}
if (!function_exists('get_age')) {

    function get_age($any_date, $today_date) {
        $date1 = date_create($any_date);
        $date2 = date_create($today_date);
        $diff = date_diff($date1, $date2);
        $years = $diff->format("%Y");
        return $years;
    }

}
if (!function_exists('startsWith')) {

    function startsWith($haystack, $needle) {
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }

}
if (!function_exists('endsWith')) {

    function endsWith($haystack, $needle) {
        $length = strlen($needle);
        if ($length == 0) {
            return true;
        }

        return (substr($haystack, -$length) === $needle);
    }

}
if (!function_exists('GetDays')) {

    function GetDays($startDate, $endDate) {

        $startDate = date("Y-m-d", strtotime($startDate));
        $endDate = date("Y-m-d", strtotime($endDate));

        $Days[] = $startDate;

        $currentDate = $startDate;


        while ($currentDate < $endDate) {

            $currentDate = date("Y-m-d", strtotime("+1 day", strtotime($currentDate)));
            //pri($currentDate);
            //$day_name = date("d", $currentDate);


            $Days[] = $currentDate;
            //$Days[][$day_name] = $currentDate;
        }

        return $Days;
    }

}

if (!function_exists('getDaysDatesAndNames')) {

    function getDaysDatesAndNames($from_date, $to_date) {
        $Days = array();
        $from_date = new \DateTime($from_date);
        $to_date = new \DateTime($to_date);
        $Days[][$from_date->format('l')] = $from_date->format('Y-m-d');
        $diff = $to_date->diff($from_date);
        for ($i = 1; $i <= $diff->days; $i++) {
            $from_date->modify('+1 day');
            $Days[][$from_date->format('l')] = $from_date->format('Y-m-d');
        }
        return $Days;
    }

}
if (!function_exists('sub_pages')) {

    function sub_pages($parent_id) {
        $My = & get_instance();
        $My->db->select('*');
        $My->db->from('pages');
        $My->db->where('active', 1);
        $My->db->where('parent_id', $parent_id);
        $query = $My->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

}
if (!function_exists('main_page_one')) {

    function main_page_one_parent_id($controller_name) {
        $My = & get_instance();
        $My->db->select('*');
        $My->db->from('pages');
        $My->db->where('active', 1);
        $My->db->where('controller', $controller_name);
        $query = $My->db->get();
        if ($query->num_rows() > 0) {
            return $query->row()->parent_id;
        } else {
            return false;
        }
    }

}
if (!function_exists('check_permission')) {

    function check_permission($page, $permission = "open") {
        return get_instance()->permissions->check($page, $permission, true);
    }

}
if (!function_exists('resize')) {

    function resize($path, $width, $height, $save_path, $option = 'auto') {
        $params = array('fileName' => $path);
        get_instance()->load->library('resize', $params);
        get_instance()->resize->resizeImage($width, $height, $option);
        get_instance()->resize->saveImage($save_path);
        return $save_path;
    }

}
if (!function_exists('resize2')) {

    function resize2($paths, $names, $dimensions, $option = 'auto') {
        if (!empty($paths)) {
            //pri($paths);
            foreach ($paths as $key1 => $path) {
                $params = array('fileName' => $path);
                get_instance()->load->library('resize', $params);
                foreach ($dimensions as $key2 => $value) {
                    $width = $value['width'];
                    $height = $value['height'];
                    $image_name = $key2 . '_' . $names[$key1];
                    $save_path = 'uploads/programs_slider/' . $image_name;
                    get_instance()->resize->resizeImage($width, $height, $option);
                    get_instance()->resize->saveImage($save_path);
                }
                get_instance()->resize->clear();
            }
        }

        //return $save_path;
    }

}
if (!function_exists('resize4')) {

    function resize4($path, $new_path, $file, $sizes) {

        get_instance()->load->library('image_lib');
        foreach ($sizes as $key => $size) {
            $config['image_library'] = 'gd2';
            $config['source_image'] = $path;
            $config['create_thumb'] = false;
            $config['maintain_ratio'] = true;
            $config['width'] = $size['width'];
            $config['height'] = $size['height'];
            $config['new_image'] = './uploads/places/' . $key . '_' . $file;

            get_instance()->image_lib->clear();
            get_instance()->image_lib->initialize($config);
            get_instance()->image_lib->resize();
        }
        return $file;
        //return $save_path;
    }

}
if (!function_exists('resize5')) {

    function resize5($uploaded_data, $new_path, $sizes = array(), $return_size_in_name = true) {
        $file_uploaded_name = $uploaded_data['file_name'];
        $file_uploaded_name = str_replace(' ', '-', $file_uploaded_name);
        $file_uploaded_path = $uploaded_data['full_path'];
        $file_name = mt_rand(1, 1000000) . '_' . $file_uploaded_name;
        get_instance()->load->library('image_lib');

        foreach ($sizes as $key => $size) {
            $config['image_library'] = 'gd2';
            $config['source_image'] = $file_uploaded_path;
            $config['create_thumb'] = false;
            $config['maintain_ratio'] = false;
            $config['width'] = $size['width'];
            $config['height'] = $size['height'];
            $config['new_image'] = './' . $new_path . $key . '_' . $file_name;

            get_instance()->image_lib->clear();
            get_instance()->image_lib->initialize($config);
            get_instance()->image_lib->resize();
        }
        //pri($file_name);
        if ($return_size_in_name) {
            return 's_' . $file_name;    //size small
        } else {
            return $file_uploaded_name;    //size small
        }
    }

}
if (!function_exists('resizeOne')) {

    function resizeOne($uploaded_data, $new_path, $sizes = array(), $return_size_in_name = true) {
        $file_uploaded_name = $uploaded_data['file_name'];
        $file_uploaded_name = str_replace(' ', '-', $file_uploaded_name);
        $file_uploaded_path = $uploaded_data['full_path'];
        $file_name = mt_rand(1, 1000000) . '_' . $file_uploaded_name;
        get_instance()->load->library('image_lib');

        foreach ($sizes as $key => $size) {
            $config['image_library'] = 'gd2';
            $config['source_image'] = $file_uploaded_path;
            $config['create_thumb'] = false;
            $config['maintain_ratio'] = true;
            $config['width'] = $size['width'];
            $config['height'] = $size['height'];
            $config['new_image'] = './' . $new_path . $key . '_' . $file_name;

            get_instance()->image_lib->clear();
            get_instance()->image_lib->initialize($config);
            get_instance()->image_lib->resize();
        }

        if ($return_size_in_name) {
            return 's_' . $file_name;    //size small
        } else {
            return $file_name;    //size small
        }
    }

}
if (!function_exists('resize6')) {

    function resize6($uploaded_data, $new_path, $sizes, $size = false) {
        $file_uploaded_name = $uploaded_data['file_name'];
        $file_uploaded_name = str_replace(' ', '-', $file_uploaded_name);
        $file_uploaded_path = $uploaded_data['full_path'];
        $file_name = mt_rand(1, 1000000) . '_' . $file_uploaded_name;
        get_instance()->load->library('image_lib');
        foreach ($sizes as $key => $size) {
            $config['image_library'] = 'gd2';
            $config['source_image'] = $file_uploaded_path;
            $config['create_thumb'] = false;
            $config['maintain_ratio'] = true;
            $config['width'] = $size['width'];
            $config['height'] = $size['height'];
            $config['new_image'] = './' . $new_path . $key . '_' . $file_name;

            get_instance()->image_lib->clear();
            get_instance()->image_lib->initialize($config);
            get_instance()->image_lib->resize();
        }
        return $file_name;
        //return $save_path;
    }

}
if (!function_exists('resize3')) {

    function resize3($path, $file, $sizes) {

        get_instance()->load->library('image_lib');
        foreach ($sizes as $key => $size) {
            $config['image_library'] = 'gd2';
            $config['source_image'] = $path;
            $config['create_thumb'] = false;
            $config['maintain_ratio'] = true;
            $config['width'] = $size['width'];
            $config['height'] = $size['height'];
            $config['new_image'] = './uploads/programs_slider/' . $key . '_' . $file;

            get_instance()->image_lib->clear();
            get_instance()->image_lib->initialize($config);
            get_instance()->image_lib->resize();
        }

        //return $save_path;
    }

}
if (!function_exists('err_404')) {

    function err_404($type = 'front') {
        $CI = & get_instance();
        if ($type == 'front') {
            $CI->load->view('err404');
        } elseif ($type == 'permissions') {
            $CI->load->view('permissions_error');
        }

        echo $CI->output->get_output();
        exit;
    }

}
if (!function_exists('merge')) {

    function merge() {
        $numberOfImages = 3;
        $x = 40;
        $y = 40 * 3;
        $background = imagecreatetruecolor($x, $y * 3);


        $firstUrl = FCPATH . 'img/img_slider01.jpg';

        $secondUrl = FCPATH . 'img/img_slider02.jpg';

        $thirdUrl = FCPATH . 'img/img_slider03.jpg';

        $outputImage = $background;

        $first = imagecreatefromjpeg($firstUrl);
        $second = imagecreatefromjpeg($secondUrl);
        $third = imagecreatefromjpeg($thirdUrl);



        imagecopymerge($outputImage, $first, 0, 0, 0, 0, $x, $y, 100);
        imagecopymerge($outputImage, $second, 0, $y, 0, 0, $x, $y, 100);
        imagecopymerge($outputImage, $third, 0, $y * 2, 0, 0, $x, $y, 100);

        imagejpeg($outputImage, FCPATH . '/uploads/test/test22.jpg');

        imagedestroy($outputImage);
    }

}
if (!function_exists('Rondome')) {

    function Rondome($size) {
        $alpha_key = '';
        $keys = range('A', 'Z');

        for ($i = 0; $i < 2; $i++) {
            $alpha_key .= $keys[array_rand($keys)];
        }

        $length = $size - 2;

        $key = '';
        $keys = range(0, 9);

        for ($i = 0; $i < $length; $i++) {
            $key .= $keys[array_rand($keys)];
        }

        return $alpha_key . $key;
    }

}
if (!function_exists('err_404')) {

    function err_404() {
        $CI = & get_instance();
        $CI->load->view('err404');
        echo $CI->output->get_output();
        exit;
    }

}
