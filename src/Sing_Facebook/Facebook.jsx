import React from 'react'
import { useState } from 'react';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {app} from '../firebase/firebase';
const Facebook = () => {
    const [userInfo, setUserInfo] = useState(null);

    const auth = getAuth(app);
    const provider = new GithubAuthProvider();
   

const handleFacebookLogin =  () => {
    signInWithPopup(auth,provider)
    .then ((result)=>{
        const user = result.user;
        setUserInfo(user)
        console.log(user);
    }).catch((Erro)=>{
        console.log(Erro);
    })
}

  return (
    <div className='flex justify-center items-center flex-col mt-20'>
        {
            userInfo && <div className='bg-gray-200 p-4 rounded-md'>
                <img src={userInfo.photoURL} alt="" />
                <h2 className='text-lg font-bold'>Welcome {userInfo.displayName}</h2>
               
               
            </div>
        }
        <button onClick={handleFacebookLogin} className='border-2 p-2 cursor-pointer'>Github Login</button>
    </div>
  )
}

export default Facebook