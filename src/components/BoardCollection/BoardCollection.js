"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BoardPool from './BoardPool';
import GuidedTour from './BoardTour';
import { finishTutorial,fetchNewcomerStatus } from '../../actions/auth';


export default function BoardCollection() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleTourComplete = () => {
    // Dispatch action to finish tutorial and update newcomer flag
    dispatch(finishTutorial(auth.user.uid));
  };

  
  if (auth.isLoading) {
    console.log("Loading BoardCollection...");
    return <div/>;
  } else if (auth.isAuthenticated) {
    return (
      <div class="container bg-white bg-opacity-40 mx-auto w-3/5 rounded-3xl py-10">
        <h2 className="text-2xl mb-7 text-center text-indigo-950 font-bold">MY BOARDS</h2>
        <BoardPool />
        {/* Show guided tour if the user is a newcomer */}
        {auth.newcomerStatus && <GuidedTour onComplete={handleTourComplete} />}
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}