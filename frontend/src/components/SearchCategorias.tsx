import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface categoriasProps {
    catId: number;
    catDescricao: string;
    catModId: number;
}

const SearchCategorias = ({usrId, nivel}: any) => {
    const router = useRouter();
    const [categorias, setCategorias] = useState<Array<categoriasProps>>([]);
    const [idCat, setIdCategoria] = useState(router.query.catId);
    const [atualiza, setAtualiza] = useState(0);
          
    const {query: { catId }, } = router;
    const {query: { nivAce }, } = router;
      
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {
        api({
            method: 'get',    
            url: `/categorias`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(resp) {
            console.log(resp.data)
            setCategorias(resp.data);

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
            alert(`Falha no token de acesso das categorias`);
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
                url: `/categorias`,
                headers: {
                    "x-access-token" : token    
                },      
            }).then(function(response) {
                setCategorias(response.data);
            }).catch(function(error) {                
                alert(`Falha no token de acesso das categorias`);
            })
        }
    }, [atualiza])
    
    return (
        <div className="mb-32 h-auto">
            <div className='flex items-center justify-between w-full h-12 bg-gray-300 '>
                <span className='text-[12px] font-bold text-black ml-2 md:ml-28 '>Olá, {nomUsr}</span>                 
            </div>
            <div className="flex flex-row justify-between items-center ">
                <Link href={`/NewCategoria`} > 
                    <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                        Nova Categoria
                    </span>
                </Link>                    
            </div>
            <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-2 md:mt-3 ">  
                {categorias?.map((row) => ( 
                    <Link key={row.catId} href={`/AltCategoria/${row.catId}`}>
                        <div key={row.catId} className="h-auto rounded overflow-hidden shadow-2xl mb-5 w-full " > 
                            <div className="flex flex-row w-full h-full">
                                <div className="w-full h-full">   
                                    <div className="w-full ml-5 flex flex-row text-gray-700 text-[14px] font-bold" >
                                        {row.catDescricao}
                                    </div>                                                                                 
                                </div>
                            </div>
                        </div>
                    </Link>                                             
                ))}
            </div>
        </div>   
    );
}

export default SearchCategorias;