import Axios from "axios";
import { FormVariables } from "../interfaces";

const registerReader = async (reader: FormVariables, key: string) => {
  for (const key in reader.variables) {
    reader.variables[key] = { ...reader.variables[key], type: undefined };
  }
  return await Axios.post(
    `${process.env.REACT_APP_API_URL}/process/${key}/submit-form`,
    reader
  );
};

const UserService = {
  registerReader,
};

export default UserService;
