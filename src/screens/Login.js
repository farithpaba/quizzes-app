import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { setGlobalUserRedux } from '../redux/newGlobalUserSlice';

export default function Login() {

  const dispatch = useDispatch();

  function Login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    if (user === "admin") {
      dispatch(setGlobalUserRedux("admin"))
    } else {
      dispatch(setGlobalUserRedux("student"))
    }
  }

  return (
    <div className="flex h-screen ">
      <form className='flex flex-col m-auto '>
        <h1 className="textColorCustom font-extralight text-8xl ">Quizzes</h1>
        <br />
        <input
          id='user'
          placeholder='User'
          type='text'
          className="rounded-2xl focus:outline-none focus:boderColorCustom border border-solid  p-2 mb-2"
        />

        <input
          id='password'
          placeholder='Password'
          type='password'
          className="rounded-2xl focus:outline-none focus:boderColorCustom border border-solid p-2"
        />
        <br />
        <button
          onClick={() => Login()}
          className="bgColorCustom text-white rounded-full px-5 py-2 hover:scale-95 duration-100"
        >
          Login
        </button>
      </form>
    </div>

  )
}
