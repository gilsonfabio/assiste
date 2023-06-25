import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface itensProps {
    iteModId: number;
    iteModSequencia: number;
    iteModDescricao: string;
    iteModLink: string;
}

const SearchIteModulos = ({modId}):any => {
    const router = useRouter();
    const [itens, setItens] = useState<Array<itensProps>>([]);
    //const [idMod, setIdModulos] = useState('');
    const [atualiza, setAtualiza] = useState(0);
          
//    const {query: { modId }, } = router;
      
    useEffect(() => {
        //setIdModulos(modId);
        let idMod = modId;
        api({
            method: 'get',    
            url: `/iteModulos/${idMod}`,
        }).then(function(resp) {
            setItens(resp.data);
        }).catch(function(error) {  
                          
        })        
    }, [])

    return (
        <div className="">
            <div className="flex flex-col">  
                {itens?.map((row) => ( 
                    <Link key={row.iteModSequencia} href={row.iteModLink}>
                        <div className="ml-2 mt-2 text-gray-900 hover:bg-blue-800 cursor-pointer hover:text-white " > 
                            <span className=" ">{row.iteModDescricao}</span>
                        </div>
                    </Link>                                             
                ))}
            </div>
        </div>   
    );
}

export default SearchIteModulos;