import { useState, useEffect } from 'react';
import UsersList from '../components/users';

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
      <div className="App" >
        <h1>Welcome to Your Calorie Log</h1>
        <h2>Who Is It?</h2>
        {users.length > 0 && <UsersList userList={users} />}
      </div>
    );
}

export default Landing;