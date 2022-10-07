import { userContext } from "./userContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

export default function TitleBar() {
    const [activeUser, setActiveUser] = useContext(userContext);
    return (
        <div className="title-bar">
            {activeUser.name &&
                <div className="who">
                    <div id="activeUser">Hello, {activeUser.name}</div>
                    <Link to={`/`} onClick={() => setActiveUser({ id: null, name: null })}>LOG OUT</Link>
                </div>}
            <h1 id="welcome">Welcome to Your Calorie Log</h1>
        </div>
    )
}