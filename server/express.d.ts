declare namespace Express {
    export interface Request {
      auth: {
        status: boolean;
      };
      admin: {
        status: boolean;
      };
    }
  }