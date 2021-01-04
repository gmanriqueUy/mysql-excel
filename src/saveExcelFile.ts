import XLSX from "xlsx";

import { QueryResult } from "./mysqlExcelAction";

const saveExcelFile = (fileName: string, data: QueryResult[]) => {
  const wb = XLSX.utils.book_new();

  data.forEach(([queryResult]) => {
    const ws = XLSX.utils.json_to_sheet(queryResult);

    ws["!cols"] = Object.keys(queryResult[0]).map((key) => ({
      wch: queryResult.reduce(
        (maxLength, row) =>
          row[key]
            ? Math.max(maxLength, row[key].toString().length)
            : maxLength,
        key.length
      ),
    }));

    XLSX.utils.book_append_sheet(wb, ws);
  });

  XLSX.writeFile(wb, fileName);
};

export default saveExcelFile;
