import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
function App() {
  
  const [listUser, setListUser] = useState(null);

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [username,setUsername] = useState('');
  
  
  useEffect(()=>{
    const fetchData = async () =>{
      const data =await axios.get('http://localhost:3001/getUsers').then((res)=>res.data);
      setListUser(data)
    }
    fetchData();
  },[listUser])

  const submitFn = () =>{
    axios.post("http://localhost:3001/createUser",{
        name: name,
        age: age,
        username: username
    }).then((res)=>{
      setListUser([...listUser,{
        name: name,
        age: age,
        username: username
      }])
      alert("user is successfully created");
    })
  }

  const deleteBtn = () =>{
    
  }

  return (
    <div className="App">
       <h1>Helloworld</h1>
       <div className='userDisplay'>
          {listUser?.map((item)=>(
            <p key={[item.id,item.name]}>{item.name} {item.age} - {item.username} <button onClick={deleteBtn}>x</button></p>
          ))}
       </div>

       <div>
        <input type="text" name="name" placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}} /> <br/><br/>
        <input type="number" name="age" placeholder='age' value={age} onChange={(e)=>{setAge(e.target.value)}} /> <br/><br/>
        <input type="text" name="username" placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} /> <br/><br/>
        <button type="button" onClick={submitFn}>Submit</button>
       </div>
    </div>
  );
}

export default App;
