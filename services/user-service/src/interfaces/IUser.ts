export interface IUser {
  id: number;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  questionsAuthored: number;
}
