import React from "react";
import data from "./test.json"
import Userchat from "./Userchat.js";
import { ref, set } from "firebase/database";
import "../App.css"
import GameContext from "../gameContext.js";
import { db }from "../firebase.js";

const sendChat = (e, message, lobby_id) => {
    e.preventDefault();
    const time = Date.now()
    if (message.trim() !== '') {
        const messageRef = ref(db, `lobbies/${lobby_id}/chat/${time}`);
        set(messageRef,{
            sender: "user",
            message: message,
        });
    }
}

const Chat = () => {
    const [message, setMessage] = React.useState(null);
    const { lobby_id } = React.useContext(GameContext);
    const msgData = data;
    return (
        <div className="Chat">
            <div className="Chat-mbox">
                {msgData.map(( user, index ) => (                
                    <Userchat key={index} data={user} classname={`Chat-message${index % 2 === 1 ? 1:""}`} />
            ))}
            </div>
            <div className="Chat-input">
                <form onSubmit={(e) => sendChat(e, message, lobby_id)}>
                    <input type="text" autoComplete='off' value={message} onChange={(e) => setMessage(e.target.value)}/>
                </form>
            </div>
        </div>
    )
};

export default Chat;