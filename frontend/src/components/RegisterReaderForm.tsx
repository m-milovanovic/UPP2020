import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormVariables } from '../interfaces';
import LocalStorageService from '../services/LocalStorageService';
import ProcessService from '../services/ProcessService';
import TaskService from '../services/TaskService';
import GenericForm from './GenericForm';

const RegisterReaderForm: React.FC = () => {
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });
  const [taskId, setTaskId] = useState<string>('');

  useEffect(() => {
    const getFormVariables = async () => {
      let processId = LocalStorageService.getProcessId();
      if (processId === null || processId === 'undefined') {
        processId = await ProcessService.startProcess('registerReader');
      }
      let activeTaskId = await ProcessService.getActiveTaskId(processId);
      setFormState(await TaskService.getTaskFormVariables(activeTaskId));
      setTaskId(activeTaskId);
    };
    getFormVariables();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await TaskService.completeTask(taskId, formState);
  };

  return (
    <div>
      <GenericForm
        formState={formState}
        setFormState={setFormState}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegisterReaderForm;
