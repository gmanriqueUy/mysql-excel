# mysql-excel

Run some `select` queries on a mysql database and get its results exported on an excel file.

## Prerequisites

- Node.js 8 or later

## Installation

```bash
npm install -g mysql-excel
```

## Usage

-------

```
Usage: mysql-excel [options]

Options:
  -v, --version              Output version and exit
  -h, --host <host>          Host to connect to (default: "localhost")
  -u, --user <user>          User for login
  -p, --password <password>  Password to use when connecting to the server
  -d, --database <database>  Database to query
  -P, --port [port]          Port of the server (default: "3306")
  -H, --help                 Display application help

Examples:
  $ mysql-excel -v
  $ mysql-excel -H
  $ mysql-excel -u octocat -p tentacles -d github
  $ mysql-excel -u octocat -p tentacles -d github -h 127.0.0.1 -P 33066
```

------

When it's executed with all its required (and valid) arguments, the following welcome message will be displayed:

```
Using database '<database>'.

Run some 'select' queries below.
Enter 'exit' once you are ready to get an excel file with the results of your queries.

 >
```

Enter some `select` queries on the prompt:

```
 > select * from repos;
 > select * from gists;
```

Type `exit` when you are done executing queries.
<br>
Enter the name of the excel file on the prompt and hit enter.

```
 > exit

? Enter the name of the excel file: repos.xlsx
repos.xlsx successfully created!
```

The application will exit and the excel file will be created on your current working directory.

The spreadsheet file will contain as many sheets as queries were executed.
<br>
In our example:

- `Sheet1` will contain the results of `select * from repos;`
- `Sheet2` will contain the results of `select * from gists;`

The first row of each sheet will contain a header with the columns names.

#### Protip
Add aliases to your queries to get a header with "human readable" columns names.

E.g.

```
 > select id as 'Repo Id', owner_id as 'Owner Id' from repos;
```
