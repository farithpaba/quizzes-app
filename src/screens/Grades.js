import { useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from "../components/Header";
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckboxBlankCircleFill, RiCloseLine, RiDashboardLine, RiFileEditLine, RiFilterLine, RiMapPinRangeLine, RiMenu3Fill, RiSearchLine, RiUserFill } from "react-icons/ri";
import Student from "../components/Student";
import ModalStudent from "../components/ModalStudent";
import Nota from "../components/Nota";
import { useNavigate } from "react-router-dom";

function Grades() {
  let navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdown, setDropdown] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const [students, setStudents] = useState([
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a063",
      fullName: "Juanito Fabian Perez Arzuaga",
      email: "juanito@gmail.com",
      telefono: "123312312",
      cursos: [
        "Starters",
        "Curso preparación EAT"
      ],
      estatus: "true",
      intentos:[
        {id:1,fecha:"13/09/2023", nota:"80%"},
        {id:2,fecha:"15/09/2023", nota:"50%"},
      ], 
      notaFinal:80
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a062",
      fullName: "Andres Arturo Garcia",
      email: "andres@gmail.com",
      telefono: "1231123122",
      cursos: [
        "Starters",
      ],
      estatus: "false",
      intentos:[
        {id:1,fecha:"25/09/2023", nota:"70%"},
      ], 
      notaFinal:70
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a061",
      fullName: "Laura Zapata",
      email: "laura@gmail.com",
      telefono: "77777",
      cursos: [
        "Curso preparación EAT"
      ],
      estatus: "true",
      intentos:[
        {id:1,fecha:"13/01/2023", nota:"10%"},
        {id:2,fecha:"15/02/2023", nota:"60%"},
      ], 
      notaFinal:60
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a060",
      fullName: "Miriam Daza",
      email: "miriam@gmail.com",
      telefono: "555555",
      cursos: [
        "Curso 6-8pm Miercoles"
      ],
      estatus: "false",
      intentos:[], 
      notaFinal:"N/A"
    },
  ])

  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState();

  const CloseModal = () => setModal(null);

  function handleObj(e) {
    if (e !== null) {
      setStudents([...students, e]);
    }
  }

  function handleEdit(e) {
    if (e !== null) {
      var newArray = students.map((student) => {
        if (student.id === e.id) {
          return e
        } else {
          return student
        }
      });
      setStudents(newArray);
    }
  }
  function ordenar() {
    setOrder(!order);
    var newArray = [];
    students.map((obj) => newArray.push(obj));

    /*     newArray.sort((x, y) => x.fullName.localeCompare(y.fullName)); */
    var _ = require('lodash');
    var orden;
    if (order === true) {
      orden = 'asc'
    } else {
      orden = 'desc'
    }
    let sorted = _.orderBy(newArray, ['fullName'], [orden]);
    setStudents(sorted);


  }



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
                  <p onClick={() => navigate("/moduleEdit")} className="hover:cursor-pointer">Exámenes</p>
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
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 3
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 4
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 5
                </a>
                <a href="#" className="relative pl-8 py-2 text-gray-400">
                  <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                  Exámen 6
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
            <h1 className="text-3xl font-semibold">Notas</h1>
          </div>
          {/* Search */}
          <form className="col-span-2 mb-5">
            <div className="relative">
              <RiSearchLine className="absolute left-2 top-3 textColorCustom" />
              <input
                id="searchBar"
                type="text"
                className="bg-white py-2 pl-8 pr-4 outline-none  w-full"
                placeholder="Buscar"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              N° de estudiantes: <span className="textColorCustom font-bold">{students.length}</span>
            </p>

            <p className="flex items-center gap-2 text-gray-500 text-sm">
              Ordenar por:
              <span onClick={ordenar} className="textColorCustom font-bold hover:cursor-pointer flex items-center">
                Nombre{order === false ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
              </span>
            </p>
          </div>
          <br />
          {/* Estudiantes */}
          {students
            .filter((obj) => {
              return search.toLowerCase() === ''
                ? obj
                : obj.fullName.toLowerCase().includes(search.toLowerCase());
            })
            .map((obj) =>
              <Nota key={obj.id} obj={obj} edit={handleEdit} />
            )}
        </div>
      </main>
    </div>
  );
}

export default Grades;