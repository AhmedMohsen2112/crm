-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 02, 2017 at 04:13 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `markatapp_2262017`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_settings`
--

CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL,
  `phone` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `usage_conditions_ar` text NOT NULL,
  `usage_conditions_en` text NOT NULL,
  `about_app_ar` text NOT NULL,
  `about_app_en` text NOT NULL,
  `no_of_free_ads` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_settings`
--

INSERT INTO `app_settings` (`id`, `phone`, `email`, `usage_conditions_ar`, `usage_conditions_en`, `about_app_ar`, `about_app_en`, `no_of_free_ads`) VALUES
(1, '4', 'aa@aa.com', 'asdasd', 'sadasdasd', 'asdasd', 'asdasdsdasdasdsadasdasdasd', 2);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `this_order` int(11) NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `title_ar`, `title_en`, `parent_id`, `image`, `active`, `this_order`, `created_by`) VALUES
(1, '', 'Supplements', 0, 's_385552_8.jpg', 1, 0, 141),
(2, '', 'sssss', 0, 's_547946_pro032.jpg', 1, 0, 141),
(3, '', 'Woman Fertility', 0, 's_872787_blog-bg-2.jpg', 1, 0, 141),
(4, '', 'Cosmetics', 0, 's_429290_blog1.jpg', 1, 0, 141),
(5, 'ssss', 'Personal Care', 0, 's_249028_bg-image12.jpg', 1, 0, 141);

-- --------------------------------------------------------

--
-- Table structure for table `brands_categories`
--

CREATE TABLE `brands_categories` (
  `id` int(11) NOT NULL,
  `brands_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `this_order` int(11) NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title_ar`, `title_en`, `parent_id`, `image`, `active`, `this_order`, `created_by`) VALUES
(1, '', 'Supplements', 0, 's_385552_8.jpg', 1, 0, 141),
(2, '', 'sssss', 0, 's_547946_pro032.jpg', 1, 0, 141),
(3, '', 'Woman Fertility', 0, 's_872787_blog-bg-2.jpg', 1, 0, 141),
(4, '', 'Cosmetics', 0, 's_429290_blog1.jpg', 1, 0, 141),
(5, '', 'Personal Care', 0, 's_249028_bg-image12.jpg', 1, 0, 141),
(8, 'asdasdssss', 'asdasdasd', 0, '154f0462ea43d473d3fa08db13022c63jpg.jpg', 1, 9, 0);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `has_free_ads` tinyint(1) NOT NULL DEFAULT '1',
  `packages_id` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `firstname`, `lastname`, `username`, `email`, `phone`, `password`, `has_free_ads`, `packages_id`, `created_at`, `last_login`) VALUES
(1, 'eeeeee', 'eeeee', 'rrrrrr', 'aa@assssssa.com', 232323232, '202cb962ac59075b964b07152d234b70', 1, 0, '2017-06-28 13:01:10', '0000-00-00 00:00:00'),
(5, 'aa', 'aa', 'aa', 'asa@aa.com', 0, '4124bc0a9335c27f086f24ba207a4912', 1, 0, '2017-06-28 13:01:10', '0000-00-00 00:00:00'),
(6, 'aa', 'aa', 'aa', 'aa@aa.com', 0, '4124bc0a9335c27f086f24ba207a4912', 1, 0, '2017-06-28 13:01:10', '0000-00-00 00:00:00'),
(7, 'ahmed', 'mohsen', 'AhmedMohsen', 'mr.success789@gmail.com', 0, '4297f44b13955235245b2497399d7a93', 0, 2, '2017-06-28 13:01:10', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `title_ar` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `this_order` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `currency_id`, `title_ar`, `title_en`, `image`, `this_order`, `active`) VALUES
(72, 11, 'المملكة العربية السعوديةssss', 'Saudi Arabia', '87b8eef6586eaedcc1f3ad298e452cafjpg.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `title_ar` varchar(120) NOT NULL,
  `title_en` varchar(120) NOT NULL,
  `sign` varchar(5) NOT NULL,
  `this_order` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `title_ar`, `title_en`, `sign`, `this_order`, `active`) VALUES
