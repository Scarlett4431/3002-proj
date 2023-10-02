"use client";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import BoardPool from './BoardPool';

export default function BoardCollection() {
  const auth = useSelector((state) => state.auth);
  
  if (auth.isLoading) {
    console.log("Loading BoardCollection...");
    return <div />;
  } else if (auth.isAuthenticated) {
    return (
      <div className="p-10 bg-gray-200 min-h-75vh">
        <h2 className="text-2xl mb-4 text-center">YOUR BOARDS</h2>
        <BoardPool />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}
