import { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormVariables } from '../interfaces';
import TaskService from '../services/TaskService';
import FileService from '../services/FileService';
import GenericForm from './GenericForm';
import Files from './Files';

interface UrlParams {
  id: string;
}

export interface File {
  id: string;
  name: string;
}

const TaskForm: React.FC = () => {
  const { id } = useParams<UrlParams>();
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });
  const history = useHistory();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const getFormVariables = async () => {
      try {
        setFormState(await TaskService.getTaskFormVariables(id));
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/user');
        }
      }
    };
    const getFiles = async () => {
      setFiles(await FileService.getFiles(id));
    };
    getFormVariables();
    getFiles();
  }, [id, history]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await TaskService.completeTask(id, formState);
    history.push('/user');
  };

  return (
    <div>
      {files && <Files files={files} />}
      <GenericForm formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
    </div>
  );
};

export default TaskForm;
