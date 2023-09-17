"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export default function NewCard() {
  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };
  //class="bg-gray-200 dark:bg-gray-900"
  const handleAddCard = () => {
  //TODO
}

  return (
    <>
      <button className="text-green-500 hover:text-green-600 mt-3" onClick={() => props.setOpenModal("form-elements")}>
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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add a Task
            </h3>
            <div>
              <TextInput
                id="friend-email"
                required
              />
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
