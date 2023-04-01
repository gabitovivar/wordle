export interface Auth {
    id: string;
    email: string;
    password: string;
  }
  
  export interface Token {
    userId: string;
    email: string;
    iat: number;
    exp: number;
  }