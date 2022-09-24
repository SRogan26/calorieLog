import { useContext } from "react"
import { userContext } from '../components/userContext'

export default function Home() {
    const [activeUser] = useContext(userContext)

    return (
        <div>
            User {activeUser.id}! Hello, {activeUser.name}!
        </div>
    )
}