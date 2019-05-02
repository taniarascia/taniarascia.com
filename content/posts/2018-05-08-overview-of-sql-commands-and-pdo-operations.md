---
date: 2018-05-08
title: 'Overview of SQL Commands and PDO Operations'
template: post
thumbnail: '../thumbnails/sql.png'
slug: overview-of-sql-commands-and-pdo-operations
categories:
  - Popular
  - Tools
tags:
  - database
  - mysql
  - php
  - sql
  - reference
---

Structured Query Language, or **SQL**, is a widely used language the allows users to query and manage data in a database. Databases such as MySQL, MariaDB, SQLite, PostgreSQL, Oracle, and Microsoft SQL Server are all based on the SQL standard, with some slight variations. This resource uses the MySQL flavor of SQL.

I've created an overview resource to quickly be able to reference the appropriate syntax for the most popular SQL commands, and code to use the PDO class in PHP to securely connect to and work with a database.

To see PHP and MySQL in action, view the Creating a Simple Database Application from Scratch tutorial - [Part One: Create and Read](/create-a-simple-database-app-connecting-to-mysql-with-php/) and [Part Two: Update and Delete](/create-a-simple-crud-database-app-php-update-delete/).

You can view the commands alone without explanations on GitHub through the below link.

- [View on GitHub](https://github.com/taniarascia/sql)

The logo in this article is of [Sequel Pro](https://www.sequelpro.com/), an awesome free MySQL GUI for Mac.

## Contents

- Create Database
- Drop Database
- Create Table
  - Datatypes
  - Constraints
- Alter Table
- Drop Table
- Select Rows
- Select Distinct Rows
  - Joins
  - Aggregate Functions
  - Conditions
- Insert Rows
- Update Rows
- Delete Rows
- PDO: Open Connection
  - PDO Datatypes
- PDO: Select Rows
- PDO: Insert Row
- PDO: Update Row
- PDO: Delete Row

## SQL

Common SQL syntax and statements.

### Create Database

Create a new database.

```sql
CREATE DATABASE IF NOT EXISTS database_name
```

### Drop Database

Delete an existing database.

```sql
DROP DATABASE IF EXISTS database_name
```

### Create Table

Creates a new table with corresponding structure. The structure schema consists of a comma separated list of column name, followed by the datatype, followed by any constraints (optional) and a default value (optional).

```sql
CREATE TABLE IF NOT EXISTS table_name (
  column_a Datatype Constraints DEFAULT 'value_1',
  column_b Datatype Constraints
);
```

Create Table Example

```sql
CREATE TABLE IF NOT EXISTS users (
  id       INT(11) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  location VARCHAR(50) DEFAULT 'Chicago'
);
```

The charts below identify some of the most widely used datatypes and constraints in SQL.

#### Datatypes

The type of value a column can hold.

| Datatype                           | Description                                         |
| ---------------------------------- | --------------------------------------------------- |
| `INT(n)`                           | Integer values                                      |
| `FLOAT(n, d)`                      | Decimal values                                      |
| `VARCHAR(n)`                       | String with max number of characters                |
| `TEXT`                             | String with without set limit (max value of 65,535) |
| `DATE('YYYY-MM-DD')`               | Year, month, and day                                |
| `DATETIME('YYYY-MM-DD HH:MI:SS')`  | Year, month, day, hour, minute, and second          |
| `TIMESTAMP('YYYY-MM-DD HH:MI:SS')` | Datetime corresponding to UNIX epoch time           |

#### Constraints

Rules applied to a column.

| Constrant        | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `PRIMARY KEY`    | Unique identifier                                    |
| `AUTO_INCREMENT` | Integer value is automatically added and incremented |
| `UNIQUE`         | Value must be unique                                 |
| `NOT NULL`       | Value cannot be NULL                                 |
| `DEFAULT`        | Initialized with default value                       |

### Alter Table

Add, modify, rename, or drop a column. Rename a table.

```sql
 ALTER TABLE table_a
         ADD column_a Datatype Constraints
ALTER COLUMN column_a Datatype Constraints
        DROP column_a
   RENAME TO table_b
```

### Drop Table

Delete an existing table.

```sql
DROP TABLE IF EXISTS table_name
```

### Select Rows

Select data from a database. Only `SELECT` and `FROM` are mandatory; the rest of the fields are optional. The order of a `SELECT` statement is as follows:

- `SELECT` - select `*` (all), specific columns, or aggregate functions.
- `AS` - assign an alias to a column name
- `FROM` - table name to pull data from
- `JOIN/LEFT JOIN/RIGHT JOIN/FULL JOIN ... ON` - combine data from tables by a common key
- `WHERE ... AND, OR, NOT` - filter data by conditions
- `GROUP BY` - group a result set by column.
- `HAVING` - filter groups by conditions.
- `ORDER BY` - sort a result set by column in ascending or descending order
- `LIMIT` - limit number of results
- `OFFSET` - offset the results

```sql
    SELECT *, column_a, column_b, AggregateFunction(column_a)
        AS Alias
      FROM table_a
      JOIN table_b
        ON table_a.column_a = table_b.column_a
     WHERE Condition
       AND Condition
        OR Condition
       NOT Condition
  GROUP BY column_a
    HAVING Condition
  ORDER BY column_a
       ASC
      DESC
     LIMIT Count
    OFFSET Count
```

Select Rows Example

```sql
  SELECT username,
         AVG(age) AS average_age
    FROM users
    JOIN memberships
      ON users.id = memberships.user_id
   WHERE join_date >= '01-01-2010'
     AND level = 'Paid'
GROUP BY average_age
  HAVING average_age > 21
ORDER BY join_date DESC
   LIMIT 100
  OFFSET 1
```

### Select Distinct Rows

Filter out duplicates to select unique results.

```sql
SELECT DISTINCT column_name
           FROM table_name
```

#### Joins

Combine data from multiple tables based on a common column.

| Join           | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `(INNER) JOIN` | Returns only matches from both tables                             |
| `LEFT JOIN`    | Returns all entries from left table, and matches from right table |
| `RIGHT JOIN`   | Returns all entries from right table, and matches from left table |
| `FULL JOIN`    | Returns all entries from both tables                              |

#### Aggregate Functions

Apply a function to a column.

| Function        | Description             |
| --------------- | ----------------------- |
| `COUNT(column)` | Counts number of rows   |
| `SUM(column)`   | Adds all values         |
| `MIN(column)`   | Find the smallest value |
| `MAX(column)`   | Find the largest value  |
| `AVG(column)`   | Find the average value  |

#### Conditions

Filter based on specified conditions with these operators.

| Operator                  | Condition                              |
| ------------------------- | -------------------------------------- |
| `=`, `!=`                 | Equal, not equal                       |
| `<`, `>`                  | Less than, greater than                |
| `<=`, `>=`                | Less/greater than or equal to          |
| `BETWEEN ... AND ...`     | Within range of two values             |
| `NOT BETWEEN ... AND ...` | Not within range of two values         |
| `IN (...)`                | Exists in list                         |
| `NOT IN (...)`            | Does not exist in list                 |
| `LIKE`                    | Case insensitive equality comparison   |
| `NOT LIKE`                | Case insensitive inequality comparison |
| `%`                       | Matches a sequence of characters       |
| `_`                       | Matches a single character             |
| `IS NULL`                 | Value is null                          |
| `IS NOT NULL`             | Value is not null                      |
| `ANY (...)`               | If any values meet condition           |
| `ALL`                     | If all values meet condition           |
| `EXISTS`                  | If one or more records exist           |

### Insert Rows

Add new rows into a table.

```sql
INSERT INTO table_name (column_a, column_b)
     VALUES ("value_1", "value_2")
```

### Update Rows

Modify existing rows in a table.

```sql
UPDATE table_name
   SET column_a = "value_1"
       column_b = "value_2"
 WHERE Condition
```

### Delete Rows

Delete existing rows from a table.

```sql
DELETE FROM table_name
      WHERE Condition
```

## PDO

Syntax for opening a connecting and running insert, select, update, and delete commands.

### Open Connection

Set connection details.

```php
$host       = 'localhost';
$username   = 'root';
$password   = 'root';
$dbname     = 'pdo';
$dsn        = "mysql:host=$host;dbname=$dbname";
$options    = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
              ];

$connection = new PDO($dsn, $username, $password, $options);
```

#### Datatypes

Set datatypes for properly prepared statements.

| Datatype          | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `PDO::PARAM_BOOL` | Represents a boolean data type                               |
| `PDO::PARAM_NULL` | Represents the SQL NULL data type                            |
| `PDO::PARAM_INT`  | Represents the SQL INTEGER data type                         |
| `PDO::PARAM_STR`  | Represents the SQL CHAR, VARCHAR, or other string data type. |

### Select Rows

Select rows with optional binded parameters.

```php
$sql = "SELECT *
        FROM users
        WHERE location = :location";

$location = 'Chicago';

$statement = $connection->prepare($sql);
$statement->bindParam(':location', $location, PDO::PARAM_STR);
$statement->execute();

$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach ($rows as $row) {
  echo $row['location'];
}
```

### Insert Row

Insert rows with binded values.

```php
$sql = "INSERT INTO users (username, email)
             VALUES (:username, :email)";

$username = 'Tania';
$email = 'tania@example.com';

$statement = $connection->$prepare($sql);
$statement->bindValue(':username', $username, PDO::PARAM_STR);
$statement->bindValue(':email', $email, PDO::PARAM_STR);

$insert = $statement->execute();

```

### Update Row

Update rows with an associated array of data.

```php
$user = [
  'username'  => 'Tania',
  'email'     => 'tania@example.com',
  'location'  => 'Chicago',
];

$sql = "UPDATE users
           SET username = :username,
                email = :email,
                location = :location,
         WHERE id = :id";

$statement = $connection->prepare($sql);
$statement->execute($user);
```

### Delete Row

Delete existing rows.

```php
$sql = "DELETE FROM users
              WHERE id = :id";

$statement = $connection->prepare($sql);
$statement->bindValue(':id', 5, PDO::PARAM_INT);

$delete = $statement->execute();

```

## Conclusion

Hopefully this helps you out if you need a quick refresher on the order of a `SELECT`, or how to work with PDO. Enjoy!

- [View on GitHub](https://github.com/taniarascia/sql)
