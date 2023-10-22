import React, { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
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
      <button className="bg-gradient-to-r text-white flex bg-violet-400 hover:bg-violet-500 font-bold py-4 px-6 rounded-lg" onClick={inviteFriend}>
        <HiOutlineMailOpen className="mr-3 h-5 w-5" />
        <p className="font-semibold">Invite</p>
      </button>
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
