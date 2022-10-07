import { useState, useEffect, useContext } from 'react';
import UsersList from '../components/landing/users';

function Landing () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch("http://localhost:3001/api/users")
        .then(res => res.json())
        .then(userList => {
          setUsers(userList.data)
        })
        .catch(err => console.log(err))
    }, []);
  
    return (
      <div className="landing" >
        {users.length > 0 && <UsersList userList={users} />}
      </div>
    );
}

export default Landing;