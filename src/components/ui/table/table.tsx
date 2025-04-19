import React, { ReactNode } from 'react';
import styles from './table.module.scss';

interface TableProps {
    /** List of table rows data to display in the table */
    listData?: ReactNode[][];
    /** Headers for the table columns */
    tableHeaders?: ReactNode[];
    /** Additional class name for the table */
    divClassName?: string;
}

const Table: React.FC<TableProps> = ({
    listData = [],
    tableHeaders = [],
    divClassName = ''
}) => {
    return (
        <table className={`${divClassName} ${styles.table}`}>
            <thead className={styles.tableHeader}>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index} className={`text ${styles.headerCell}`}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listData.length === 0 ? (
                    <tr>
                        <td 
                            colSpan={tableHeaders.length}
                            className={styles.emptyCell}
                        >
                            <span className="text">No data available</span>
                        </td>
                    </tr>
                ) : (
                    listData.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex}
                            className={rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow}
                        >
                            {row.map((cell, cellIndex) => (
                                <td 
                                    key={cellIndex}
                                    className={styles.cell}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default Table;