import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chats = ({socket,username,room}) => {
    const [msg,setMsg]=useState('');
    const [text,setText]=useState([])
    const sendMsg=async()=>{
        if(msg!=='')
        {
            const msgData={
                room:room,
                username:username,
                message:msg,
                time:new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message',msgData);
            setText((text)=>[...text,msgData])
            setMsg('');
        }
    }
    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            setText((text)=>[...text,data]);
        })
    },[socket])
  return (
    <div class='liveChat'>
       <div style={{color:'white',textAlign:'center',fontSize:'20px',backgroundColor:'violet'}}>
       <p >Live Chat</p>
       </div>
       <ScrollToBottom  className='messageContainer'>
       <div className='chat-body'>
       {
        text.map(m=>{
            return(
                <div id={username===m.username? "you" : "other"}>
                <div>
                    <div class='mainText'>
                        <p>{m.message}</p>
                    </div>
                    <div className='info'>
                        <p>{m.username}</p>
                        <p>{m.time}</p>
                    </div>
                </div>
                </div>
            )
        })
       }
       </div>
       </ScrollToBottom>
       <div>
        <input class='chatFooter' type='text' value={msg} placeholder='Write messages...' onChange={e=>setMsg(e.target.value)}
        />
        <button class='footerBtn' onClick={sendMsg}>&#9658;</button>
       </div>
    </div>
  )
}

export default Chats