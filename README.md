# Cinema Manager

***

## 1. About this application

* This app is developed for managing movies running in a cinema, allowing user basic operations (add, delete, modify, insert) on movies and their genres. <br>
* The app consists of two pages handled by the Node.JS localhost server alongside Express.js framework for routing. <br>
* The "Toate filmele" page displays the running movies in the cinema with its functionality of altering the results, while the "Categorii" page displays all the genres available for labeling the movies accordingly. <br>
* Data is stored in a SQL database (**exported and contained in the repo**). <br>

***

## 2. Prerequisites

* Node.JS runtime installed with **NPM** (Node Package Manager)
* MySQL Server (preferably [MySQL Workbench](https://dev.mysql.com/downloads/file/?id=490395) and **configured for running in Compatibility Mode with MySQL 5.0**)

## 3. How to setup

_Assuming you have already installed the prerequisites mentioned in **Introduction and prerequisites**, to set up the project, do as mentioned below_: <br>

* Clone the repository using `git clone <repo_link>` <br>
* Install all dependencies with `npm install` (NPM will know what packages to install since they are contained in **package.json**) <br>
* Install **nodemon** package globally with `npm install -g --save-dev nodemon` <br>
* In MySQL, create database **theatre** with query `CREATE DATABASE theatre;` <br>
* Import in **theatre** the tables needed using the SQL file `db.sql` from the repo <br>
* Open `index.js` in your preferred text editor and on **line 5** on the constant `MYSQL_CREDENTIALS_AUTH` modify the **field value** of `password` to your root password that you have set when installing MySQL Server. (**WARNING**: DO NOT DELETE hyphens around the password) <br>
* Once set, in console run `nodemon index` and go to the internet browser and type `localhost`. This should redirect you to the `/movies` route.

***

**For user interface explanation, please read the wiki.**
