"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal, TextInput } from "flowbite-react";
import { BiTaskX } from "react-icons/bi";
import { useState } from "react";

export default function NewCard() {
  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };
  //class="bg-gray-200 dark:bg-gray-900"
  const handleAddCard = () => {
    //TODO
  };

  return (
    <>
      <button
        className="text-green-500 hover:text-green-600 mt-3"
        onClick={() => props.setOpenModal("form-elements")}
      >
        <PlusCircleIcon className="h-10 w-10" />
      </button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center">
            <BiTaskX className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
              Add a Task
            </h3>
            <TextInput className="w-full" id="friend-email" required />
            <Button className="mt-5" gradientDuoTone="greenToBlue">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
