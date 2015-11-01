/*
 Navicat Premium Data Transfer

 Source Server         : Docker mysql
 Source Server Type    : MySQL
 Source Server Version : 50709
 Source Host           : 192.168.99.103
 Source Database       : edt

 Target Server Type    : MySQL
 Target Server Version : 50709
 File Encoding         : utf-8

 Date: 11/01/2015 21:43:01 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `creneaux`
-- ----------------------------
DROP TABLE IF EXISTS `creneaux`;
CREATE TABLE `creneaux` (
  `UE` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  KEY `ueindex` (`UE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
