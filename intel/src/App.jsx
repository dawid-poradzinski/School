import './App.css';
import { Outlet } from "react-router-dom";
import SingleByte from './variable/SingleByte';
import { useEffect, useState } from 'react';

function App() {
  const [bytes, setBytes] = useState([]);
  const [hBytes, setHBytes] = useState([]);
  const [lBytes, setLBytes] = useState([]);


  const randNumber = () => {
    let number = "";
    for(let i = 0; i < 8; i++)
    {
      number += Math.floor(Math.random() * 2);
    }
    return number
  }
    
  let tab = [];
  for(let i = 0; i < 8; i++)
  {
    let letter = 'A';
    letter = letter.charCodeAt(0);
    let seccondLetter;
    if(i < 4)
    {
      letter += i;
      seccondLetter = "H";
    }
    else
    {
      letter += (i - 4);
      seccondLetter = "L";
    }
    letter = String.fromCharCode(letter);
    let binary = randNumber();

    tab.push(<SingleByte id={letter + seccondLetter} binary = {binary} i = {i}></SingleByte>);
  }

  useEffect(() => {
    setBytes(tab);
  }, [])

  useEffect(() => {

    let htab = [];
    let ltab = [];
    for(let i = 0; i < 8; i++) {
      if(i < 4){
        htab.push(bytes[i]);
      }
      else{
        ltab.push(bytes[i]);
      }
    }
    setHBytes(htab);
    setLBytes(ltab);

  }, [bytes]);


  return (
    <div className="flex-col lg:flex-row flex w-screen h-screen bg-gradient-to-tr from-stone-600 to-zinc-800">

        <div className='flex lg:w-[25%] h-[65%] lg:h-full lg:flex-col lg:justify-center lg:gap-12 lg:p-4 lg:items-center items-center flex-wrap justify-center gap-8'>
          {hBytes}
        </div>

        <div className='flex w-screen px-10 lg:px-0 lg:w-[50%] h-full items-center'>
            <div className='w-full h-full lg:h-[50%]'>
              <Outlet context={[bytes, setBytes]}/>
            </div>
        </div>

        <div className='flex lg:w-[25%] h-[65%] lg:h-full lg:flex-col lg:justify-center lg:gap-12 lg:p-4 lg:items-center items-center flex-wrap justify-center gap-8'>
          {lBytes}
        </div>

    </div>
  );
}

export default App;
