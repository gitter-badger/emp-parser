/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50538
 Source Host           : localhost
 Source Database       : edt

 Target Server Type    : MySQL
 Target Server Version : 50538
 File Encoding         : utf-8

 Date: 12/12/2015 13:32:16 PM
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
  `dateStart` datetime DEFAULT NULL,
  `dateEnd` datetime DEFAULT NULL,
  `lastModified` datetime DEFAULT NULL,
  KEY `ueindex` (`UE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `creneaux`
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
