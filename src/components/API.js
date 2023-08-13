import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./API.css"

function API() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleAddTodo = async () => {
    try {
    
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        id: Date.now(),
        title: newTodoTitle,
        completed: false,
      });

      const newTodo = {  id: Date.now(),
        title: newTodoTitle,
        completed: false,}

console.log(newTodo)
      setTodos((prevTodos) => [newTodo, ...prevTodos]);

      setNewTodoTitle('');
    } catch (error) {
      console.error('Error adding new todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
  
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="New Todo Title"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button className="add-button" onClick={handleAddTodo}>Add Todo</button>
  
      <p className="total-todos">Total Todos: {todos.length}</p>
  
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo.id)} // Add this function
          />
          <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
  
}

export default API;
