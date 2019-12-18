-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 11 Okt 2018 pada 03.42
-- Versi Server: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `crud_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--
/*
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;
*/
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`) AUTO_INCREMENT
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`username`, `password`, `email`,`role`) VALUES 
('saler1', 'saler1', 'saler1@test.com','saler'),
('buyer1', 'buyer1', 'buyer1@test.com','buyer')
;




CREATE TABLE IF NOT EXISTS `crudapp_db`.`product` ( 
  `product_id` INT(11) NOT NULL AUTO_INCREMENT , 
  `product_name` VARCHAR(255)  DEFAULT NULL , 
  `product_desc` VARCHAR(255)  DEFAULT NULL , 
  `product_price` INT(11)  DEFAULT NULL , 
  `product_categ` VARCHAR(255)  DEFAULT NULL , 
  `product_img` VARCHAR(255)  DEFAULT NULL , 
  `product_reviews` INT(11)  DEFAULT NULL ,
  `user_id` INT(11) NOT NULL , 
  PRIMARY KEY (`product_id`),
  CONSTRAINT FK_userid FOREIGN KEY (user_id) REFERENCES accounts(id)
  ) ENGINE = InnoDB DEFAULT CHARSET=latin1  ;

--
-- Dumping data untuk tabel `product`
--
/*
INSERT INTO `product` (`product_id`, `product_name`,`product_desc`, `product_price`,`product_categ`,`product_img`,`product_reviews`) VALUES
(1, 'Product 1','AMD E-350 with AMD Radeon HD 6310 Graphics (dual-core CPU at 1.6GHz and dual DX-11 SIMDs at 500MHz)
4GB PC3-10600 DDR3 SDRAM (1333MHz, 2 DIMM) Windows 7 Professional (32-bit/64-bit) 11.6″ ', 2000, 'Technology','/assets/imgs/laptop.jpg',5)

;
*/
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


/*
ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
*/