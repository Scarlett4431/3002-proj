"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BoardPool from './BoardPool';
import GuidedTour from './BoardTour';
import { finishTutorial,fetchNewcomerStatus } from '../../actions/auth';


export default function BoardCollection() {
  const auth = useSelector((state) => state.auth);
  const [showTour, setShowTour] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch newcomer status when the component mounts

    dispatch(fetchNewcomerStatus());

    console.log("authentication");
    console.log("Newcomer Status:", auth.newcomerStatus);
    console.log("authentication end");

    // Check newcomer status and set showTour accordingly
    if (auth.newcomerStatus) {
      setShowTour(true);
    }
  }, [auth.newcomerStatus]);

  const handleTourComplete = () => {
    // Dispatch action to finish tutorial and update newcomer flag
    //dispatch(finishTutorial()); #bug here when dispatching finishTutorial() boardpool fails to load again
    setShowTour(false);
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
        {showTour && <GuidedTour onComplete={handleTourComplete} />}
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}