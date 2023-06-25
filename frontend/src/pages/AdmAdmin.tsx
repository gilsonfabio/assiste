import React, {useState} from 'react';
import Menubar from '../components/Menubar';
import SearchAdmin from '../components/SearchAdmin';
import Router, { useRouter } from "next/router";


const AdmAdmin = () => {
  const router = useRouter();
  const [idUsr, setIdUsuario] = useState(router.query.id);
  const [nivAcesso, setNivAcesso] = useState(router.query.nivAce);
  const {query: { id, nivAce },  } = router;
  
  return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <div className=''>
            <SearchAdmin />
        </div>            
      </div>      
    </div>
  );
};
export default AdmAdmin;