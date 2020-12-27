import { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormVariables } from '../interfaces';
import TaskService from '../services/TaskService';
import FileService from '../services/FileService';
import GenericForm from './GenericForm';

interface UrlParams {
  id: string;
}

interface TaskFormParams {
  user: any;
}

const TaskForm: React.FC<TaskFormParams> = ({ user }) => {
  const { id } = useParams<UrlParams>();
  const [formState, setFormState] = useState<FormVariables>({
    variables: {},
    additionalData: null,
  });
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const files = await FileService.getFiles(id);
        const formData = await TaskService.getTaskFormVariables(id);
        formData.additionalData = {
          type: 'review',
          data: files,
        };
        setFormState(formData);
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/user');
        }
      }
    };
    getData();
  }, [id, history]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await TaskService.completeTask(id, formState);
    history.push('/user');
  };

  return (
    <div>
      <GenericForm formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
    </div>
  );
};

export default TaskForm;
