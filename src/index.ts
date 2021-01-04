#!/usr/bin/env node

import { Command } from "commander";

import mysqlExcelAction from "./mysqlExcelAction";

const packageJson = require('../package.json');

const program = new Command();

program
  .name("mysql-excel")
  .version(packageJson.version, "-v --version", "Output version and exit")
  .helpOption("-H --help", "Display application help")
  .requiredOption("-h, --host <host>", "Host to connect to", "localhost")
  .requiredOption("-u --user <user>", "User for login")
  .requiredOption(
    "-p --password <password>",
    "Password to use when connecting to the server"
  )
  .requiredOption("-d --database <database>", "Database to query")
  .option("-P --port [port]", "Port of the server", "3306")
  .action(mysqlExcelAction);

if (process.argv.length === 2) {
  program.help();
} else {
  program.parse();
}
