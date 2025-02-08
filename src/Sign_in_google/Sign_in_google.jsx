import React, { useState } from 'react'

import { GoogleAuthProvider,signInWithPopup,getAuth,signOut } from 'firebase/auth';
import {app} from '../firebase/firebase';


const sign_in_google = () => {
   
    const [userInfo, setUserInfo] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
   

    const GoogleIBtn =  () =>{
        signInWithPopup(auth, provider)
        .then(result =>{
            const userInfo = result.user;
            console.log(userInfo);
            setUserInfo(userInfo)
        })
    }
    const signOutBtn = () => {
       signOut(auth)
       .then((result)=>{
        setUserInfo(null)
       }).catch((Error)=>{
        console.log(Error);
       })
    }
 
  return (
    <div className='flex justify-center items-center flex-col mt-20'>
           {
            userInfo && <div>
                <img src={userInfo.photoURL} alt="user images" />
                <p>user name: {userInfo.displayName}</p>
                <p>user email: {userInfo.email}</p>

            </div>
        }
        
       {
        userInfo ? <button onClick={signOutBtn} className='bg-red-400 p-4 text-white text'>LOG OUT</button>:<button onClick={GoogleIBtn} className='bg-red-400 p-4 text-white text-2xl mb-5'>Sign in with Google</button>

       }

     
        
    </div>
  )
}

export default sign_in_google