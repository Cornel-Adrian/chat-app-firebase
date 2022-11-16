import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, setDoc, updateDoc, doc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");


  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const handleSearch = async () => {
    // Create a query against the collection.
    const queryUsers = query(collection(db, "users"), where("displayName", "==", username));


    try {
      const querySnapshot = await getDocs(queryUsers);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (err) {

      setErr(true);
    }

  }


  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async (user) => {
    //check if the group exists in firestore exists, if not create

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        // create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

      }

    } catch (err) {
      setErr(err);
    }

    dispatch({ type: "CHANGE_USER", payload: user })
    setUser(null);
    setUsername("");
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username} />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className='userChat' onClick={() => handleSelect(user)}>
        <img src={user.photoURL} alt=""></img>
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
        </div>
      </div>
      }
    </div>
  )
}

export default Search