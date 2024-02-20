import styles from './table.module.scss';

//listData is the list of data append to the table
//each element of data is a list of data respective the tableHeaders
const Table = ({ listData = [], 
                tableHeaders = [],
                divClassName='' }) => {
    return (
        <table className={`${divClassName} ${styles.table}`}>
            <thead className='bg-component-darker'>
                <tr >
                    {tableHeaders.map( (value, index) => (
                        <th key={index} className='text'>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listData.map( (row, index) => (
                    <tr key={index}>
                        { row.map( (value, index) => (
                            <td scope="row" key={index}>{value}</td>
                        ))}
                    </tr> 
                ))}
            </tbody>
        </table>
    )
}

export default Table;
