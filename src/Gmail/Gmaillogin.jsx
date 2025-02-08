import React from 'react'
import {app} from '../firebase/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const Gmaillogin = () => {
    const auth = getAuth(app)
    const formHandle = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        console.log(email,password);
        createUserWithEmailAndPassword(auth, email, password,name).then((res)=>{
            console.log(res.user);
            alert("User created successfully");
        }).catch((ree)=>{
            console.log(ree);
        })
    }

  return (
    <div>
        
        <div className='flex justify-center items-center mt-14'>
            <form onSubmit={formHandle} action="" className='flex flex-col gap-5'>
            <input type="text" name="name" id="" placeholder='Enter Your name'  className='border-2 px-2'/>
                <input type="email" name="email" id="" placeholder='Enter Your Email'  className='border-2 px-2'/>
                <input type="password" name="password" id="" placeholder='Enter Your Email'  className='border-2 px-2'/>
                <input type="submit"  className='border-2 px-2'/>
            </form>
        </div>
    </div>
  )
}
