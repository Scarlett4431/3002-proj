'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function InviteCard() {
  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };

  return (
    <>
      <Button onClick={() => props.setOpenModal('form-elements')}>Invite</Button>
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Invite to board</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Add email" />
              </div>
              <TextInput id="email" placeholder="name@company.com" required />
            </div>
            <div className="w-full">
              <Button>Add</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


