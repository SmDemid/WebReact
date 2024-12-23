import React from 'react';
function TodoItem({ todo, toggleTodo, Remove }) {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button className='Remove' onClick={() => Remove(todo.id)}>X</button>
        </div>
    ); 
}
export default TodoItem;