CREATE DATABASE cliw_proj;
USE cliw_proj;

DROP TABLE statistics;

CREATE TABLE statistics (account_id INT NOT NULL UNIQUE,
                         nr_upvotes INT NOT NULL,
                         nr_posted_answers INT NOT NULL,
                         nr_accepted_answers INT NOT NULL,
                         PRIMARY KEY (account_id)
                         );