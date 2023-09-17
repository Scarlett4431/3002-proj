"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { BsCardList } from "react-icons/bs";

export default function NewList() {
  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };

  const handleAddList= () =>{
    //TODO
  }

  return (
    <>
      <div className={"p-2 rounded-2xl shadow-sm"}>
        <h2 className="text-blue-700 flex justify-between font-bold text-xl p-2s">
          Add a List
        </h2>
        <div className="flex items-end justify-end">
          <button
            className="text-blue-500 hover:text-blue-600 mt-3"
            onClick={() => props.setOpenModal("form-elements")}
          >
            <PlusCircleIcon className="h-10 w-10" />
          </button>
        </div>
      </div>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center">
            <BsCardList className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
              Add a List
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
