import { Link } from 'react-router-dom';
import { useContext } from "react"
import { userContext } from '../userContext'

function UsersList(props) {
    const [activeUser, setActiveUser] = useContext(userContext);
    return (
        <ul className="userList">
            {props.userList.map(user => {
                let isActive = false;
                if(user.person_id === activeUser.id) isActive = true;
                return (
                    <li className="user" key={user.person_id}>
                        <Link to={`/home`} onClick={()=>setActiveUser({id:user.person_id, name: user.name})}>
                            {user.name}
                        {isActive && <div>(Active)</div>}
                            </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default UsersList;