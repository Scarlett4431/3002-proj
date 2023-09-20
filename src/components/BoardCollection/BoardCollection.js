"use client";
import React, { useState } from 'react';
import PromptModal from '../PromptModal'; 

function BoardCollection() {
    const [columns, setColumns] = useState([]);
    const [columnToDelete, setColumnToDelete] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promptMessage, setPromptMessage] = useState('');
    const [operationType, setOperationType] = useState(null); // 'add' or 'delete'


    const addColumn = () => {
        setOperationType('add');
        setPromptMessage('Enter board title:');
        setIsModalOpen(true);
    };

    const deleteColumn = (index) => {
        setColumns(prevColumns => prevColumns.filter((_, colIndex) => colIndex !== index));
    };
      

    const handleDeleteClick = (index) => {
        setOperationType('delete');
        setColumnToDelete(index);
        setPromptMessage("Are you sure you want to delete this board?");
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        deleteColumn(columnToDelete);
        setIsModalOpen(false);
        setColumnToDelete(null);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setColumnToDelete(null);
    };

    const confirmAction = (inputValue) => {
        if (operationType === 'add') {
            if (inputValue) {
                setColumns(prevColumns => [...prevColumns, inputValue]);
            }
        } else if (operationType === 'delete') {
            deleteColumn(columnToDelete);
        }
        setIsModalOpen(false);
        setOperationType(null);
    };

    return (
        <div className="p-10 bg-gray-200 min-h-75vh">
            <h2 className="text-2xl mb-4 text-center">YOUR BOARDS</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {columns.map((col, index) => (
                    <div 
                        key={index} 
                        className="p-10 border rounded shadow bg-green-500 hover:bg-green-600 relative mx-auto flex items-center justify-center"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <button style={{ display: 'block', maxWidth: '150px', whiteSpace: 'normal', overflowWrap: 'break-word' }} className="text-white">{col}</button>
                        {hoveredIndex === index && (
                            <button 
                                onClick={() => handleDeleteClick(index)} 
                                className="absolute top-0 right-0 m-1 p-0 bg-red-500 text-white rounded hover:bg-red-600">
                                x
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={addColumn} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto">CREATE NEW BOARD</button>

            <PromptModal 
                open={isModalOpen} 
                message={promptMessage} 
                onConfirm={confirmDelete} 
                onCancel={cancelDelete}
                />

            <PromptModal 
                open={isModalOpen} 
                message={promptMessage} 
                onConfirm={confirmAction} 
                onCancel={cancelDelete}
                requiresInput={operationType === 'add'}
                />


        </div>
    );
}

export default BoardCollection;