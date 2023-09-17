"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export default function NewList() {
  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };
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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add a List
            </h3>
            <div>
              <TextInput id="board-name" placeholder="" required />
            </div>
            <div className="w-full">
              <Button gradientDuoTone="greenToBlue">Add</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
