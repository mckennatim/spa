ALTER TABLE TABLE_1 RENAME TO jobcatact;

ALTER TABLE `jobcatact` ADD `id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);

ALTER TABLE `jobcatact` ADD KEY jobcat (`job`, `category`)
ALTER TABLE `jobcatact` ADD KEY (`category`)
ALTER TABLE `jobcatact` ADD KEY (`job`)
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `day1` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;