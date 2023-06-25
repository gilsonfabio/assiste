import React, {useState, useEffect}  from 'react';
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../../services/api";

interface eventosProps {
    eveId: number;
    eveModId: number;
    eveEmpId: number;
    eveDatCadastro: string;
    eveDatValidade: string;
    eveTitulo: string;
    eveSubTitulo: string;
    eveDescricao: string;
    eveRequesitos: string;
    eveBeneficios: string;
    eveUrl: string;
    eveStatus: string;
}

const AltEvento = () => {
    const router = useRouter();
    const [idEve, setIdEve] = useState(router.query.eveId);
    const [eveModId, setEveModId] = useState('');
    const [eveEmpId, setEveEmpId] = useState('');
    const [eveDatCadastro, setEveDatCadastro] = useState('');
    const [eveDatValidade, setEveDatValidade] = useState('');
    const [eveTitulo, setEveTitulo] = useState('');
    const [eveSubTitulo, setEveSubTitulo] = useState('');
    const [eveDescricao, setEveDescricao] = useState('');
    const [eveRequesitos, setEveRequesitos] = useState('');
    const [eveBeneficios, setEveBeneficios] = useState('');
    const [eveUrl, setEveUrl] = useState('');
  
    const [atualiza, setAtualiza] = useState(0);

    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();
    
    const {query: { eveId }, } = router;

    async function handleAlterar(e:any){      
        e.preventDefault();

        api({
            method: 'put',    
            url: `updEvento/${idEve}`,
            data: {
                eveModId,
                eveEmpId,
                eveDatCadastro,
                eveDatValidade,
                eveTitulo,
                eveSubTitulo,
                eveDescricao,
                eveRequesitos,
                eveBeneficios,
                eveUrl
            },
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            alert('Evento alterado com sucesso!')
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
          handleAlterar
      }).catch(function(error) {
          alert(`Falha no token de cadastro de Eventos`);
          Router.push({
              pathname: '/',        
          })      
      })
    }

    useEffect(() => {    
    
        setIdEve(eveId);
    
        api({
          method: 'get',    
          url: `dadEvento/${idEve}`,
          headers: {
              "x-access-token" : token    
          },      
        }).then(function(response) {
            setEveModId(response.data[0].eveModId);
            setEveEmpId(response.data[0].eveEmpId);
            setEveDatCadastro(response.data[0].eveDatCadastro);
            setEveDatValidade(response.data[0].eveDatValidade);
            setEveTitulo(response.data[0].eveTitulo);
            setEveSubTitulo(response.data[0].eveSubTitulo);
            setEveDescricao(response.data[0].eveDescricao);
            setEveRequesitos(response.data[0].eveRequesitos);
            setEveBeneficios(response.data[0].eveBeneficios);
            setEveUrl(response.data[0].eveUrl);
        }).catch(function(error) {           
          handleRefreshToken()                 
        })
  
      }, [atualiza])

    return (
    <section className='h-screen md:h-screen '>
      <div className='w-screen h-20 bg-sky-900 mb-10'>

      </div>
      <form>
  <div className="space-y-12 md:ml-28 md:mr-28">
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informações do Evento</h2>      
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">Modulo do Evento</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveModId}
              onChange={(e) => {setEveModId(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveEmpId}
              onChange={(e) => {setEveEmpId(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveDatCadastro }
              onChange={(e) => {setEveDatCadastro(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveDatValidade}
              onChange={(e) => {setEveDatValidade(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveTitulo}
              onChange={(e) => {setEveTitulo(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveSubTitulo}
              onChange={(e) => {setEveSubTitulo(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveDescricao}
              onChange={(e) => {setEveDescricao(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveRequesitos}
              onChange={(e) => {setEveRequesitos(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={eveBeneficios}
              onChange={(e) => {setEveBeneficios(e.target.value)}}/>
          </div>
        </div>        
      </div>
    </div>    
  </div>
  <div className="ml-28 mr-28 mt-6 flex items-center justify-end gap-x-6">
    <button 
      type='button'
      onClick={handleAlterar}
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Salvar
    </button>
  </div>
</form>
  
    </section>
    );
};
export default AltEvento;