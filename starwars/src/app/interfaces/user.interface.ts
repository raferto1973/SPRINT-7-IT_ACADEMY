//user.interface.ts


// Interface de l'usuari
export interface User {

  accessToken?: string;

  user: {
    email:      string;
    id:         number;
    lastName:   string;
    password:   string;
    firstName:  string;
  }

}

