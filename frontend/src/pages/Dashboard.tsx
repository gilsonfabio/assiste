import React, {useState, useEffect, useContext} from 'react';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Router, { useRouter } from "next/router";
import { AuthContext } from '../contexts/AuthContext';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import SearchModulos from '../components/SearchModulos';

interface localProps {
  token: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext)

  const [nivLiberado, setNivLiberado] = useState('');
  const { 'nextauth.token': token } = parseCookies();
  const { 'nextauth.refreshToken': refreshToken } = parseCookies();
  const { 'nextauth.usrId': idUsr } = parseCookies();
  const { 'nextauth.usrNome': nomUsr } = parseCookies();
  const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

  useEffect(() => {        
    setNivLiberado('9');      
  }, [])
  
  return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <div className='ml-2 mr-2 md:ml-32 md:mr-32'>
          <SearchModulos />
        </div>            
      </div>      
    </div>
  );
};
export default Dashboard;