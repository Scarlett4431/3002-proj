import { Modal, Button } from "flowbite-react";
import {
  HiOutlineExclamationCircle,
  HiOutlineBookOpen,
  HiOutlineMailOpen,
  HiOutlineClipboardList,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { useState } from "react";

export default function PromptModal({
  placeholder,
  open,
  message,
  onConfirm,
  onCancel,
  requiresInput,
  showCancel,
  type,
  confirmMessage,
}) {
  const [inputValue, setInputValue] = useState("");
  let icon;
  if (type === "signup") {
    icon = (
      <HiOutlineUserAdd className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
    );
  } else if (type === "invite") {
    icon = (
      <HiOutlineMailOpen className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
    );
  } else if (type === "boardname") {
    icon = (
      <HiOutlineBookOpen className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
    );
  } else if (requiresInput) {
    icon = (
      <HiOutlineClipboardList className="mx-auto mb-4 h-14 w-14 text-gray-400" />
    );
  } else if (confirmMessage!== undefined || confirmMessage!== null) {
    icon = (
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 " />
    );
  } else {
    icon = (
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
    );
  }

  let cancel;
  if (showCancel === undefined || showCancel === true) {
    cancel = (
      <button
        className="bg-transparent hover:bg-gray-200 text-indigo-700 font-semibold hover:text-gray-700 py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
        color="gray"
        onClick={() => {
          onCancel();
          setInputValue("");
        }}
      >
        Cancel
      </button>
    );
  } else {
    cancel = <div></div>;
  }

  return (
    <>
      <Modal show={open} size="md" popup onClose={onCancel}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {icon}
            <h3 className="mb-5 text-lg font-normal text-gray-700">
              {message}
            </h3>
            {requiresInput && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                autoFocus
              />
            )}
            <div className="flex justify-center gap-4 mt-4">
              {confirmMessage && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    onConfirm(inputValue);
                    setInputValue("");
                  }}
                >
                  {confirmMessage}
                </button>
              )}
              {!confirmMessage && (
                <button
                  className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    onConfirm(inputValue);
                    setInputValue("");
                  }}
                >
                  Confirm
                </button>
              )}
              {cancel}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
