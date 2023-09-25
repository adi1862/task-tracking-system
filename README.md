# Task Tracking System
This system is for tracking tasks.

## How To Setup Project
1. Clone the project from vcs repo: https://github.com/adi1862/task-tracking-system.git
2. copy the file .env.example into .env
3. create a DB with the following schema:
```
  CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `status` enum('OPEN','INPROGRESS','COMPLETED') DEFAULT 'OPEN',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```
4. Run the following command:
  ```
  npm i
  npm start
  ```

### API Documentation
https://documenter.getpostman.com/view/5540838/2s9YJW6RSq


### Software Version
> Node: v16.14.0
> Mysql: 8.0.32