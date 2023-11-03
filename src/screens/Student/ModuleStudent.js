import { useState } from "react";
import Sidebar from '../../components/Students/SidebarStudents'
import Header from '../../components/Students/HeaderStudents'
import { RiAddCircleFill, RiArrowDownSLine, RiArrowUpSLine, RiCheckboxBlankCircleFill, RiCloseLine, RiDashboardLine, RiMenu3Fill } from "react-icons/ri";
import { useNavigate } from "react-router";

function ModuleStudents() {
  let navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdown, setDropdown] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  var quizzes = [
    { nombre: "Examen 1", nivel: "B2+", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 2", nivel: "A2", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
  ]
  /* var quizzes2 = [
    { nombre: "Examen 1", nivel: "B2+", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 2", nivel: "A2", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 3", nivel: "B2+", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 4", nivel: "A2", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
  ] */

  const [quizzes2, setQuizzes2] = useState([
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a063",
      name:"Examen 1",
      intentos: [
        { id: 1, fecha: "13/09/2023", nota: "80%" },
        { id: 2, fecha: "15/09/2023", nota: "50%" },
      ],
      notaFinal: 80
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a062",
      name:"Examen 2",
      intentos: [
        { id: 1, fecha: "25/09/2023", nota: "70%" },
      ],
      notaFinal: 70
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a061",
      name:"Examen 3",
      intentos: [
        { id: 1, fecha: "13/01/2023", nota: "10%" },
        { id: 2, fecha: "15/02/2023", nota: "60%" },
      ],
      notaFinal: 60
    },

  ])


  return (
    <div>
      {/* Sidebar */}
      <div
        className={`bg-white fixed ${showMenu ? "-left-0" : "-left-full"
          } lg:left-0 top-0 w-72 h-full p-8 flex flex-col justify-between transition-all overflow-y-scroll z-50 border-r`}
      >
        {/* Menu */}
        <div>
          {/* Logo */}
          <div className="mb-8">
            <h1 className="textColorCustom uppercase font-bold text-2xl tracking-[4px]">
              Tu Logo
            </h1>
          </div>
          {/* Nav */}
          <nav>

            <div
              className="flex flex-col gap-4 text-gray-200 py-2 hover:text-gray-200 transition-colors "
            >
              <span className="flex items-center gap-4">
                <RiDashboardLine className="text-gray-400 " />
                <div className="flex-1 flex items-center justify-between font-semibold text-gray-400 ">
                  <p onClick={() => navigate("/")} className="hover:cursor-pointer">Modulos</p>
                  <div className="hover:cursor-pointer" onClick={() => setDropdown(!dropdown)}>{dropdown ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</div>
                </div>
              </span>
              <nav className={`flex flex-col border-l relative ${dropdown ? "left-0" : "-left-full"}  top-0 transition-colors  border-gray-600 ml-2 `}>
                <a href="#" className="relative pl-5 py-2  text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Curso 6:00-8:00pm Miercoles
                </a>
                <a href="#" className="relative pl-5 py-2  text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Curso preparación EAT
                </a>
                <a href="#" className="relative pl-5 py-2  text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Curso Starters
                </a>
              </nav>
            </div>
          </nav>
        </div>
      </div>

      {/* Btn menu movile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed right-4 bottom-4 bgColorCustom  text-white text-xl p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>


      {/* Content */}
      <main className="lg:pl-80 p-8">
        {/* Header */}
        <Header />

        <div className="mt-[50px]">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-600">Exámenes pendientes</h1>
          </div>

          {/* Estudiantes */}
          {quizzes.map((obj) =>
            <div onClick={() => navigate("/preExam")} className="bg-white hover:bg-slate-50  hover:cursor-pointer max-w-5xl mx-auto py-1  px-6 rounded-lg shadow-xl my-3">
              <div className="flex flex-col gap-2 mb-4">
                <a
                  className="text-2xl text-gray-700"
                >
                  {obj.nombre}
                </a>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500  text-sm">{"Fecha de inicio: " + obj.fechaInicio}</p>
                  <p className="text-gray-500  text-sm">{"Fecha de cierre: " + obj.fechaCierre}</p>
                </div>

                <span className="bgColorCustom text-white py-2 px-4 text-xs rounded uppercase">
                  {obj.nivel}
                </span>
              </div>
            </div>
          )}
          <br />
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-600">Exámenes realizados</h1>
          </div>
          {/* Estudiantes */}
          {quizzes2.map((obj) =>
            <div className="bg-white max-w-5xl mx-auto py-1 px-6 rounded-lg shadow-xl my-2 pb-3">
              <div className="flex items-center justify-between my-1 ">
                <a
                  className="text-2xl text-gray-700  w-2/3"
                >
                  {obj.name}
                </a>
                <div className='flex flex-col items-center'>
                  <p className='text-gray-500'>Nota Final:</p>
                  <span className="bgColorCustom text-white py-2 px-4 text-xs rounded uppercase">
                    {obj.notaFinal}
                  </span>
                </div>
              </div>

              <div >
                {obj.intentos.length > 0 &&
                  <div className="flex justify-between   py-1 ">
                    <p className="font-bold w-13">Intento</p>
                    <p className="font-bold w-13">&nbsp;&nbsp;Fecha&nbsp;&nbsp;</p>
                    <p className="font-bold w-10">Nota</p>
                    <p className="font-bold w-13">Revisión</p>
                  </div>
                }

                {obj.intentos.map((intento) =>
                  <div className="flex justify-between  py-1">
                    <p className="font-extralight w-13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{intento.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p className="font-extralight w-13">{intento.fecha}</p>
                    <p className="font-extralight w-10">{intento.nota}</p>
                    <p className="font-extralight w-13 ">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <a className="hover:underline hover:cursor-pointer hover:textColorCustom">Ver</a>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                  </div>
                )}



              </div>
            </div>
          )}



        </div>
      </main>
    </div>
  );
}

export default ModuleStudents;