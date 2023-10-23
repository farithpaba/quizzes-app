import { useState } from "react";
import Sidebar from '../../components/Students/SidebarStudents'
import Header from '../../components/Students/HeaderStudents'
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckboxBlankCircleFill, RiCloseLine, RiFileEditLine, RiFilterLine, RiMapPinRangeLine, RiMenu3Fill, RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router";

function PreExam() {
  let navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);

  const [dropdown, setDropdown] = useState(true);
  const [dropdown2, setDropdown2] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  var quizzes = [
    { nombre: "Examen 1", nivel: "B2+", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 2", nivel: "A2", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
  ]
  var quizzes2 = [
    { nombre: "Examen 1", nivel: "B2+", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 2", nivel: "A2", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 3", nivel: "B2+", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
    { nombre: "Examen 4", nivel: "A2", fechaInicio: "15/05/2023", fechaCierre: "15/09/2023" },
  ]

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
                <RiFileEditLine className="text-gray-400" />
                <div className="flex-1 flex items-center justify-between font-semibold text-gray-400 hover:cursor-pointer">
                  <p onClick={() => navigate("/module")} className="hover:cursor-pointer">Exámenes pendientes</p>
                  <div onClick={() => setDropdown(!dropdown)} className="hover:cursor-pointer">{dropdown ? <RiArrowUpSLine /> : <RiArrowDownSLine />} </div>

                </div>
              </span>
              <nav className={`flex flex-col border-l relative ${dropdown ? "left-0" : "-left-full"}  top-0 transition-colors  border-gray-600 ml-2 `}>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 1
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 2
                </a>
              </nav>
            </div>

            <div
              className="flex flex-col gap-4 text-gray-200 py-2 hover:text-gray-200 transition-colors "
            >
              <span className="flex items-center gap-4">
                <RiFileEditLine className="text-gray-400" />
                <div className="flex-1 flex items-center justify-between font-semibold text-gray-400 hover:cursor-pointer">
                  <p onClick={() => navigate("/module")} className="hover:cursor-pointer">Exámenes realizados</p>
                  <div onClick={() => setDropdown2(!dropdown2)} className="hover:cursor-pointer">{dropdown2 ? <RiArrowUpSLine /> : <RiArrowDownSLine />} </div>

                </div>
              </span>
              <nav className={`flex flex-col border-l relative ${dropdown2 ? "left-0" : "-left-full"}  top-0 transition-colors  border-gray-600 ml-2 `}>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 1
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 2
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 3
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 4
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
      <main className="lg:pl-80 ">
        {/* Header */}
        <Header />

        <div className=" flex h-screen">
          {/* Title */}
          <div className="m-auto">
            <h1 className="text-3xl font-semibold text-gray-600 text-center">Exámen 1</h1>
            <br />
            <p className="text-justify px-10 text-gray-600">Praesent non libero semper, pulvinar dui egestas, hendrerit ipsum. Quisque volutpat ornare placerat. Morbi ex velit, mollis et fermentum a, bibendum eu eros. Praesent dictum fringilla eros at venenatis. Integer sem tortor, egestas vel lacus vel, aliquam posuere arcu.</p>
            <br />
            <p className="text-center text-gray-600">Fecha de Inicio: 15/05/2023</p>
            <p className="text-center text-gray-600">Fecha de Cierre: 15/09/2023</p>
            <br />
            <p className="text-center text-gray-600">Intentos permitidos: 2</p>
            <br />
            <button onClick={() => navigate("/quiz")} className="bgColorCustom rounded-full text-white p-2 flex mx-auto hover:scale-95 duration-100">Empezar exámen</button>
            <br/>
            
            {/* Intentos permitidos */}
            
            {/* <div className="px-16">

              <div className="flex justify-between border-y border-gray-300 py-1 bg-slate-200 px-2">
                <p className="font-bold w-13">Intento</p>
                <p className="font-bold w-13">&nbsp;&nbsp;Fecha&nbsp;&nbsp;</p>
                <p className="font-bold w-13">Calificación</p>
                <p className="font-bold w-13">Revisión</p>
              </div>
              
              <div className="flex justify-between border-b border-gray-300 py-1 px-2">
                <p className="font-extralight w-13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p className="font-extralight w-13">13/09/2023</p>
                <p className="font-extralight w-13">8 de 10 (80%)</p>
                <p className="font-extralight w-13 ">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="hover:underline hover:cursor-pointer hover:textColorCustom">Ver</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              </div>

              <div className="flex justify-between border-b border-gray-300 py-1 px-2">
                <p className="font-extralight w-13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p className="font-extralight w-13">15/09/2023</p>
                <p className="font-extralight w-13">5 de 10 (50%)</p>
                <p className="font-extralight w-13 ">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="hover:underline hover:cursor-pointer hover:textColorCustom">Ver</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              </div>

            </div> */}

          </div>




        </div>
      </main>
    </div>
  );
}

export default PreExam;