(2, 'جنية مصري', 'Egyptian pound', 'EGP', 3, 1),
(10, 'دولار أمريكى', 'Dollar', 'USD', 2, 1),
(11, 'ريال سعودي', 'Saudi Ryal', 'SR', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `permissions` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `permissions`, `active`, `created_by`) VALUES
(1, 'owner', '{\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"users_section\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"countries\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"settings\":{\"open\":\"1\"},\"about_us\":{\"open\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"admin\":{\"open\":\"1\"},\"currency\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"app_settings\":{\"open\":\"1\",\"edit\":\"1\"},\"home_slider\":{\"open\":\"1\"},\"packages\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"categories\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"brands\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"products\":{\"open\":\"1\",\"edit\":\"1\",\"gallery\":\"1\"},\"other_settings\":{\"open\":\"1\",\"edit\":\"1\"}}', 0, 0),
(6, 'super admin', '{\"user_management\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotels\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programms\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"currency\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 113),
(7, 'super admin', '{\"user_management\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotelss\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programms\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"currency\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_categories\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 113),
(10, 'super admin', '{\"user_management\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotels\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programms\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_types\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_periods\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_jobs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_documents\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_create\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visas_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 97),
(12, 'admin', '{\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"news\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"ads\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"departments\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"employees\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_hotels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"chalets_others\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"haj_umrah_hotels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_seasons\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"haj_umrah_programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"haj_umrah_program\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"agaza_special_offers\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 97),
(13, 'branches', 'null', 0, 128),
(14, 'super admin', '{\"user_management\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotelss\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programms\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"currency\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_categories\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 97),
(15, 'super admin', '{\"user_management\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotelss\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_types\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_periods\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_jobs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_documents\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_create\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visas_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"currency\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_categories\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 97),
(18, 'testo', '{\"users\":{\"open\":\"1\",\"add\":\"1\"}}', 0, 113),
(19, 'super admin', '{\"user_management\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotels\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programms\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"branches\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"places\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_types\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_periods\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_jobs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_documents\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visa_create\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"visas_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 97),
(21, 'super admin', '{\"users_section\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotels_section\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programs_section\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"visas\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"companies\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"countries\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"maka_madina_shrines\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_rooms\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"flight_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_advantage\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs_levels\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"programs\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"travel_way\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"about_us\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_extra_services\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotel_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"groups\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_data\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"hotels_reservation\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"currency\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"},\"program_categories\":{\"open\":\"1\",\"add\":\"1\",\"edit\":\"1\",\"delete\":\"1\"}}', 0, 97),
(22, 'aaaa', '{\"users_section\":{\"open\":\"on\"},\"users\":{\"edit\":\"on\"}}', 1, 141),
(23, 'teto', '{\"users_section\":{\"open\":\"1\"},\"users\":{\"edit\":\"1\"}}', 1, 141),
(24, 'otesto', '{\"users_section\":{\"open\":\"1\"},\"basic_data\":{\"open\":\"1\"},\"hotels_section\":{\"open\":\"1\"},\"flight\":{\"open\":\"1\"},\"programs_section\":{\"open\":\"1\"},\"settings\":{\"open\":\"1\"},\"admin\":{\"open\":\"1\"},\"users\":{\"open\":\"1\",\"add\":\"1\"},\"branches\":{\"open\":\"1\",\"delete\":\"1\"},\"groups\":{\"edit\":\"1\"}}', 1, 141);

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `fullname` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  `age` tinyint(2) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `last_login` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`id`, `fullname`, `email`, `password`, `address`, `phone`, `image`, `age`, `branches_id`, `last_login`, `created_at`) VALUES
(1, 'as', 'as', 'f970e2767d0cfe75876ea857f92e319b', '', '', '', 0, 0, '2016-10-26 18:05:33', '0000-00-00 00:00:00'),
(2, 'asassa', 'asassa', '2c14bffddf493cd147b8a0bd3581370b', '', '', '', 0, 0, '2016-10-26 18:05:33', '2016-10-26 15:45:58'),
(3, 'asdasdsadsa', 'asdasdsadsa', '34789983c8f95b599c03d4d4061a1e6d', '', '', '', 0, 0, '2016-10-26 18:05:33', '2016-10-26 15:47:42'),
(4, 'احمد محسن شعبان', 'mr.success789@gmail.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 0, '2017-02-05 00:00:00', '2016-10-26 16:04:07'),
(5, 'amr', 'amr', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 0, '2017-02-08 00:00:00', '2016-10-26 19:52:00'),
(6, 'ahmed mohsen', 'mr.success789@gmail.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 25, '2017-03-20 00:00:00', '2016-11-22 07:30:37'),
(7, 'hager sayed', 'hager@hager.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 26, '2016-12-01 00:00:00', '2016-12-01 15:42:56'),
(8, 'aaa', 'br@br.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 47, '2017-03-01 00:00:00', '2017-01-10 16:39:25'),
(9, 'guest', 'guest@avisa.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 48, '2017-03-20 00:00:00', '2017-01-31 14:10:27'),
(10, 'guest', 'guest@avisa.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 48, '2017-01-31 00:00:00', '2017-01-31 14:11:55'),
(11, 'ahmed', 'mr.success789@gmail.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 48, '2017-02-07 00:00:00', '2017-01-31 14:43:14'),
(12, 'ahmed', 'mr.success70@yahoo.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 48, '2017-01-31 00:00:00', '2017-01-31 14:44:19'),
(13, 'amr', 'amr@mv-is.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 48, '2017-02-07 00:00:00', '2017-02-06 09:09:11'),
(14, 'dina', 'dina@mv-is.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 48, '2017-02-06 00:00:00', '2017-02-06 09:15:44'),
(15, 'ahmedtravlla', 'tr@tr.com', '4297f44b13955235245b2497399d7a93', '', '', '', 0, 58, '2017-03-20 00:00:00', '2017-03-13 18:50:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_slider`
--

CREATE TABLE `home_slider` (
  `id` int(11) NOT NULL,
  `first_title_en` varchar(255) NOT NULL,
  `second_title_en` varchar(255) NOT NULL,
  `first_title_ar` varchar(255) NOT NULL,
  `second_title_ar` varchar(255) NOT NULL,
  `desc_en` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `this_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `home_slider`
--

INSERT INTO `home_slider` (`id`, `first_title_en`, `second_title_en`, `first_title_ar`, `second_title_ar`, `desc_en`, `image`, `url`, `active`, `this_order`) VALUES
(18, '', '', '', '', '', 's_808312_Hydrangeas.jpg', '', 0, 0),
(19, '', '', '', '', '', 's_969141_Desert.jpg', '', 0, 0),
(20, '', '', '', '', '', 's_13788_Hydrangeas1.jpg', '', 0, 0),
(30, '', '', '', '', '', 'bb8322c109282e663f81f75d6d42a4d0jpg.jpg', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `code` char(2) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `this_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `title`, `image`, `code`, `status`, `this_order`) VALUES
(1, 'عربى', '', 'ar', 1, 1),
(2, 'english', '', 'en', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `actions` varchar(255) NOT NULL,
  `this_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `name`, `parent_id`, `actions`, `this_order`) VALUES
(1, 'users', 3, 'open,add,edit,delete', 1),
(3, 'users_section', 0, 'open', 4),
(4, 'basic_data', 0, 'open', 3),
(8, 'countries', 4, 'open,add,edit,delete', 4),
(27, 'settings', 0, 'open', 2),
(29, 'about_us', 4, 'open', 2),
(38, 'groups', 3, 'open,add,edit,delete', 2),
(50, 'admin', 0, 'open', 1),
(51, 'currency', 4, 'open,add,edit,delete', 1),
(70, 'app_settings', 27, 'open,edit', 1),
(71, 'home_slider', 0, 'open', 5),
(72, 'packages', 0, 'open,add,edit,delete', 1),
(73, 'categories', 4, 'open,add,edit,delete', 7),
(74, 'brands', 4, 'open,add,edit,delete', 8),
(75, 'products', 0, 'open,add,edit,delete,gallery', 1),
(76, 'other_settings', 27, 'open,edit', 2);

-- --------------------------------------------------------

--
-- Table structure for table `other_settings`
--

CREATE TABLE `other_settings` (
  `id` int(11) NOT NULL,
  `language` enum('ar','en') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `other_settings`
--

INSERT INTO `other_settings` (`id`, `language`) VALUES
(1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `title_ar` varchar(100) NOT NULL,
  `title_en` varchar(100) NOT NULL,
  `desc_ar` text NOT NULL,
  `desc_en` text NOT NULL,
  `period` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `no_of_ads` int(11) NOT NULL,
  `this_order` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `period`, `price`, `no_of_ads`, `this_order`, `active`) VALUES
(2, 'dasdasd', 'asdas', 'asdasd', 'sadasd', 1, '3', 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `controller` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `actions` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `desc` text,
  `this_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `name`, `controller`, `parent_id`, `actions`, `active`, `desc`, `this_order`) VALUES
(1, 'users', 'users', 3, 'open,add,edit,delete', 1, NULL, 1),
(3, 'users_section', 'users_section', 0, '', 0, NULL, 4),
(4, 'basic_data', 'basic_data', 0, 'open', 0, NULL, 3),
(8, 'countries', 'countries', 0, 'open,add,edit,delete', 1, NULL, 4),
(27, 'settings', 'settings', 0, '', 1, 'asda', 2),
(38, 'groups', 'groups', 3, '', 1, 'groups', 2),
(51, 'currency', 'currency', 0, '', 1, '1', 3),
(63, 'admin', 'admin', 0, '', 1, NULL, 1),
(64, 'app_settings', 'app_settings', 27, '', 1, NULL, 1),
(65, 'home_slider', 'home_slider', 0, '', 1, NULL, 5),
(66, 'packages', 'packages', 0, '', 1, NULL, 6),
(67, 'categories', 'categories', 0, '', 1, NULL, 4),
(68, 'brands', 'brands', 0, '', 1, NULL, 6),
(69, 'products', 'products', 0, '', 1, NULL, 8),
(70, 'other_settings', 'other_settings', 27, '', 1, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `phone` int(11) NOT NULL,
  `product_status` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `desc_ar` text NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `this_order` int(11) NOT NULL,
  `viewed_no` int(11) NOT NULL,
  `sales_no` int(11) NOT NULL,
  `desc_en` text NOT NULL,
  `categories_id` int(11) NOT NULL,
  `countries_id` int(11) NOT NULL,
  `brands_id` int(11) NOT NULL,
  `sale_price` decimal(10,0) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bill_status` tinyint(1) NOT NULL,
  `calls_or_messages` tinyint(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  `calculated` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `phone`, `product_status`, `image`, `title_ar`, `desc_ar`, `title_en`, `price`, `this_order`, `viewed_no`, `sales_no`, `desc_en`, `categories_id`, `countries_id`, `brands_id`, `sale_price`, `active`, `updated_at`, `bill_status`, `calls_or_messages`, `created_by`, `calculated`, `created_at`) VALUES
(78, '', '', 0, '', '', 'صصصص', 'sadasd', 'asdasdssss', '500', 3, 0, 0, 'asdsaddddd', 3, 72, 3, '0', 1, '2017-06-29 12:14:31', 0, 0, 6, 0, '2017-04-22 12:07:13'),
(79, '', '', 0, '', '', 'asfdasd', 'asdasdasd', 'yyyyyy', '5000', 2, 0, 0, 'yyyy', 3, 88, 2, '2000', 1, '2017-06-29 12:24:41', 0, 0, 7, 1, '2017-04-22 12:21:15'),
(80, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:18:16', 1, 1, 0, 0, '2017-06-29 12:15:01'),
(81, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:24:09', 1, 1, 0, 0, '2017-06-29 12:18:23'),
(82, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:24:37', 1, 1, 0, 0, '2017-06-29 12:24:14'),
(83, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:24:41', 1, 1, 7, 1, '2017-06-29 12:24:41'),
(84, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:40:42', 1, 1, 7, 1, '2017-06-29 12:33:23'),
(85, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:40:42', 1, 1, 7, 1, '2017-06-29 12:40:41'),
(86, '', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 1, 72, 9, '0', 0, '2017-06-29 12:44:44', 1, 1, 7, 1, '2017-06-29 12:43:52'),
(87, 'ererer', 'dewewweewe', 12341234, 'ererer', '', 'qqqqq', '', '', '1234', 0, 0, 0, '', 3, 72, 1, '123', 1, '2017-06-29 15:40:22', 1, 1, 7, 1, '2017-06-29 12:44:44');

-- --------------------------------------------------------

--
-- Table structure for table `products_slider`
--

CREATE TABLE `products_slider` (
  `id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_slider`
--

INSERT INTO `products_slider` (`id`, `products_id`, `image`) VALUES
(11, 80, '149873850136435954ef452efc4.jpg'),
(12, 81, '14987387033605954f00f5767f.jpg'),
(13, 82, '149873905416395954f16e6a398.jpg'),
(14, 83, '149873908148685954f1899498a.jpg'),
(15, 84, '1498739603234085954f393eee60.jpg'),
(16, 85, '1498740041305745954f549f30fd.jpg'),
(17, 86, '1498740232160285954f60887208.jpg'),
(22, 87, 's_584638_2.jpg'),
(23, 87, '0138b5c0fc6ce0ab456bd0e9b6097f03jpg.jpg'),
(24, 87, 'eb0f1f2990fe98f521717d9ba999c90ajpg.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `search_query`
--

CREATE TABLE `search_query` (
  `id` int(11) NOT NULL,
  `query` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `search_query`
--

INSERT INTO `search_query` (`id`, `query`) VALUES
(1, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=0'),
(2, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=0'),
(3, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=0&period=0'),
(4, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=0&period=0'),
(5, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=0&period=0'),
(6, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=2-7'),
(7, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=2-7'),
(8, 'main_categories_id=6&sub_categories_id=7&price=ASC'),
(9, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=2-7'),
(10, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82'),
(11, 'main_categories_id=6&sub_categories_id=7&price=ASC'),
(12, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=1'),
(13, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=82&period=1'),
(14, 'main_categories_id=6&sub_categories_id=7&price=ASC'),
(15, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=&period='),
(16, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=&period='),
(17, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=&period='),
(18, 'main_categories_id=6&sub_categories_id=7&price=ASC&from_to=&period='),
(19, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=82&period=2'),
(20, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=82&period=2'),
(21, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=82&period=2'),
(22, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=82&period=2'),
(23, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(24, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(25, 'main_categories_id=6&sub_categories_id=11&sort_type=price_start_from&sort_value=ASC&going_from_id=82&period=3'),
(26, 'main_categories_id=6&sub_categories_id=11&sort_type=price_start_from&sort_value=ASC&going_from_id=82&period=3'),
(27, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(28, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(29, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(30, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(31, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(32, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=ASC&going_from_id=&period='),
(33, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=DESC&going_from_id=82&period=1'),
(34, 'main_categories_id=6&sub_categories_id=7&sort_type=price_start_from&sort_value=DESC&going_from_id=82&period=1'),
(35, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=82&period=1'),
(36, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=82&period=1'),
(37, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(38, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(39, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(40, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(41, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(42, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(43, 'main_categories_id=6&sub_categories_id=10&sort_value=ASC&going_from_id=&period='),
(44, 'main_categories_id=6&sub_categories_id=10&sort_value=ASC&going_from_id=&period='),
(45, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(46, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=&period='),
(47, 'main_categories_id=6&sub_categories_id=7&sort_value=DESC&going_from_id=82&period=1'),
(48, 'main_categories_id=6&sub_categories_id=7&sort_value=DESC&going_from_id=82&period=1'),
(49, 'main_categories_id=6&sub_categories_id=7&sort_value=DESC&going_from_id=82&period=1'),
(50, 'main_categories_id=6&sub_categories_id=7&sort_value=DESC&going_from_id=82&period=1'),
(51, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=82&period='),
(52, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=82&period='),
(53, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(54, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(55, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(56, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(57, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(58, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(59, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(60, 'main_categories_id=6&sub_categories_id=0&sort_value=DESC&going_from_id=&period='),
(61, 'main_categories_id=6&sub_categories_id=0&sort_value=ASC&going_from_id=&period='),
(62, 'main_categories_id=6&sub_categories_id=0&sort_value=ASC&going_from_id=&period='),
(63, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(64, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(65, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(66, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(67, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(68, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(69, 'main_categories_id=6&sub_categories_id=8&sort_value=DESC&going_from_id=82&period=1'),
(70, 'main_categories_id=6&sub_categories_id=8&sort_value=DESC&going_from_id=82&period=1'),
(71, 'main_categories_id=6&sub_categories_id=7&sort_value=DESC&going_from_id=82&period=0'),
(72, 'main_categories_id=6&sub_categories_id=7&sort_value=DESC&going_from_id=82&period=0'),
(73, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(74, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(75, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(76, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(77, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(78, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(79, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(80, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(81, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(82, 'main_categories_id=6&sub_categories_id=7&sort_value=ASC&going_from_id=0&period=0'),
(83, 'main_categories_id=6&sub_categories_id=0&sort_value=ASC&going_from_id=0&period=0'),
(84, 'main_categories_id=6&sub_categories_id=0&sort_value=ASC&going_from_id=0&period=0'),
(85, 'main_categories_id=6&sub_categories_id=0&sort_value=ASC&going_from_id=0&period=0'),
(86, 'main_categories_id=6&sub_categories_id=0&sort_value=ASC&going_from_id=0&period=0'),
(87, 'main_categories_id=6&sort_value=ASC'),
(88, 'main_categories_id=6&sort_value=ASC'),
(89, 'main_categories_id=6&sort_value=ASC&going_from_id=82'),
(90, 'main_categories_id=6&sort_value=ASC&going_from_id=82'),
(91, 'main_categories_id=6&sort_value=ASC&going_from_id=82'),
(92, 'main_categories_id=6&sort_value=ASC&going_from_id=82'),
(93, 'main_categories_id=6&sort_value=ASC'),
(94, 'main_categories_id=6&sort_value=ASC'),
(95, 'main_categories_id=6&sort_value=ASC'),
(96, 'main_categories_id=6&sort_value=ASC'),
(97, 'main_categories_id=6&sort_value=ASC'),
(98, 'main_categories_id=6&sort_value=ASC'),
(99, 'main_categories_id=6&sort_value=ASC'),
(100, 'main_categories_id=6&sort_value=ASC'),
(101, 'main_categories_id=6&sort_value=ASC'),
(102, 'main_categories_id=6&sort_value=ASC'),
(103, 'main_categories_id=6&sort_value=ASC'),
(104, 'main_categories_id=6&sort_value=ASC'),
(105, 'main_categories_id=6&sort_value=ASC'),
(106, 'main_categories_id=6&sort_value=ASC'),
(107, 'main_categories_id=6&sort_value=ASC'),
(108, 'main_categories_id=6&sort_value=ASC'),
(109, 'main_categories_id=6&sort_value=DESC&period=1'),
(110, 'main_categories_id=6&sort_value=DESC&period=1'),
(111, 'main_categories_id=6&sub_categories_id=8&sort_type=price_start_from&sort_value=ASC'),
(112, 'main_categories_id=6&sub_categories_id=8&sort_type=price_start_from&sort_value=ASC'),
(113, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC'),
(114, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC'),
(115, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC'),
(116, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC'),
(117, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC'),
(118, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC'),
(119, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&period=1'),
(120, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&period=1'),
(121, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&period=1'),
(122, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&period=1'),
(123, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&period=3'),
(124, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&period=3'),
(125, 'main_categories_id=6&sort_type=period&sort_value=3'),
(126, 'main_categories_id=6&sort_type=period&sort_value=3'),
(127, 'main_categories_id=6&sort_type=period&sort_value=3'),
(128, 'main_categories_id=6&sort_type=period&sort_value=3'),
(129, 'main_categories_id=6&sort_type=period&sort_value=2'),
(130, 'main_categories_id=6&sort_type=period&sort_value=2'),
(131, 'main_categories_id=6&sort_type=period&sort_value=2'),
(132, 'main_categories_id=6&sort_type=period&sort_value=2'),
(133, 'main_categories_id=6&sort_type_price=price_start_from&sort_value_price=ASC&sort_type_period=period&sort_value_period=1'),
(134, 'main_categories_id=6&sort_type_price=price_start_from&sort_value_price=ASC&sort_type_period=period&sort_value_period=1'),
(135, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(136, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(137, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=3'),
(138, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=3'),
(139, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=3'),
(140, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=3'),
(141, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(142, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(143, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=3'),
(144, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=3'),
(145, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(146, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(147, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(148, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&period=2'),
(149, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&going_from_id=82'),
(150, 'main_categories_id=6&sort_type=price_start_from&sort_value=ASC&going_from_id=82'),
(151, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from_id=77&period=2'),
(152, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from_id=77&period=2'),
(153, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&going_from_id=77&period=3'),
(154, 'main_categories_id=6&sort_type=price_start_from&sort_value=DESC&going_from_id=77&period=3'),
(155, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from_id=77'),
(156, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from_id=77'),
(157, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from=77'),
(158, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from=77'),
(159, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC'),
(160, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC'),
(161, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from_id=77'),
(162, 'main_categories_id=6&sub_categories_id=10&sort_type=price_start_from&sort_value=DESC&going_from_id=77');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `site_title_ar` varchar(150) NOT NULL,
  `site_phone` varchar(150) NOT NULL,
  `site_email` varchar(150) NOT NULL,
  `site_language` varchar(120) NOT NULL DEFAULT 'arabic',
  `site_address_ar` varchar(255) NOT NULL,
  `about_us` text NOT NULL,
  `site_keywords_ar` varchar(255) NOT NULL,
  `site_desc_ar` text NOT NULL,
  `site_contacts` text NOT NULL,
  `site_title_en` varchar(255) NOT NULL,
  `site_address_en` varchar(255) NOT NULL,
  `site_desc_en` varchar(255) NOT NULL,
  `site_keywords_en` varchar(255) NOT NULL,
  `terms_ar` text NOT NULL,
  `terms_en` text NOT NULL,
  `egy_code` varchar(20) NOT NULL,
  `usa_code` varchar(20) NOT NULL,
  `visa_price_cost` decimal(10,0) NOT NULL,
  `visa_price_profit` decimal(10,0) NOT NULL,
  `visa_currency_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `site_title_ar`, `site_phone`, `site_email`, `site_language`, `site_address_ar`, `about_us`, `site_keywords_ar`, `site_desc_ar`, `site_contacts`, `site_title_en`, `site_address_en`, `site_desc_en`, `site_keywords_en`, `terms_ar`, `terms_en`, `egy_code`, `usa_code`, `visa_price_cost`, `visa_price_profit`, `visa_currency_id`) VALUES
(1, 'ناشيونال إيجيبت للسياحة', '01110775588', 'a.mohsen@mv-is.com', 'arabic', ' 35 عمارات العبور - صلاح سالم - القاهرة', '', 'عمرة, حج,سياحة,مصر,مكة,المدينةالمسجد الحرام,المسجدالنبوي,مناسك العمرة,مناسك الحج,الحج السياحى,حج القرعة,الداخلية,التضامن,قرعة الحج,', 'ناشيونال إيجيبت للسياحة افضل شركة سياحة دينية فى مصر بخبرة اكثر من 20 عاما و خدمة اكثر من 100 الف عميل\r\n', '{\"facebook\":\"https:\\/\\/www.facebook.com\\/%D9%84%D8%A8%D9%8A%D9%83-%D8%AD%D8%AC%D8%A7-%D9%88%D8%B9%D9%85%D8%B1%D9%87-142945722521799\\/\",\"twitter\":\"aaa\",\"instagram\":\"aaa\",\"google\":\"aaa\",\"linkedin\":\"aaa\",\"youtube\":\"https:\\/\\/www.youtube.com\\/channel\\/UCBo50ssmErxweuPtZivzB5w\"}', 'National Bureau Of Egypt', '35 El Obour Buildings,  Salah Saleem St. Cairo', 'National Bureau Of Egypt is the best religious tourism company in Egypt with more than 20 years experience and serving more than 100,000 customers\r\n', 'Umrah', '', '', 'EG', 'USA', '200', '200', 11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `groups_id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(150) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `last_login_datetime` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `companies_id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `groups_id`, `username`, `password`, `address`, `email`, `phone`, `last_login_datetime`, `created_at`, `created_by`, `companies_id`, `branches_id`, `active`) VALUES
(141, 1, 'atiaf', '4297f44b13955235245b2497399d7a93', 'aaaaa', 'travlla@travlla.com', '000', '0000-00-00 00:00:00', '2017-03-21 12:09:57', 97, 58, 57, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands_categories`
--
ALTER TABLE `brands_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_slider`
--
ALTER TABLE `home_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `other_settings`
--
ALTER TABLE `other_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_slider`
--
ALTER TABLE `products_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `search_query`
--
ALTER TABLE `search_query`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `brands_categories`
--
ALTER TABLE `brands_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `home_slider`
--
ALTER TABLE `home_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `other_settings`
--
ALTER TABLE `other_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
--
-- AUTO_INCREMENT for table `products_slider`
--
ALTER TABLE `products_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
