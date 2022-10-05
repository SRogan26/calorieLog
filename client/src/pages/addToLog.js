import { useContext } from "react"
import { userContext } from '../components/userContext'
import ItemSelection from "../components/addToLog/itemSelect"

export default function AddItem() {
    const [activeUser] = useContext(userContext)

    return (
        <div className="dashboard">
            <ItemSelection />
        </div>
    )
}