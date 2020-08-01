import React, { useState, useRef } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import fetchInterface from '../custom_hooks/fetchInterface';
import SendIcon from '@material-ui/icons/Send';

function MessageInputBox(props: any) {
  const [message, setMessage] = useState<string>("");
  const [isMessageValid, setIsMessageValid] = useState<boolean>(true);

  function handleButton() {
    if (message.length > 0) //don't want a warning for length 0
      if (message.length < 251) {
        const body = JSON.stringify({
          id_user: props.user.id_user,
          id_channel: props.activeChannel.id_channel,
          message: message
        });
        fetchInterface(`/channels/messages/new`, "post", body)
          .then((data)=>{
            console.log(data);
          })
        const socketBody = {
          id_user: props.user.id_user,
          username: props.user.username,
          message: message,
          time: new Date().toLocaleString('en-GB')
        };
        props.socket.emit("new message", socketBody);
        setMessage("");
      } else {
        setIsMessageValid(false);
        setTimeout( () => setIsMessageValid(true), 1000);
      }
  }
  function handleKeyPess( e: any ){
    if(e.key === "Enter")
      handleButton();
  }
  return(
    <div className="message-area__input">
      <TextField
        className="message-area__input-tf"
        id="outlined-full-width"
        placeholder="Type your message"
        fullWidth
        margin="dense"
        variant="outlined"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        onKeyPress={(e)=>handleKeyPess(e)}
        error={!isMessageValid}
        helperText={ isMessageValid ? "" : "Message too long!" }
        autoFocus={true}
        inputRef={props.msgInputRef}
      />
      <IconButton onClick={handleButton} className="icon__send">
        <SendIcon />
      </IconButton>
    </div>
  );
}

export default MessageInputBox;