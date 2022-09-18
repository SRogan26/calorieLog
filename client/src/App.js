import './App.css';

function fetchUsers (){
  fetch("http://localhost:3001/api/users")
  .then(res => res.json())
  .then(users => console.log(users))
}

function App() {
  return (
    <div className="App">
     <h1>What Up Yo</h1>
     <h3>Deez</h3>
     <button onClick={() => fetchUsers()}>Button</button>
    </div>
  );
}

export default App;
