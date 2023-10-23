import { useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from "../components/Header";

function Grades() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  var courses = [
    {nombre:"Curso 6:00-8:00pm Miercoles",fecha:"19 sep, 2022", nivel:"B2+"},
    {nombre:"Curso preparación EAT",fecha:"15 oct, 2023", nivel:"C1"},
    {nombre:"Curso Starters",fecha:"06 dic, 2020", nivel:"A1"},
  ];

  return (
    <div>
      <Sidebar/>
      

      {/* Content */}
      <main className="lg:pl-80 p-8">
        {/* Header */}
        <Header/>

        <div className="mt-[50px]">
          
        {courses.map((obj)=>
            <div className="bg-white max-w-5xl mx-auto py-4 px-6 rounded-lg shadow-xl my-3">
            <div className="flex flex-col gap-2 mb-4">
              <a
                href="#"
                className="text-2xl text-gray-700 font-bold hover:underline"
              >
                {obj.nombre}
              </a>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 uppercase text-sm">{obj.fecha}</p>
              <span className="bgColorCustom text-white py-2 px-4 text-xs rounded uppercase">
                {obj.nivel}
              </span>
            </div>
          </div>
          )}






        </div>
      </main>
    </div>
  );
}

export default Grades;