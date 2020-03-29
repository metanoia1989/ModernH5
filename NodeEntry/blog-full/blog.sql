CREATE DATABASE IF NOT EXISTS blog CHARACTER SET utf8;

USE blog;

CREATE TABLE IF NOT EXISTS author (
    authroID INT KEY AUTO_INCREMENT,
    authorName VARCHAR(20) NOT NULL UNIQUE,
    authorPassword VARCHAR(32) NOT NULL
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS article (
    articleID INT KEY AUTO_INCREMENT,
    articleTitle VARCHAR(100) NOT NULL UNIQUE,
    articleAuthor VARCHAR(20) NOT NULL,
    articleContent LONGTEXT NOT NULL,
    articleTime DATE NOT NULL,
    articleClick INT DEFAULT 0
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB; 

INSERT author VALUES(DEFAULT, 'node', 'e10adc3949ba59abbe56e057f20f883e');

INSERT article SET articleTitle="Node.js基础知识", articleAuthor="node", 
articleContent="Node.js基础知识简要介绍", articleTime=CURDATE();

INSERT article SET articleTitle="Node.js进阶知识", articleAuthor="node", 
articleContent="Node.js进阶知识简要介绍", articleTime=CURDATE();

INSERT article SET articleTitle="Node.js高级知识", articleAuthor="node", 
articleContent="Node.js高级知识简要介绍", articleTime=CURDATE();