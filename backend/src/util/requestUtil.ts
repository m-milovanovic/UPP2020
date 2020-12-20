const createJsonOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const createCamundaUser = (user): any => {
  return {
    profile: {
      id: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    credentials: {
      password: user.password,
    },
  };
};



export { createJsonOptions, createCamundaUser };
