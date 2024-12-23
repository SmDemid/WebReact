import React from 'react';
import TodoItem from './TodoItem';
function TodoList({ todos, toggleTodo, Remove }) {
    return (
        <div className='todolist'>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} Remove={Remove} />       
            ))}
        </div>
    );
}
export default TodoList;