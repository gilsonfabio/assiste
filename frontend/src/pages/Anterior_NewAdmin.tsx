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
      <form>
        <div className="space-y-12 md:ml-28 md:mr-28">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informações da Empresa</h2>      
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Descrição Empresa</label>
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
                        <div className="mt-2">
                            <input 
                                type="text" 
                                name="first-name" 
                                id="first-name" 
                                autoComplete="given-name" 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                value={admNomCompleto}
                                onChange={(e) => {setAdmNomCompleto(e.target.value)}}/>
                        </div>
                        <div className="mt-2">
                            <input 
                                type="text" 
                                name="first-name" 
                                id="first-name" 
                                autoComplete="given-name" 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                value={admFuncao}
                                onChange={(e) => {setAdmFuncao(e.target.value)}}/>
                        </div>
                        <div className="mt-2">
                            <input 
                                type="text" 
                                name="first-name" 
                                id="first-name" 
                                autoComplete="given-name" 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                value={admEmail}
                                onChange={(e) => {setAdmEmail(e.target.value)}}/>
                        </div>
                        <div className="mt-2">
                            <input 
                                type="text" 
                                name="first-name" 
                                id="first-name" 
                                autoComplete="given-name" 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                value={admCelular}
                                onChange={(e) => {setAdmCelular(e.target.value)}}/>
                        </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admEndereco}
              onChange={(e) => {setAdmEndereco(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admNumero}
              onChange={(e) => {setAdmNumero(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admComplemento}
              onChange={(e) => {setAdmComplemento(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admBairro}
              onChange={(e) => {setAdmBairro(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admCidade}
              onChange={(e) => {setAdmCidade(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admCep}
              onChange={(e) => {setAdmCep(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admUrlPhoto}
              onChange={(e) => {setAdmUrlPhoto(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={admUrlPhoto}
              onChange={(e) => {setAdmUrlPhoto(e.target.value)}}/>
          </div>
        </div>        
      </div>
    </div>    
  </div>
  <div className="ml-28 mr-28 mt-6 flex items-center justify-end gap-x-6">
    <button 
      type='button'
      onClick={handleCadastra}
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Salvar
    </button>
  </div>
</form>
    </section>
    );
};
export default NewAdmin;