import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormVariables } from '../interfaces';
import TaskService from '../services/TaskService';
import GenericForm from './GenericForm';

interface Params {
  id: string;
}

const TaskForm: React.FC = () => {
  const { id } = useParams<Params>();
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });

  useEffect(() => {
    const getFormVariables = async () => {
      setFormState(await TaskService.getTaskFormVariables(id));
    };
    getFormVariables();
  }, [id]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(formState)
    //await TaskService.completeTask(id, formState);
  };

  return (
    <div>
      <GenericForm formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
    </div>
  );
};

export default TaskForm;
