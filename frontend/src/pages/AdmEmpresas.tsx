import React, {useState} from 'react';
import Menubar from '../components/Menubar';
import SearchEmpresas from '../components/SearchEmpresas';
import Router, { useRouter } from "next/router";


const AdmEmpresas = () => {
  const router = useRouter();
  const [idUsr, setIdUsuario] = useState(router.query.id);
  const [nivAcesso, setNivAcesso] = useState(router.query.nivAce);
  const {query: { id, nivAce },  } = router;
  
  return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <div className='ml-2 mr-2 md:ml-32 md:mr-32'>
            <SearchEmpresas />
        </div>            
      </div>      
    </div>
  );
};
export default AdmEmpresas;