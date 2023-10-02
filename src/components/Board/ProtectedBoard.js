import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Board from './Board';


export default function ProtectedBoard() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.isLoading);
  
    if (isLoading) {
      return <div>Loading...</div>; 
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
  
    return <Board />;
}