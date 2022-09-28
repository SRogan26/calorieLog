import { useContext } from "react"
import { userContext } from "./userContext"

export default function Navbar() {
    const [activeUser] =useContext(userContext);
    return (
        <div className="navbar">
            <h1>Welcome to Your Calorie Log</h1>
            {activeUser.name && <div className="who">Hello, {activeUser.name}</div>}
        </div>
    )
}