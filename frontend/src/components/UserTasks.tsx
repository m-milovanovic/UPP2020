import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Task } from "../interfaces";
import TaskService from "../services/TaskService";

const UserTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      setTasks(await TaskService.getMyTasks("milan"));
    };
    getTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link to={`/user/tasks/${task.id}`}>{task.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default UserTasks;
