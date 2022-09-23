import '../App.css';
import { Link } from 'react-router-dom';

function UsersList(props) {
    return (
        <ul className="userList">
            {props.userList.map(user => {
                return (
                    <li className="user" key={user.person_id}>
                        <Link to={`/home/${user.person_id}`}>
                            {user.name}
                            </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default UsersList;