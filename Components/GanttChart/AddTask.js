import { useState } from 'react';
import AddButton from './AddButton';

export default function AddTask(setTasks) {
  const [task, setTask] = useState('');

  

  function onChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTasks((prevState) => {
      const newState = prevState;
      // find largest task number, add 1 for new task - else could end up with tasks with same id
      const maxIdVal = prevState.reduce(function (a, b) {
        return Math.max(a, b.id);
      }, -Infinity);

      // create new task
      newState.push({
        id: isFinite(maxIdVal) ? maxIdVal + 1 : 1,
        name: task,
      });
      
      return [...newState];
    });
    setTask('');
  }

  return (
    <form id="add-task" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input value={task} onChange={onChange} placeholder="add task name" />
      <AddButton />
      <style jsx>{`
        #add-task {
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
        }

        input {
          height: var(--cell-height);
          margin-top: 21px;
          margin-bottom: 21px;
        }
      `}</style>
    </form>
  );
}
