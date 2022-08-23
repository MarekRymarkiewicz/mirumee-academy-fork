import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState } from "react";
import styles from "./Table.module.css";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  data: Array<Object>,
  showKeyColumn?: boolean,
  separateHeaderWords?: boolean,
}

interface TableCell {
  key: string,
  value: string | string[] | number | number[],
}

// Table styles
const tableClasses = `${styles.table}`;
const tableHeadClasses = `${styles.tableHead}`;
// const tableBodyClasses = `${styles.tableBody}`;
const tableRowClasses = `${styles.tableRow}`;
const tableCellClasses = `${styles.tableCell}`;
const tableHeaderClasses = `${styles.tableHeader}`;
// const Classes = `${styles.}`;
// Table wrapper styles
const tableWrapperClasses = `${styles.tableWrapper}`
// Table sort arrow styles
const tableSortContainerClasses = `${styles.tableSortContainer}`
const tableSortArrowClasses = `${styles.tableSortArrow}`
const tableActiveSortAscClasses = `${styles.tableActiveSortAsc}`
const tableActiveSortDescClasses = `${styles.tableActiveSortDesc}`
// Responsive classes
const MobileOnlyClasses = `${styles.tableCell} ${styles.mobileOnly}`

export const Table: React.FunctionComponent<TableProps> = ({ data, showKeyColumn=false, separateHeaderWords=false, ...props }) => {
  // Array of all keys in data
  const headers = Array.from(getKeys())
  // Table state
  const [tableData, setTableData] = useState({data: parseData(), sortBy: "", sortAsc: true})

  // Get keys from data object props
  function getKeys(): Set<string> {
    let keys = new Set<string>()
    for(const row of data) {
      Object.keys(row).map((col) => (
        (keys.add(col))
      ))
    }
    return keys
  }

  // Data parser
  function parseData(): Array<TableCell[]> {
    const newTableData = new Array<TableCell[]>();
    const keys = headers;

    // Remove id column if not desired
    (!showKeyColumn && (
      keys.splice(keys.indexOf("id"),1)
    ))
    
    for(const row of data) {
      const rowArray = new Array<TableCell>();
      for(const header of headers) {
        let newCell = {} as TableCell;

        newCell.key = header;
        /* @ts-ignore */
        newCell.value = row[header];

        rowArray.push(newCell);
      }
      newTableData.push(rowArray);
    }
    return newTableData;
  }

  // Function returning string with words separated by capital letters
  function separateWords(header:string): string {
    let newHeader = header;
    newHeader = separateHeaderWords ? newHeader.replace(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/g, " ") : newHeader;
    return newHeader;
  }

  function handleHeaderClick(header:string): void {
    let sortedTable = tableData;

    // Check if clicked header was already active
    if(header === tableData.sortBy) {
      // Reverse sorting order if actove header was clicked
      sortedTable.sortAsc = !sortedTable.sortAsc;
    }
    else {
      // Set new sorting column with ascending order
      sortedTable.sortBy = header;
      sortedTable.sortAsc = true;
    }

    const order = sortedTable.sortAsc? 1 : -1;
    const headerIndex = headers.indexOf(header)
    sortedTable.data.sort((a,b) => (a[headerIndex].value > b[headerIndex].value? order : order * -1))
    setTableData({...sortedTable});
  }

  return (
    <div className={tableWrapperClasses}>
      <table className={tableClasses} {...props}>
        <thead className={tableHeadClasses}>
          <tr key={"headerRow"} className={tableRowClasses}>
            <>
            {headers.map((header) => (
            <th key={header} onClick={()=>(handleHeaderClick(header))} className={`${tableHeaderClasses} ${header===tableData.sortBy? (tableData.sortAsc?tableActiveSortAscClasses:tableActiveSortDescClasses) : ""}`}>
              {separateWords(header)}
              <div className={tableSortContainerClasses}>
                <div className={tableSortArrowClasses}></div><div className={tableSortArrowClasses}></div>
              </div>
            </th>))}
            </>
          </tr>
        </thead>
        <tbody>
        {tableData.data.map((row, index) => (
          <tr key={index} className={tableRowClasses}>
            {row.map((col,colIndex) => (
              <React.Fragment key={`cellgroup:${colIndex}`}>
              <td key={colIndex} className={MobileOnlyClasses}>{separateWords(headers[colIndex])}</td>
              <td key={col.key} className={tableCellClasses}>
                {Array.isArray(col.value)? col.value.join(", ") : col.value}
              </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    
  )
}