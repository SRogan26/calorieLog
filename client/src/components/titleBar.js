import { useContext } from "react"
import { userContext } from "./userContext"

export default function TitleBar() {
    const [activeUser] =useContext(userContext);
    return (
        <div className="title-bar">
            <h1>Welcome to Your Calorie Log</h1>
            {activeUser.name && <div className="who">Hello, {activeUser.name}</div>}
        </div>
    )
}