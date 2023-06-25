import React, {useState, useEffect}  from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../services/api";

interface empresasProps {
    admId: number;
    admNomUsuario: string;
    admNomCompleto: string;
    admFuncao: string;
    admEmail: string;
    admCelular: string; 
    admEndereco: string; 
    admNumero: string; 
    admComplemento: string; 
    admBairro: number; 
    admCidade: number; 
    admCep: string; 
    admUrlPhoto: string; 
    admCandidato: string; 
    admPassword: string; 
    admStatus: string;
}

const NewAdmin = () => {
    const [admNomUsuario, setAdmNomUsuario] = useState('');
    const [admNomCompleto, setAdmNomCompleto] = useState('');
    const [admFuncao, setAdmFuncao] = useState('');
    const [admEmail, setAdmEmail] = useState('');
    const [admCelular, setAdmCelular] = useState('');
    const [admEndereco, setAdmEndereco] = useState('');
    const [admNumero, setAdmNumero] = useState('');
    const [admComplemento, setAdmComplemento] = useState('');
    const [admBairro, setAdmBairro] = useState('');
    const [admCidade, setAdmCidade] = useState('');
    const [admCep, setAdmCep] = useState('');
    const [admUrlPhoto, setAdmUrlPhoto] = useState('');

    const [openTab, setOpenTab] = useState(1);
    
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
            method: 'post',    
            url: `newAdmin`,
            data: {
                admNomUsuario,
                admNomCompleto,
                admFuncao,
                admEmail,
                admCelular, 
                admEndereco, 
                admNumero, 
                admComplemento, 
                admBairro, 
                admCidade, 
                admCep, 
                admUrlPhoto, 
            },
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            alert('Administrador(a) cadastrado com sucesso!')
        }).catch(function(error) {
            handleRefreshToken()          
        })
    }

    async function handleRefreshToken(){
      await api({
          method: 'post',    
          url: `refreshToken`,
          data: {
              idUsr,                            
          },
          headers: {
              "x-access-token" : refreshToken    
          },      
      }).then(function(response) {
          destroyCookie({}, 'nextauth.token');
          destroyCookie({}, 'nextauth.usrId');
          destroyCookie({}, 'nextauth.usrNome');
          destroyCookie({}, 'nextauth.usrNivAcesso');
          destroyCookie({}, 'nextauth.refreshToken'); 
          
          setCookie(undefined, 'nextauth.token', response.data.token, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.usrId', response.data.user.usrId, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.usrNome', response.data.user.usrNome, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.usrNivAcesso', response.data.user.usrNivAcesso, {maxAge: 60 * 60 * 1, })                
          handleCadastra
      }).catch(function(error) {
          alert(`Falha no token de cadastro de Administradores`);
          Router.push({
              pathname: '/',        
          })      
      })
    }

    return (
    <section className='h-screen md:h-screen '>
        <div className='w-screen h-20 bg-sky-900 mb-10'>

        </div>
        <div>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center max-w-xl">
                    <ul className="flex space-x-2">
                        <li>
                            <a
                                href="#"
                                onClick={() => setOpenTab(1)}
                                className="inline-block px-4 py-2 text-gray-600 bg-white rounded focus:text-blue-500 border-b-4 focus:border-indigo-500"
                            >
                                React Tabs 1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setOpenTab(2)}
                                className="inline-block px-4 py-2 text-gray-600 bg-white rounded focus:text-blue-500 border-b-4 focus:border-indigo-500"
                            >
                                React Tabs 2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setOpenTab(3)}
                                className="inline-block px-4 py-2 text-gray-600 bg-white rounded focus:text-blue-500 border-b-4 focus:border-indigo-500"
                            >
                                React Tabs 3
                            </a>
                        </li>
                    </ul>
                    <div className="p-3 mt-6 bg-white border">
                        <div className={openTab === 1 ? "block"  : "hidden"}>                            
                            React JS with Tailwind CSS Tab 1 Content show
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    name="first-name" 
                                    id="first-name" 
                                    autoComplete="given-name" 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    value={admNomUsuario}
                                    onChange={(e) => {setAdmNomUsuario(e.target.value)}}/>
                                </div>
                            </div>
                        <div className={openTab === 2 ? "block" : "hidden"}>
                            React JS with Tailwind CSS Tab 2 Content show
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"}>
                            React JS with Tailwind CSS Tab 3 Content show
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </section>
    );
};
export default NewAdmin;