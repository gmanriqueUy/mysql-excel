import { action } from "commander";
import { prompt } from "inquirer";
import { Connection, RowDataPacket, FieldPacket } from "mysql2/promise";

import { getConnection } from "./helpers";
import saveExcelFile from "./saveExcelFile";

type CommanderAction = Parameters<typeof action>[0];
export type QueryResult = [RowDataPacket[], FieldPacket[]];

const isExit = (query: string): boolean =>
  ["exit", "exit;"].includes(query.toLowerCase());

const getQueryValidator = (connection: Connection) => async (query: string) => {
  if (isExit(query)) {
    return true;
  }

  if (!query) {
    return false;
  }

  if (!query.toLowerCase().startsWith("select")) {
    return "Only select queries are allowed";
  }

  try {
    // If mysql can explain the query, then it's a valid query
    await connection.query(`explain ${query}`);

    return true;
  } catch (error) {
    return error.sqlMessage;
  }
};

const mysqlExcelAction: CommanderAction = async ({
  host,
  port,
  user,
  password,
  database,
}) => {
  const connection = await getConnection({
    host,
    port,
    user,
    password,
    database,
  });

  console.log(`Using database '${database}'.
Write a query below:
`);

  const validateQuery = getQueryValidator(connection);
  const results: QueryResult[] = [];

  while (true) {
    const { query } = await prompt([
      {
        name: "query",
        prefix: "",
        message: ">",
        validate: validateQuery,
      },
    ]);

    if (isExit(query)) {
      break;
    }

    const [data, fields] = await connection.query(query);

    results.push([data as RowDataPacket[], fields]);
  }

  await connection.end();

  if (!results.length) {
    console.log("Bye!");
    return;
  }

  console.log("\n");

  const { fileName } = await prompt([
    {
      name: "fileName",
      message: "Enter the name of the excel file:",
    },
  ]);

  await saveExcelFile(fileName, results);

  console.log(`${fileName} successfully created!`);
};

export default mysqlExcelAction;
