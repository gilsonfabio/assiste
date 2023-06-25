import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import SearchIteModulos from "./SearchIteModulos";

interface modulosProps {
    modId: number;
    modDescricao: string;
}

const SearchModulos = ({usrId, nivel}: any) => {
    const [modulos, setModulos] = useState<Array<modulosProps>>([]);
    
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
            url: `/modulos`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(resp) {
            setModulos(resp.data);
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
            alert(`Falha no token de acesso dos módulos`);
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
                url: `/modulos`,
                headers: {
                    "x-access-token" : token    
                },      
            }).then(function(response) {
                setModulos(response.data);
            }).catch(function(error) {                
                alert(`Falha no token de acesso dos módulos`);
            })
        }
    }, [atualiza])
    
    return (
        <div className="mb-32 h-auto">
            <div className='flex items-center justify-between w-full h-12 bg-gray-300 '>
                <span className='text-[12px] font-bold text-black ml-2 md:ml-28 '>Olá, {nomUsr}</span>                 
            </div>
            <div className="flex flex-row justify-between items-center ">
                
            </div>
            <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-2 md:mt-3 ">  
                {modulos?.map((row) => ( 
                    <div key={row.modId} className="h-auto rounded overflow-hidden shadow-2xl mb-5 w-full " > 
                        <div className="flex flex-col w-full h-full">
                            <div className="w-full flex text-gray-700 text-[14px] font-bold bg-blue-500 " >
                                <span className="ml-2" >{row.modDescricao}</span>
                            </div>                                                                                 
                            <div className="">
                                <SearchIteModulos modId={row.modId} />
                            </div>    
                        </div>
                    </div>
                ))}
            </div>
        </div>   
    );
}

export default SearchModulos;