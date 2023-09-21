import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle, HiOutlineClipboardList } from "react-icons/hi";
import { useState } from "react";

export default function PromptModal({ placeholder, open, message, onConfirm, onCancel, requiresInput }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Modal
        show={open}
        size="md"
        popup
        onClose={onCancel}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {requiresInput? <HiOutlineClipboardList className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> : <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            {requiresInput && 
              <input 
                 type="text" 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder={placeholder}
              />
            }
            <div className="flex justify-center gap-4 mt-4">
              <Button
                color="success"
                onClick={() => {
                  onConfirm(inputValue);
                  setInputValue('');
                }}
              >
                Confirm
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  onCancel();
                  setInputValue('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
