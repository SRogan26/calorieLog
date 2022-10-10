import { useContext } from "react"
import { itemContext } from "./itemContext"

export default function TimeInput() {
    const { setDate, setTime } = useContext(itemContext)

    const handleDay = () => {
        const logDay = document.getElementById('day')
        setDate(logDay.value);
    }

    const handleTime = () => {
        const logTime = document.getElementById('time')
        setTime(logTime.value);
    }

    return (
        <div id="date-time" style={{ display: 'flex' }}>
            <div>
                <label htmlFor="day" > What Day?</label>
                <input type="date" id="day" onChange={() => handleDay()} />
            </div>
            <div>
                <label htmlFor="time"> What Time?</label>
                <input type="time" id="time" onChange={() => handleTime()} />
            </div>

        </div>
    )
}