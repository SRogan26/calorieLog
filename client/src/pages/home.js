import { useContext } from "react"
import { userContext } from '../components/userContext'
import ItemSelection from "../components/home/itemSelect"

export default function Home() {
    const [activeUser] = useContext(userContext)

    return (
        <div className="dashboard">
            <ItemSelection />
        </div>
    )
}