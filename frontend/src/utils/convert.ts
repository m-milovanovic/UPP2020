export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let result = reader.result;
      resolve(result?.toString().replace(/data:.*;base64,/, ''))
    };
    reader.onerror = (error) => reject(error);
  });
