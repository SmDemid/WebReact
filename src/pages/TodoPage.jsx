import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { Link } from 'react-router-dom';
function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Посмотреть список задач', completed: true },
    { id: 2, title: 'Купить продуктов', completed: false },
    { id: 3, title: 'Почитать книну', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };
  function Remove(id) {
    setTodos(todos.filter(obj => obj.id != id))
  }
  const [completed, SetSort] = useState('all'); 
  const sortlist = todos.filter(todo => {
		if (completed === 'completed') return todo.completed;
		if (completed === 'incomplete') return !todo.completed;
		return true;
	});
  return (
    <div >
      <h1>Мой список задач</h1>
      <form onSubmit={addTodo} className='inputform'>
        <input
          className='input'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавте новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
      <h2>Задачи</h2>
      <div className='blok'>
        <button className='Sort' onClick={() => SetSort('all')}>Все</button>
        <button className='Sortcompleted' onClick={() => SetSort('completed')}>Выполненые</button>
        <button className='Sortincompleted' onClick={() => SetSort('incomplete')}>Не выполненые</button>
      </div>
      <TodoList todos={sortlist} toggleTodo={toggleTodo} Remove={Remove}/>
      <Link to="/dnd">TO DND</Link>
    </div>
  );
}
export default TodoPage;
