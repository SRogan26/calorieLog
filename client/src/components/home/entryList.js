export default function EntryList(props) {
    return (
        <ul>
            {props.entries.map(entry => {
                return (
                    <li key={entry.entry_id} className="logEntry">
                        Date: {new Date(entry.time_log).toLocaleString()}{"\t"}
                        Brand: {entry.Brand}{"\t"}
                        Item: {entry.Item}{"\t"}
                        Calories: {entry.calories}{"\t"}
                        Fat: {entry.fat}{"\t"}
                        Carbs: {entry.carbs}{"\t"}
                        Protein: {entry.protein}
                    </li>)
            })}
        </ul>
    )
}