import { useContext } from "react"
import { userContext } from "./userContext"
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [activeUser] =useContext(userContext);
    return (
        <div id="navigator">
        <Link to={`/home`}>HOME</Link>
        <Link to={`/add`}>ADD TO LOG</Link>
        </div>
    )
}