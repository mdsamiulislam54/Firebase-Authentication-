import React from "react";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  PhoneAuthProvider,
 
} from "firebase/auth";
import { app } from "../firebase/firebase";
import { use } from "react";
import { useState } from "react";

const Sign_in_google = () => {
  const [user, setUser] = React.useState(null);
  const auth = getAuth(app);
  const Gprovider = new GoogleAuthProvider();
  const Giprovider = new GithubAuthProvider();
  const Phprovider = new PhoneAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, Gprovider).then((result) => {
        console.log(result);
        setUser(result.user);
      });
    } catch {
      alert("error");
    }
  };
  const handleGithubSignIn = async () => {
    try {
      signInWithPopup(auth, Giprovider).then((result) => {
        console.log(result);
        setUser(result.user);
      });
    } catch {
      alert("error");
    }
  };
  const handleLogout =()=>{
      signOut(auth).then(()=>{
        setUser(null)
        alert("signout successfully")
      })
      .catch(()=>{
        alert("error")
      })
        
      
  }
 

  

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        {user && (
          <div>
            <img src={user.photoURL} alt="" />
            <h1>{user.displayName}</h1>
            <p>{user.email}</p>
          </div>
        )}
   <button onClick={handleGoogleSignIn} className="p-2 bg-teal-300">Google Sign In</button>
   <button onClick={handleGithubSignIn} className="p-2 bg-teal-300 ml-2">Github Sign In</button>
   <button onClick={handleLogout} className="p-2 bg-teal-300 ml-2">Logout</button>
        
      </div>
    </>
  );
};

export default Sign_in_google;
