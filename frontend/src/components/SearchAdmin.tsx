import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface adminProps {
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

const SearchAdmin = ({usrId, nivel}: any) => {
    const [admin, setAdmin] = useState<Array<adminProps>>([]);
 
    const [atualiza, setAtualiza] = useState(0);
    const router = useRouter();
      
    const {query: { id }, } = router;
    const {query: { nivAce }, } = router;
      
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {
        api({
            method: 'get',    
            url: `/users`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(resp) {
            console.log(resp.data)
            setAdmin(resp.data);

        }).catch(function(error) {  
                          
        })        
    }, [])

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
            setAtualiza(atualiza + 1 )
        }).catch(function(error) {
            alert(`Falha no token de acesso dos administradores`);
            Router.push({
                pathname: '/',        
            })      
        })
    }

    useEffect(() => {
        if (atualiza > 0) {
            const { 'nextauth.token': token } = parseCookies();
            const { 'nextauth.refreshToken': refreshToken } = parseCookies();
            const { 'nextauth.usrId': idUsr } = parseCookies();
            const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();
              
            api({
                method: 'get',    
                url: `/users`,
                headers: {
                    "x-access-token" : token    
                },      
            }).then(function(response) {
                setAdmin(response.data);
            }).catch(function(error) {                
                alert(`Falha no token de acesso dos administradores`);
            })
        }
    }, [atualiza])
    
    return (
        <div className="mb-32 h-auto w-screen">
            <div className='flex items-center justify-between w-full h-12 bg-gray-300 '>
                <span className='text-[12px] font-bold text-black ml-2 md:ml-28 '>Olá, {nomUsr}</span>                 
            </div>
            <div className="md:ml-28">
                <div className="flex flex-row justify-between items-center ">
                    <Link href={`/NewAdmin`} > 
                        <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                            Novo Administrador
                        </span>
                    </Link>                    
                </div>
                <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-2 md:mt-3 ">  
                    {admin?.map((row) => ( 
                        <div key={row.admId} className="max-w-xs">
                            <div className="bg-white shadow-2xl rounded-lg py-3">
                                <div className="photo-wrapper p-2">
                                    <img className="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{row.admNomUsuario}</h3>
                                    <div className="text-center text-gray-400 text-xs font-semibold">
                                        <p>{row.admFuncao}</p>
                                    </div>
                                    <table className="text-xs my-3">
                                    <tbody><tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Endereço</td>
                                        <td className="px-2 py-2">{row.admEndereco}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Telefone</td>
                                        <td className="px-2 py-2">{row.admCelular}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                        <td className="px-2 py-2">{row.admEmail}</td>
                                    </tr>
                                    </tbody></table>
                                    <div className="text-center my-3">
                                        <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">Alterar dados</a>
                                    </div>
                                </div>
                            </div>
                        </div>                                           
                    ))}
                </div>
            </div>
        </div>       
    );
}

export default SearchAdmin;