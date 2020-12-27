const createNotificationMail = (subject: string, text: string) => {
  return {
    subject: subject,
    html: `<p>${text}</p>`,
  };
};

export { createNotificationMail };
