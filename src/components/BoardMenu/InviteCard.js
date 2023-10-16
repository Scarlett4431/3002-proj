import React, { useState } from "react";
import { Button } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import PromptModal from "../PromptModal";
import { addUserToBoard } from "../../actions";
import { useDispatch } from "react-redux";

function InviteCard({boardID}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const dispatch = useDispatch();
  const cancel = () => {
    setIsModalOpen(false);
  };

  const inviteFriend = () => {
    setPromptMessage("Enter email of the friend");
    setIsModalOpen(true);
  };

  const confirmAction = (inputValue) => {
    setIsModalOpen(false);
    inputValue = inputValue.trim();
    if (inputValue.length > 0 && inputValue.length < 50) {
      dispatch(addUserToBoard(inputValue, boardID));
  }
  };

  return (
    <div>
      <Button size="xl" gradientDuoTone="purpleToPink" onClick={inviteFriend}>
        <HiUserCircle className="mr-3 h-4 w-4" />
        <p>Invite</p>
      </Button>
      <PromptModal
        open={isModalOpen}
        type="invite"
        placeholder={"Example@gmail.com"}
        message={promptMessage}
        onConfirm={confirmAction}
        onCancel={cancel}
        requiresInput
      />
    </div>
  );
}

export default InviteCard;
