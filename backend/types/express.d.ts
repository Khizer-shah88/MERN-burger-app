declare namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string; // Optional role field for admin check
      };
    }
  }

  