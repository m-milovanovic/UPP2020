import errors from "../util/errors";

export const handleErrors = (err, _req, res, _next) => {
  if (err instanceof errors.GeneralErorr) {
    return res.status(err.getCode()).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};
