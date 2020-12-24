declare namespace Express {
  export interface Request {
    userInfo?: {
      username: string,
      status: string,
      type: string,
      iat: number
    }
  }
}

