export default function EntryList(props) {
    return (
        <table className="table">
            <thead className="table-head">
                <tr>
                <th>Date: </th>
                <th>Brand: </th>
                <th>Item: </th>
                <th>Calories: </th>
                <th>Fat: </th>
                <th>Carbs: </th>
                <th>Protein: </th> 
                </tr>              
            </thead>
            <tbody>
            {props.entries.map(entry => {
                return (
                    <tr key={entry.entry_id} className="logEntry">
                        <td>{new Date(entry.time_log).toLocaleString()}</td>
                        <td>{entry.Brand}</td>
                        <td>{entry.Item}</td>
                        <td>{entry.calories}</td>
                        <td>{entry.fat}</td>
                        <td>{entry.carbs}</td>
                        <td>{entry.protein}</td>
                    </tr>)
            })}
            </tbody>
        </table>
    )
}