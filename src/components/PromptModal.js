import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle, HiOutlineBookOpen, HiOutlineMailOpen, HiOutlineClipboardList, HiOutlineUserAdd } from "react-icons/hi";
import { useState } from "react";

export default function PromptModal({ placeholder, open, message, onConfirm, onCancel, requiresInput,showCancel, type}) {
  const [inputValue, setInputValue] = useState('');
  let icon;
  if (type === "signup"){
    icon = <HiOutlineUserAdd className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />;
  }
  else if (type === "invite"){
    icon = <HiOutlineMailOpen className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />;
  }
  else if (type === "boardname"){
    icon = <HiOutlineBookOpen className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />;
  }
  else if (requiresInput){
    icon = <HiOutlineClipboardList className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />;
  }
  else {
    icon = <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />;
  }
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
            {icon}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            {requiresInput && 
              <input 
                 type="text" 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder={placeholder}
                 autoFocus
              />
            }
            <div className="flex justify-center gap-4 mt-4">
              <Button
                className="bg-indigo-600 hover:bg-indigo-800"
                onClick={() => {
                  onConfirm(inputValue);
                  setInputValue('');
                }}
              >
                Confirm
              </Button>
              {showCancel && (
                <Button
                  color="gray"
                  onClick={() => {
                    onCancel();
                    setInputValue('');
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
