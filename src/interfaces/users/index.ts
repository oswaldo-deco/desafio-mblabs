export interface IUserCreate {
    email: string;
    name:string;
    password:string;
}

export interface IUserLogin{
    email:string;
    password:string;
}

export interface IUpdatedUser {
    id: string;
    email: string;
    password: string;
    name: string;
  }

