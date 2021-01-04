#!/usr/bin/env node

import { Command } from "commander";

import mysqlExcelAction from "./mysqlExcelAction";

const packageJson = require('../package.json');

const program = new Command();

program
  .name("mysql-excel")
  .version(packageJson.version, "-v, --version", "Output version and exit")
  .helpOption("-H, --help", "Display application help")
  .requiredOption("-h, --host <host>", "Host to connect to", "localhost")
  .requiredOption("-u, --user <user>", "User for login")
  .requiredOption(
    "-p, --password <password>",
    "Password to use when connecting to the server"
  )
  .requiredOption("-d, --database <database>", "Database to query")
  .option("-P, --port [port]", "Port of the server", "3306")
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ mysql-excel -v');
    console.log('  $ mysql-excel -H');
    console.log('  $ mysql-excel -u octocat -p tentacles -d github');
    console.log('  $ mysql-excel -u octocat -p tentacles -d github -h 127.0.0.1 -P 33066');
  })
  .action(mysqlExcelAction);

if (process.argv.length === 2) {
  program.help();
} else {
  program.parse();
}
