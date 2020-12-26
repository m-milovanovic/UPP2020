import { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormVariables } from '../interfaces';
import TaskService from '../services/TaskService';
import GenericForm from './GenericForm';

interface UrlParams {
  id: string;
}

const TaskForm: React.FC = () => {
  const { id } = useParams<UrlParams>();
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });
  const history = useHistory();

  useEffect(() => {
    const getFormVariables = async () => {
      setFormState(await TaskService.getTaskFormVariables(id));
    };
    getFormVariables();
  }, [id]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await TaskService.completeTask(id, formState);
    history.push('/user/tasks');
  };

  return (
    <div>
      <GenericForm formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
    </div>
  );
};

export default TaskForm;
