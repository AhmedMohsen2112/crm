<?php
// ----------------------------------------------------------------------
// Copyright (C) 2007 by Khaled Al-Shamaa.
// http://www.al-shamaa.com/
// ----------------------------------------------------------------------
// LICENSE
//
// This program is open source product; you can redistribute it and/or
// modify it under the terms of the GNU General Public License (GPL)
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// To read the license please visit http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------
// Class Name: Spell numbers in the Arabic idiom
// Filename:   ArNumbers.class.php
// Original    Author(s): Khaled Al-Sham'aa <khaled.alshamaa@gmail.com>
// Purpose:    Spell numbers in the Arabic idiom
// ----------------------------------------------------------------------

class ArNumbers {

     var $individual = array();
     var $feminine = 1;
     var $format = 1;

     function ArNumbers(){
        $this->individual[1][1] = 'واحد';
        $this->individual[1][2] = 'واحدة';

        $this->individual[2][1][1] = 'إثنان';
        $this->individual[2][1][2] = 'إثنين';
        $this->individual[2][2][1] = 'إثنتان';
        $this->individual[2][2][2] = 'إثنتين';

        $this->individual[3][1]  = 'ثلاثة';
        $this->individual[4][1]  = 'اربعة';
        $this->individual[5][1]  = 'خمسة';
        $this->individual[6][1]  = 'ست';
        $this->individual[7][1]  = 'سبعة';
        $this->individual[8][1]  = 'ثماني';
        $this->individual[9][1]  = 'تسعة';
        $this->individual[10][1] = 'عشر';
        $this->individual[3][2]  = 'ثلاثة';
        $this->individual[4][2]  = 'أربعة';
        $this->individual[5][2]  = 'خمسة';
        $this->individual[6][2]  = 'ستة';
        $this->individual[7][2]  = 'سبعة';
        $this->individual[8][2]  = 'ثمانية';
        $this->individual[9][2]  = 'تسعة';
        $this->individual[10][2] = 'عشرة';

        $this->individual[11][1] = 'أحد عشر';
        $this->individual[11][2] = 'إحدى عشرة';

        $this->individual[12][1][1] = 'إثنا عشر';
        $this->individual[12][1][2] = 'إثني عشر';
        $this->individual[12][2][1] = 'إثنتا عشرة';
        $this->individual[12][2][2] = 'إثنتي عشرة';

        $this->individual[13][1]  = 'ثلاثة عشرة';
        $this->individual[14][1]  = 'اربعة عشرة';
        $this->individual[15][1]  = 'خمسة عشرة';
        $this->individual[16][1]  = 'ست عشرة';
        $this->individual[17][1]  = 'سبعة عشرة';
        $this->individual[18][1]  = 'ثمانية عشرة';
        $this->individual[19][1]  = 'تسعة عشرة';
        $this->individual[13][2]  = 'ثلاثة عشر';
        $this->individual[14][2]  = 'أربعة عشر';
        $this->individual[15][2]  = 'خمسة عشر';
        $this->individual[16][2]  = 'ستة عشر';
        $this->individual[17][2]  = 'سبعة عشر';
        $this->individual[18][2]  = 'ثمانية عشر';
        $this->individual[19][2]  = 'تسعة عشر';

        $this->individual[20][1] = 'عشرون';
        $this->individual[30][1] = 'ثلاثون';
        $this->individual[40][1] = 'أربعون';
        $this->individual[50][1] = 'خمسون';
        $this->individual[60][1] = 'ستون';
        $this->individual[70][1] = 'سبعون';
        $this->individual[80][1] = 'ثمانون';
        $this->individual[90][1] = 'تسعون';
        $this->individual[20][2] = 'عشرين';
        $this->individual[30][2] = 'ثلاثين';
        $this->individual[40][2] = 'أربعين';
        $this->individual[50][2] = 'خمسين';
        $this->individual[60][2] = 'ستين';
        $this->individual[70][2] = 'سبعين';
        $this->individual[80][2] = 'ثمانين';
        $this->individual[90][2] = 'تسعين';

        $this->individual[200][1] = 'مئتان';
        $this->individual[200][2] = 'مئتين';

        $this->individual[100] = 'مئة';
        $this->individual[300] = 'ثلاثمئة';
        $this->individual[400] = 'أربعمئة';
        $this->individual[500] = 'خمسمئة';
        $this->individual[600] = 'ستمئة';
        $this->individual[700] = 'سبعمئة';
        $this->individual[800] = 'ثمانمئة';
        $this->individual[900] = 'تسعمئة';

        $this->complications[1][1] = 'ألفان';
        $this->complications[1][2] = 'ألفين';
        $this->complications[1][3] = 'آلاف';
        $this->complications[1][4] = 'ألف';

        $this->complications[2][1] = 'مليونان';
        $this->complications[2][2] = 'مليونين';
        $this->complications[2][3] = 'ملايين';
        $this->complications[2][4] = 'مليون';

        $this->complications[3][1] = 'ملياران';
        $this->complications[3][2] = 'مليارين';
        $this->complications[3][3] = 'مليارات';
        $this->complications[3][4] = 'مليار';
     }

      function setFeminine($value){
          $this->feminine = $value;
      }

      function setFormat($value){
          $this->format = $value;
      }

      function getFeminine(){
          return $this->feminine;
      }

      function getFormat(){
          return $this->format;
      }

      function int2str($number){
          $blocks = array();
          $items  = array();
          $string = '';

          while(strlen($number) > 3){
              array_push($blocks, substr($number, -3));
              $number = substr($number, 0, strlen($number)-3);
          }
          array_push($blocks, $number);

          $blocks_num = count($blocks);

          for($i=$blocks_num; $i>=0; $i--){
              $number = $blocks[$i];
              $text = $this->written_block($number);
              if($text){
                 if($number == 1 && $i != 0){
                    $text = $this->complications[$i][4];
                 }elseif($number == 2 && $i != 0){
                    $text = $this->complications[$i][$this->format];
                 }elseif($number > 2 && $number < 11){
                    $text .= ' '.$this->complications[$i][3];
                 }else{
                    $text .= ' '.$this->complications[$i][4];
                 }
                 array_push($items, $text);
              }
          }

          $string = implode(' و ', $items);

          return $string;
      }

      function written_block($number){
          $items    = array();
          $string   = '';

          if($number > 99){
             $hundred = floor($number / 100) * 100;
             $number  = $number % 100;

             if($hundred == 200){
                array_push($items, $this->individual[$hundred][$this->format]);
             }else{
                array_push($items, $this->individual[$hundred]);
             }
          }

          if($number == 2 || $number == 12) {
             array_push($items, $this->individual[$number][$this->feminine][$this->format]);
          }elseif($number < 20) {
             array_push($items, $this->individual[$number][$this->feminine]);
          }else{
             $ones = $number % 10;
             $tens = floor($number / 10) * 10;

             if($ones == 2){
                array_push($items, $this->individual[$ones][$this->feminine][$this->format]);
             }elseif($ones > 0){
                array_push($items, $this->individual[$ones][$this->feminine]);
             }

             array_push($items, $this->individual[$tens][$this->format]);
          }

          $items = array_diff($items, array(''));

          $string = implode(' و ', $items);

          return $string  ;
      }

}
?>
