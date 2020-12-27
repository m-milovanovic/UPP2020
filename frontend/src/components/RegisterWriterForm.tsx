import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormVariables } from '../interfaces';
import ProcessService from '../services/ProcessService';
import TaskService from '../services/TaskService';
import GenericForm from './GenericForm';
import { useHistory } from 'react-router-dom';

const RegisterWriterForm: React.FC = () => {
  const [formState, setFormState] = useState<FormVariables>({
    variables: {},
    additionalData: null,
  });
  const [taskId, setTaskId] = useState<string>('');
  const history = useHistory();
  const [processId, setProcessId] = useState<string>('');

  useEffect(() => {
    const startProcess = async () => {
      setProcessId(await ProcessService.startProcess('registerWriter'));
    };
    startProcess();
  }, []);

  useEffect(() => {
    const getActiveTask = async () => {
      if (processId) {
        setTaskId(await ProcessService.getActiveTaskId(processId));
      }
    };
    getActiveTask();
  }, [processId]);

  useEffect(() => {
    const getFormVariables = async () => {
      if (taskId) {
        setFormState(await TaskService.getTaskFormVariables(taskId));
      }
    };
    getFormVariables();
  }, [taskId]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    clearErrors();
    try {
      await TaskService.completeTask(taskId, formState);
      const activeTaskId = await ProcessService.getActiveTaskId(processId);
      if (activeTaskId) {
        setTaskId(activeTaskId);
      } else {
        history.push('/activationSent');
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

export default RegisterWriterForm;
