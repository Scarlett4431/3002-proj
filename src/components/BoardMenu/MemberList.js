import React, { useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { Modal } from "flowbite-react";
import {
    HiUserGroup,
  } from "react-icons/hi";
function MemberList() {
  const [promptMessage, setPromptMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showMembers = () => {
    setPromptMessage("All the members inside the board");
    setIsModalOpen(true);
  };

  const cancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="bg-gradient-to-r flex from-pink-500 text-white to-blue-500 hover:from-pink-600 hover:to-blue-600 font-bold py-4 px-6 rounded-lg"
        onClick={showMembers}
      >
        <HiAdjustments className="mr-3 h-4 w-4" />
        <p className="font-semibold">Members</p>
      </button>
      <>
        <Modal show={isModalOpen} size="md" popup onClose={cancel}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiUserGroup className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
              <h3 className="mb-5 text-lg font-normal text-gray-700">
                {promptMessage}
              </h3>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default MemberList;