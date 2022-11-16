import React, {useContext} from 'react'
import Img from "../img/Img.png"
import Attach from "../img/Attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { uuidv4 } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Input = () => {


  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if (img) {

      const storageRef = ref(storage, uuidv4());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (err) => {

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              })
            });

          });
        }
      )
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
    }

    await updateDoc(doc(db,"userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db,"userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });


  }

 

  return (
    <div className='input'>
      <input type="text" placeholder='Type something' onChange={e => { setText(e.target.value) }} value={text} />
      <div className='send'>
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" onChange={e => { setImg(e.target.value.files[0]) }} />
        <label htmlFor="file">
          <img src={Img} alt="img"></img>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input