import { ReactNode } from 'react';
import styles from './table.module.scss';

interface TableProps {
    /** List of table rows data to display in the table */
    listData?: ReactNode[][];
    /** Headers for the table columns */
    tableHeaders?: ReactNode[];
    /** Additional class name for the table */
    divClassName?: string;
}


const Table : React.FC<TableProps> = ({
    listData = [],
    tableHeaders = [],
    divClassName = ''
}) => {
    return (
        <table className={`${divClassName} ${styles.table}`}>
            <thead className='bg-component-darker'>
                <tr>
                    {tableHeaders.map((value, index) => (
                        <th key={index} className='text'>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listData.map((row, index) => (
                    <tr key={index}>
                        {row.map((value, index) => (
                            <td scope="row" key={index}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;