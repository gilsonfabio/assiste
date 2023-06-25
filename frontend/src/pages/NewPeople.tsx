import React, {useState}  from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../services/api";

interface associadosProps {
  assId: number;
  assNome: string;
  assCpf: string;
  assNascimento: string;
  assSexo: string;
  assEstCivil: string;
  assEndereco: string;
  assNumero: string;
  assComplemento: string;
  assBairro: number;
  assCidade: number;
  assUf: string;
  assCep: number;
  assCelular: number;
  assEmail: string;
  assNomUsuario: string;
  assPassword: string;
  assStatus: string;
}

const NewPeople = () => {
    const [assNome, setAssNome] = useState('');
    const [assNascimento, setAssNascimento] = useState('');
    const [assCpf, setAssCpf] = useState('');
    const [assSexo, setAssSexo] = useState('');
    const [assEstCivil, setAssEstCivil] = useState('');
    const [assEndereco, setAssEndereco] = useState('');
    const [assNumero, setAssNumero] = useState('');
    const [assComplemento, setAssComplemento] = useState('');
    const [assBairro, setAssBairro] = useState('');
    const [assCidade, setAssCidade] = useState('');
    const [assUf, setAssUf] = useState('');
    const [assCep, setAssCep] = useState('');
    const [assCelular, setAssCelular] = useState('');
    const [assEmail, setAssEmail] = useState('');
    const [assNomUsuario, setAssNomUsuario] = useState('');
    const [assPassword, setAssPassword] = useState('');
    const [assStatus, setAssStatus] = useState('');
    
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
            method: 'post',    
            url: `newassociado`,
            data: {
              assNome,
              assNascimento,
              assCpf,
              assSexo, 
              assEstCivil, 
              assEndereco, 
              assNumero, 
              assComplemento, 
              assBairro, 
              assCidade, 
              assUf, 
              assCep, 
              assCelular, 
              assEmail, 
            },
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            alert('Associado cadastrado com sucesso!')
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
          alert(`Falha no token de cadastro de Associados`);
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
      <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informações Pessoais</h2>      
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nome do Associado(a)</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assNome}
              onChange={(e) => {setAssNome(e.target.value)}}/>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nascimento</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="region" 
              id="region" 
              autoComplete="address-level1" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assNascimento}
              onChange={(e) => {setAssNascimento(e.target.value)}}/>
          </div>
        </div>

        <div className="col-span-2 ">
          <label className="block text-sm font-medium leading-6 text-gray-900">Estado Civil</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="city" 
              id="city" 
              autoComplete="address-level2" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assEstCivil}
              onChange={(e) => {setAssEstCivil(e.target.value)}}/>
          </div>
        </div>

        <div className="col-span-2 ">
          <label className="block text-sm font-medium leading-6 text-gray-900">Genero</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="city" 
              id="city" 
              autoComplete="address-level2" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assSexo}
              onChange={(e) => {setAssSexo(e.target.value)}}/>
          </div>
        </div>

        <div className="col-span-2 ">
          <label className="block text-sm font-medium leading-6 text-gray-900">Fone p/Contato</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="city" 
              id="city" 
              autoComplete="address-level2" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assCelular}
              onChange={(e) => {setAssCelular(e.target.value)}}/>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input 
              id="email" 
              name="email" 
              type="email" 
              autoComplete="email" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={assEmail}
              onChange={(e) => {setAssEmail(e.target.value)}}/> 
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">CPF</label>
          <div className="mt-2">
            <input 
              id="cpf" 
              name="cpf" 
              type="cpf" 
              autoComplete="ecpf" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={assCpf}
              onChange={(e) => {setAssCpf(e.target.value)}}/> 
          </div>
        </div>

        <div className="col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Endereço</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="street-address" 
              id="street-address" 
              autoComplete="street-address" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assEndereco}
              onChange={(e) => {setAssEndereco(e.target.value)}}/>
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Numero</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="street-address" 
              id="street-address" 
              autoComplete="street-address" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assNumero}
              onChange={(e) => {setAssNumero(e.target.value)}}/>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Complemento</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="street-address" 
              id="street-address" 
              autoComplete="street-address" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assComplemento}
              onChange={(e) => {setAssComplemento(e.target.value)}}/>
          </div>
        </div>

        <div className="col-span-2 ">
          <label className="block text-sm font-medium leading-6 text-gray-900">Bairro</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="city" 
              id="city" 
              autoComplete="address-level2" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assBairro}
              onChange={(e) => {setAssBairro(e.target.value)}}/>
          </div>
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="city" 
              id="city" 
              autoComplete="address-level2" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assCidade}
              onChange={(e) => {setAssCidade(e.target.value)}}/>
          </div>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Estado</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="region" 
              id="region" 
              autoComplete="address-level1" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assUf}
              onChange={(e) => {setAssUf(e.target.value)}}/>
          </div>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Cep</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="postal-code" 
              id="postal-code" 
              autoComplete="postal-code" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={assCep}
              onChange={(e) => {setAssCep(e.target.value)}}/>
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
export default NewPeople;


/*

<div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
          <div className="mt-6 space-y-6">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div className="text-sm leading-6">
                <label className="font-medium text-gray-900">Comments</label>
                <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div className="text-sm leading-6">
                <label className="font-medium text-gray-900">Candidates</label>
                <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input id="offers" name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div className="text-sm leading-6">
                <label className="font-medium text-gray-900">Offers</label>
                <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label className="block text-sm font-medium leading-6 text-gray-900">Everything</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label className="block text-sm font-medium leading-6 text-gray-900">Same as email</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label className="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    */