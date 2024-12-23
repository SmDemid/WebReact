import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        Done: {
            name: 'Done',
            items: [],
        },
        Blocked: {
            name: 'Blocked',
            items: [],
        },
    });
    const Remove = (columnId, index) => {
        const newColumns = { ...columns };
        newColumns[columnId].items.splice(index, 1);
        setColumns(newColumns);
    };
    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center',height: '100%' }}>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 20px',
                        }}
                        key={columnId}
                    >
                        <h2>{column.name}</h2>
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className='DndColum'
                                        style={{
                                            background: snapshot.isDraggingOver ?
                                            'lightblue' : 'white',
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500,
                                        }}
                                    >
                                        {column.items.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        className='Dnditem'
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect: 'none',
                                                            padding: 16,
                                                            margin: '0 0 8px 0',
                                                            minHeight: '50px',
                                                            backgroundColor: snapshot.isDragging
                                                            ? '#b1f5f1'
                                                            : '#b1f5f1',
                                                            color: 'black',
                                                            borderRadius: '8px',
                                                            ...provided.draggableProps.style,
                                                        }}
                                                    >
                                                        {item.content}
                                                        <button className='Removednd' onClick={() => Remove(columnId, index)}>X</button>
                                                    </div>
                                                    );
                                                }}
                                            </Draggable>
                                        ))}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    );
                })}
            </DragDropContext>
        <Link to="/todo">To Todo</Link>
        </div>
    );
}
export default DndPage;

                        