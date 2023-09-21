import React,{ useState } from "react";
import { Button } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import PromptModal from "../PromptModal";
function BoardTitleCard({title, onChangeBoardTitle}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");

  const cancel = () => {
    setIsModalOpen(false);
  };

  const editBoard = () => {
    setPromptMessage("Enter new board title:");
    setIsModalOpen(true);
  };

  const confirmAction = (inputValue) => {
    onChangeBoardTitle(inputValue);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        size="xl"
        gradientDuoTone="greenToBlue"
        onClick={editBoard}
      >
        <HiAdjustments className="mr-3 h-4 w-4" />
        <p>{title}</p>
      </Button>
      <PromptModal
        open={isModalOpen}
        message={promptMessage}
        onConfirm={confirmAction}
        onCancel={cancel}
        requiresInput
      />
    </div>
  );
}

export default BoardTitleCard;
