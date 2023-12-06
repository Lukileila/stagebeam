import { BeamerManager } from "../components/BeamerManager"
import { useEffect, useState } from "react";

export const Beamer = () => {

  const [beamerOnline, setBeamerOnline] = useState(true)

  useEffect(()=>{setBeamerOnline(true)}

    ,[]);



  //updates beamerOnline, when window is closed
  useEffect(() => {
      const onClose =(e)=>{
        e.preventDefault();
        setBeamerOnline(false);
        window.close();
      }
      window.addEventListener('beforeunload', onClose );
      return () => {
        window.removeEventListener('beforeunload', onClose);
      };
    }, []);

    useEffect(() => { localStorage.setItem('beamerOnline',beamerOnline) }, [beamerOnline]);



  return (
    <BeamerManager/>
  )
}
