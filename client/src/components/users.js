import '../App.css';

function UsersList (props) {
    return (
        <ul className="userList">
    {props.userList.map(user => {
        return <li className="user" key={user.person_id}>
            {user.name}
            </li>
    })}
    </ul>
    )
}

export default UsersList;