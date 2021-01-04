import XLSX from "xlsx";

import { QueryResult } from "./mysqlExcelAction";

const saveExcelFile = (fileName: string, data: QueryResult[]) => {
  const wb = XLSX.utils.book_new();

  data.forEach(([queryResult]) => {
    const ws = XLSX.utils.json_to_sheet(queryResult);

    ws["!cols"] = Object.keys(queryResult[0]).map((key) => ({
      wch: Math.max(
        key.length,
        ...queryResult.map((row) => (row[key] ? row[key].toString().length : 0))
      ),
    }));

    XLSX.utils.book_append_sheet(wb, ws);
  });

  XLSX.writeFile(wb, fileName);
};

export default saveExcelFile;
