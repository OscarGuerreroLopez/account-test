declare namespace Express {
  export interface Request {
    code: string;
    user: RequestUser;
    requestRoute: string;
    requestMethod: string;
  }
}
