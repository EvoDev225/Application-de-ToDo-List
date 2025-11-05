import { useState } from 'react';
import liste from "../../public/liste.png"
const Input = ({NouvelTache}) => {
    const [input,setInput] = useState("");

        const  Formulaire = (e)=>{
          e.preventDefault();
          if(e.target[0].value.trim() ==="") return;
          NouvelTache(input);
          setInput("");
        }
        const handleChange = (e) => {
            setInput(e.target.value);
        }
  return (
    <div className='  my-10'>
       <div className=' flex items-center my-2'>
         <h2 className=' flex items-center gap-1 text-xl md:text-3xl'>
          <img src={liste} alt="liste"  width={50} height={50} className=' mx-5'/>
          Insérer une nouvelle tâche
          </h2>
       </div>
       <form className=' grid md:flex items-center gap-5 justify-center my-8 ' onSubmit={Formulaire}>
        <input type=" text" placeholder='Entrez une information' value={input} className=' w-full md:w-[80%] px-8 py-3 border-black rounded-full  shadow_input'onChange={handleChange} />
       <div className=' flex items-center '>
         <input type='submit' className='  ml-8 px-8 py-3 rounded-full relative z-10 cursor-pointer  bg-green-400 add ' value={"Ajouter"}/>
       </div>
       </form>
    </div>
  )
}

export default Input
