import React from 'react';
import { DataTable, Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from 'carbon-components-react';

import './table.scss';

const StatusTable = (props) => {
    const headerData = [
        {
           header: 'Activity',
           key: 'taskName'
         },
         {
           header: 'Status',
           key: 'status'
         },
         {
           header: 'Timestamp',
           key: 'updatedDateTime'
         }
       ];
       
    const rowData = props.tableData;

    return (
        <DataTable rows={rowData} headers={headerData}>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                // <TableContainer title="DataTable">
                <Table {...getTableProps()}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader {...getHeaderProps({ header })}>
                                    {header.header}
                                </TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow {...getRowProps({ row })}>
                                {row.cells.map((cell) => (
                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                // </TableContainer>
            )}
        </DataTable>
    );
}

export default StatusTable;