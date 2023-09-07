"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiAdjustments } from "react-icons/hi";

export default function BoardTitleCard() {
  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };

  return (
    <>
      <Button color="gray" onClick={() => props.setOpenModal("form-elements")}>
        <HiAdjustments className="mr-3 h-4 w-4" />
        <p>Invite</p>
      </Button>
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
              Rename Board
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="board-name" value="Add email" />
              </div>
              <TextInput id="board-name" placeholder="" required />
            </div>
            <div className="w-full">
              <Button>Add</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
