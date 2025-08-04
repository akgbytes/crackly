declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined | undefined;
      };
    }
  }
}
export {};
