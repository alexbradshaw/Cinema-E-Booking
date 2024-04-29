declare namespace Express {
    export interface Request {
      auth?: {
        status?: boolean;
        error?: string;
      };
      admin?: {
        status?: boolean;
      };
    }
  }