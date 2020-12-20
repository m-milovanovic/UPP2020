const createActivationMail = (baseUrl: string, processID: string) => {
  return {
    subject: 'ACTIVATION LINK',
    html: `<a href=${baseUrl}/activate/${processID}> Click here to activate your account </a>`,
  };
};

export {
  createActivationMail,
};
