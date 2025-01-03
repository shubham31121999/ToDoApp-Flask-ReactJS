
import PropTypes from 'prop-types';

function TodoList({ todos, updateTodo, deleteTodo, toggleDone }) {
    return (
      <div>
        <h2>Todo List</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Status: {todo.done ? 'Completed' : 'Pending'}</p>
                <button onClick={() => toggleDone(todo.id, todo.done)}>
                  {todo.done ? 'Reject' : 'Complete'}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TodoList;
  
