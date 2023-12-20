import { useState } from 'react';
import {io} from 'socket.io-client'
import Chats from './Chats';
import './index.css'
const socket =io.connect('http://localhost:3001');

function App() {

  const [username,setUsername]=useState('');
  const [room,setRoom]=useState('');
  const [showChat,setShowChat]=useState(false);
  const joinRoom=()=>{
    if(username!==' ' && room!=='')
    {
      socket.emit('join_room',room)
      setShowChat(true);
    }
  }
  return (
    <div class='container'>
    {
      !showChat ?
      (
      <div class='joinChat'>
      <h1 style={{textAlign:'center',fontFamily:'monospace',color:'violet'}}>Join Chat</h1>
      <input class='inputText' placeholder='Enter your name...' type='text' onChange={e=>setUsername(e.target.value)}/>
      <input class='inputText' placeholder='Enter room id..' type='text' onChange={e=>setRoom(e.target.value)}/>
      <button class='btn' onClick={joinRoom}>Join a room</button>
      </div>
      )
    :
      (<Chats socket={socket} username={username} room={room}/>)
    }
    </div>
  )
}

export default App
