import {  useEffect, useState } from "react"
import Input from "./components/Input"
import cercle from "../public/cercle.png"
import  check from "../public/verifier.png"
function App() {
  const [tache,setTache] =  useState([])

  useEffect(()=>{
        const afficherTache = JSON.parse(localStorage.getItem("tache"));
        if(afficherTache){
          setTache(afficherTache)
        }
  },[])
// Ajouter une nouvelle tâche
  const NouvelTache =(task)=>{
    const AjouterTache = [{
      id: tache.length +1,
      text: task,
      completed:false
    }]
    setTache([...tache,...AjouterTache])
    enregistrerTache([...tache,...AjouterTache])
  }
  const enregistrerTache= (tache)=>{
    localStorage.setItem("tache",JSON.stringify(tache))
  
  }
  // Mettre a jour une tâche comme complète
  const TacheComplete = (id,)=>{
    const updatedTasks = tache.map((task)=> task.id === id?{...task,completed:!task.completed}:task)
    setTache(updatedTasks)
    enregistrerTache(updatedTasks)
   
  }
  // Supprimer une tâche
  const SupprimerTache = (id)=>{
    const deleteTask = tache.filter((task)=>task.id !==id);
    setTache(deleteTask)
    enregistrerTache(deleteTask)
  }
  //Nombre de tâches complétées
  const Compteur =()=>{
      const tacheComplete = tache.filter((task)=>task.completed).length;
      const tacheIncomplete = tache.length;
        const totalTachesAccomplie  = tacheComplete - tacheIncomplete; 
      return {tacheComplete,tacheIncomplete,totalTachesAccomplie}
  }
  const {tacheComplete,tacheIncomplete,totalTachesAccomplie} = Compteur();

    

 

  return (
    <div className=" max-w-5xl mx-auto  my-18 p-5  border rounded-2xl overflow-hidden text-white">
      <div className=" flex gap-1 items-end py-5">
        <h1 className="  uppercase text-4xl md:text-6xl font-semibold">todolist</h1>
        <p className=" font-medium text-gray-500">Par EvoDev</p>
      </div>
      <div className=" container ">
        <Input NouvelTache={NouvelTache} />
      </div>
      {/* Liste */}
      <div className="  my-10 p-10 rounded-2xl bg-[#343a40]  ">
        <h2 className=" text-2xl md:text-4xl font-semibold mb-5">Liste des tâches</h2>
        <p className="text-xl text-gray-400">
         {tacheIncomplete >0?`Vous avez ${tacheIncomplete} tâche(s) en cours`:`Vous n'avez aucune tâche en cours,Ajouter en une !`}
         
          </p>
        <div className=" my-10   ">
          <ul className=" flex flex-col gap-6">
            {tache.map((task)=>(
              <li key={task.id} className={` rounded-full p-4 text-xl flex items-center justify-between shadow_box  ${task.completed ? 'bg-green-400 ':undefined } `}> 
             <div className="flex items-center gap-1">
               <span className="text-[18px] "> {task.id}. </span>
             <p className={` ${task.completed?"line-through text-white":undefined} `}> {task.text}</p>
             </div>
             <div className="flex items-center gap-5">
            <button onClick={()=>TacheComplete(task.id)} className={`hover:scale-[0.9] duration-300  transition-all cursor-pointer `}>
                <img src={check} alt="" width={50} height={50} />
              </button>
               <button onClick={()=>SupprimerTache(task.id)}  className=" hover:scale-[0.9] duration-300 transition-all cursor-pointer">
                <img src={cercle} alt="" width={50} height={50} />
              </button>
             </div>
              </li>
            ))}
          </ul>
        </div>
        {/* footer */}
        <div className=" my-10 " >
           <p className=" text-2xl font-medium text-gray-400">
            {totalTachesAccomplie <0 ? `Vous avez accompli ${tacheComplete} tâche(s) sur ${tacheIncomplete}` : (`${tacheIncomplete>0?`Félicitations ! Vous avez accompli toutes vos tâches  `:``} `)} 
             </p>
        </div>
      </div>
    </div>
  )
}

export default App
