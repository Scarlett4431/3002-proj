"use client";
import React, { useState } from 'react';

function Board() {
    const [columns, setColumns] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const addColumn = () => {
        const newColumnName = prompt('Add board title *');
        if (newColumnName) {
            setColumns(prevColumns => [...prevColumns, newColumnName]);
        }
    };

    const deleteColumn = (index) => {
      setColumns(prevColumns => prevColumns.filter((_, colIndex) => colIndex !== index));
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
                                onClick={() => deleteColumn(index)} 
                                className="absolute top-0 right-0 m-1 p-0 bg-red-500 text-white rounded hover:bg-red-600">
                                X
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={addColumn}className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto">CREATE NEW BOARD</button>
        </div>
    );
}

export default Board;