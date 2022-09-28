import { useState, useEffect, useContext } from 'react';
import { userContext } from '../components/userContext';
import UsersList from '../components/users';

function Landing () {
    const [users, setUsers] = useState([]);
    const [activeUser] = useContext(userContext);

    useEffect(() => {
      fetch("http://localhost:3001/api/users")
        .then(res => res.json())
        .then(userList => {
          setUsers(userList.data)
        })
        .catch(err => console.log(err))
    }, []);
  
    return (
      <div className="App" >
        {users.length > 0 && <UsersList userList={users} />}
        {activeUser.id && <div>Current User: #{activeUser.id}, {activeUser.name}</div>}
      </div>
    );
}

export default Landing;