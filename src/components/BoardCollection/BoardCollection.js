"use client";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BoardPool from './BoardPool';
export default function BoardCollection() {
  const auth = useSelector((state) => state.auth);
  
  if (auth.isLoading) {
    console.log("Loading BoardCollection...");
    return <div/>;
  } else if (auth.isAuthenticated) {
    return (
      <div class="container bg-white bg-opacity-40 mx-auto w-3/5 rounded-3xl py-10">
        <h2 className="text-2xl mb-7 text-center text-indigo-950 font-bold">MY BOARDS</h2>
        <BoardPool />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}