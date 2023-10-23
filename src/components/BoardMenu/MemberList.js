import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { HiUserGroup} from "react-icons/hi";

import { useSelector } from "react-redux";

function MemberList() {
  const memberList = useSelector((state) => state.board.memberList);
  const owner = useSelector((state) => state.board.owner);
  const [promptMessage, setPromptMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showMembers = () => {
    setPromptMessage("All members inside the board");
    setIsModalOpen(true);
  };

  const cancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="flex text-white bg-violet-400 hover:bg-violet-500 font-bold py-4 px-6 rounded-lg"
        onClick={showMembers}
      >
        <HiUserGroup className="mr-3 h-5 w-5" />
        <p className="font-semibold">Member</p>
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
              <div className="grid grid-cols-2 gap-0 px-12">
                <p className="font-thin text-lg">Owner: </p>
                <p className="text-gray-700 text-lg">{owner}</p>
              </div>
              {
                // member list does not contain owner
                memberList.map((member) => {
                  return (
                    <div className="grid grid-cols-2 px-12">
                      <p className="font-thin text-lg">Member: </p>
                      <p className="text-gray-700 text-lg">{member}</p>
                    </div>
                  );
                })
              }
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default MemberList;
