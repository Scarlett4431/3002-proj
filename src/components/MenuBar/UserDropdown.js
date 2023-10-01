import React from "react";
import { Dropdown, Avatar } from "flowbite-react";

import { logoutUser } from "../../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";

export default function UserDropdown() {

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    dispatch(logoutUser());
    navigate('/signin');
  };

  if(auth.isAuthenticated && !auth.isLoading && (auth.user !== undefined)){
    return (
      <div>
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{auth.user.displayName}</span>
            <span className="block truncate text-sm font-medium">
              {auth.user.email}
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item onClick = {handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    );
  }
  else{
    return <div />;
  }
}
