<?php

	/**
	 * Description of Hijri_Date
	 *
	 * @author Abd Elfttah Ahmed <thisphp.com@gmail.com>
	 */
	class Hijri_Date{

		private $_WeekDays = array();
		private $_MonthName = array();

		public function __construct(){
			$this->_WeekDays = array("الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت");
			$this->_MonthName = array("يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر");
			$date = juliantojd('07', '27', '2016');
		}

	}

	class HijriCalendar{
		public function monthName($i){
			static $month = array('محرم	', 'صفر	', 'ربيع الأول	', 'ربيع الآخر	', 'جمادى الأولى	', 'جمادى الآخرة	', 'رجب	', 'شعبان	', 'رمضان	', 'شوال	', 'ذو القعدة	', 'ذو الحجة');
			return $month[$i - 1];
		}

		public function GregorianToHijri($time = null){
			if ($time === null) {
				$time = time();
			}
			$m = date('m', $time);
			$d = date('d', $time);
			$y = date('Y', $time);
			return $this->JDToHijri(cal_to_jd(CAL_GREGORIAN, $m, $d, $y));
		}

		public function HijriToGregorian($m, $d, $y){
			return jd_to_cal(CAL_GREGORIAN, $this->HijriToJD($m, $d, $y));
		}

		public function JDToHijri($jd){
			$jd = $jd - 1948440 + 10632;
			$n = (int) (($jd - 1) / 10631);
			$jd = $jd - 10631 * $n + 354;
			$j = ((int) ((10985 - $jd) / 5316)) *
					((int) (50 * $jd / 17719)) +
					((int) ($jd / 5670)) *
					((int) (43 * $jd / 15238));
			$jd = $jd - ((int) ((30 - $j) / 15)) *
					((int) ((17719 * $j) / 50)) -
					((int) ($j / 16)) *
					((int) ((15238 * $j) / 43)) + 29;
			$m = (int) (24 * $jd / 709);
			$d = $jd - (int) (709 * $m / 24);
			$y = 30 * $n + $j - 30;

			return array($m, $d, $y);
		}

		public function HijriToJD($m, $d, $y){
			return (int) ((11 * $y + 3) / 30) + 354 * $y + 30 * $m - (int) (($m - 1) / 2) + $d + 1948440 - 385;
		}

	}
