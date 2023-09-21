import React,{ useState } from "react";
import { Button } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import PromptModal from "../PromptModal";

function InviteCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");

  const cancel = () => {
    setIsModalOpen(false);
  };


  const inviteFriend = () => {
    setPromptMessage("Enter email of the friend");
    setIsModalOpen(true);
  };

  const confirmAction = (inputValue) => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button size="xl" gradientDuoTone="greenToBlue" onClick={inviteFriend}>
        <HiUserCircle className="mr-3 h-4 w-4" />
        <p>Invite</p>
      </Button>
      <PromptModal
        open={isModalOpen}
        type={"Invite"}
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
