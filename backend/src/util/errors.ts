class GeneralErorr extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralErorr {}
class NotFound extends GeneralErorr {}

export default {
  GeneralErorr,
  BadRequest,
  NotFound,
};
