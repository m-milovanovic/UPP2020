import React, { SyntheticEvent, useEffect, useState } from "react";
import { FormVariables } from "../interfaces";
import FormService from "../services/FormService";
import UserService from "../services/UserService";
import GenericForm from "./GenericForm";

const RegisterReaderForm: React.FC = () => {
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });
  const [genres, setGenres] = useState<string[]>([]);

  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormState({
      ...formState,
      variables: {
        ...formState.variables,
        [name]: { ...formState.variables[name], value: value },
      },
    });
  };

  useEffect(() => {
    const getFormVariables = async () => {
      setFormState(await FormService.getFormVariables("registerReader"));
    };
    const getGenres = async () => {
      setGenres(await FormService.getGenres());
    };
    getFormVariables();
    getGenres();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await UserService.registerReader(formState, "registerReader");
  };

  return (
    <div>
      <GenericForm
        formState={formState}
        setFormState={setFormState}
        handleSubmit={handleSubmit}
      >
        {formState.variables?.betaReader?.value === true && (
          <div>
            <label>
              Genres:
              <br />
              <select
                name="genres"
                multiple
                onChange={handleChange("genres")}
                required
              >
                {genres.map((genre, i) => (
                  <option key={i} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </GenericForm>
    </div>
  );
};

export default RegisterReaderForm;
