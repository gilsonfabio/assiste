import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { api } from "../services/api";

type User = {
  idUsuario: number;
  nomUsuario: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;

  useEffect(() => {

    destroyCookie({}, 'nextauth.token');
    destroyCookie({}, 'nextauth.usrId');
    destroyCookie({}, 'nextauth.usrNome');
    destroyCookie({}, 'nextauth.refreshToken');
    
  }, [])

  async function signIn({ email, password}: SignInData) {
    api({
      method: 'post',    
      url: `signIn`,
      data: {
        email,
        password
      },       
    }).then(function(response) {
      setCookie(undefined, 'nextauth.token', response.data.token, {maxAge: 60 * 60 * 1, })
      setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {maxAge: 60 * 60 * 1, })
      setCookie(undefined, 'nextauth.usrId', response.data.user.admId, {maxAge: 60 * 60 * 1, })
      setCookie(undefined, 'nextauth.usrNome', response.data.user.admNomCompleto, {maxAge: 60 * 60 * 1, })
      
      api.defaults.headers['x-access-token'] = `${response.data.token}`;

      let idUsuario = response.data.user.admId;
      let nomUsuario = response.data.user.admNomCompleto;
      let nomCandidato = response.data.user.canRazSocial;
      
      console.log(response.data)

      setUser(user)
      Router.push({
        pathname: '/Dashboard',
        query: { nomCandidato },
      })
    }).catch(function(error) {
      alert(`Falha no login Administrativo! Tente novamente. ${email}`);
    })    
  }
   
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}