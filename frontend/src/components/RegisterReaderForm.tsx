import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormVariables } from '../interfaces';
import LocalStorageService from '../services/LocalStorageService';
import ProcessService from '../services/ProcessService';
import TaskService from '../services/TaskService';
import GenericForm from './GenericForm';
import { useHistory } from 'react-router-dom';

const RegisterReaderForm: React.FC = () => {
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });
  const [taskId, setTaskId] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const getFormVariables = async () => {
      let processId = LocalStorageService.getProcessId();
      if (processId === null || processId === 'undefined') {
        processId = await ProcessService.startProcess('registerReader');
      }
      let activeTaskId = await ProcessService.getActiveTaskId(processId);
      if (activeTaskId) {
        setFormState(await TaskService.getTaskFormVariables(activeTaskId));
        setTaskId(activeTaskId);
      } else {
        history.push('/activate');
      }
    };
    getFormVariables();
  }, [history]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    clearErrors();
    try {
      await TaskService.completeTask(taskId, formState);
      window.location.reload();
    } catch (error) {
      for (const key in error.response?.data) {
        setFormState({
          variables: {
            ...formState.variables,
            [key]: { ...formState.variables[key], error: error.response.data[key] },
          },
        });
      }
    }
  };

  const clearErrors = () => {
    const newFormState = { ...formState };
    for (const key in formState.variables) {
      formState.variables[key].error = undefined;
    }
    setFormState(newFormState);
  };

  return (
    <div>
      <GenericForm formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterReaderForm;
