import React from "react";
import { Dropdown, Avatar } from "flowbite-react";

import { logoutUser } from "../../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function UserDropdown(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    dispatch(logoutUser());
    navigate('/signin');
  };

  if(props.isAuthenticated && !props.isLoading){
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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
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
  else return <div />;

}

export default UserDropdown;
