import { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormVariables } from '../interfaces';
import TaskService from '../services/TaskService';
import FileService from '../services/FileService';
import GenericForm from './GenericForm';
import ProcessService from '../services/ProcessService';

interface UrlParams {
  id: string;
}

const TaskForm: React.FC = () => {
  const { id } = useParams<UrlParams>();
  const [processId, setProcessId] = useState<string>('');
  const [formState, setFormState] = useState<FormVariables>({
    variables: {},
    additionalData: null,
  });
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const formData = await TaskService.getTaskFormVariables(id);
        const task = await TaskService.getTaskById(id);
        const files = await FileService.getFiles(task.processInstanceId);
        console.log(task.processInstanceId)
        setProcessId(task.processInstanceId);
        if (files.length > 0) {
          formData.additionalData = {
            type: 'review',
            data: files,
          };
        }
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
    try {
      await TaskService.completeTask(id, formState);
      //check if more active tasks -> if true push to that task form else push to /user
      const activeTaskId = await ProcessService.getActiveTaskId(processId);
      if (activeTaskId) {
        history.push(`/user/tasks/${activeTaskId}`);
      } else {
        history.push('/user');
      }
    } catch (error) {
      for (const key in error.response?.data) {
        setFormState({
          ...formState,
          variables: {
            ...formState.variables,
            [key]: { ...formState.variables[key], error: error.response.data[key] },
          },
        });
      }
    }
  };

  return (
    <div>
      <GenericForm formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
    </div>
  );
};

export default TaskForm;
