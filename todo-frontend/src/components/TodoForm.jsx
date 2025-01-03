import  { useState } from 'react';
import PropTypes from 'prop-types';

function TodoForm({ createTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      createTodo({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter todo title" 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Enter todo description" 
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

// PropTypes validation
TodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired,  // Validate that createTodo is a required function
};

export default TodoForm;


