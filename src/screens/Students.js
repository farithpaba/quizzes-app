import { useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from "../components/Header";
import { RiArrowDownSLine, RiArrowUpSLine, RiCloseLine, RiFilterLine, RiMapPinRangeLine, RiSearchLine, RiUserFill } from "react-icons/ri";
import Student from "../components/Student";
import ModalStudent from "../components/ModalStudent";

function Students() {
  const [showMenu, setShowMenu] = useState(false);

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
      estatus: "true"
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a062",
      fullName: "Andres Arturo Garcia",
      email: "andres@gmail.com",
      telefono: "1231123122",
      cursos: [
        "Starters",
      ],
      estatus: "false"
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a061",
      fullName: "Laura Zapata",
      email: "laura@gmail.com",
      telefono: "77777",
      cursos: [
        "Curso preparación EAT"
      ],
      estatus: "true"
    },
    {
      id: "aeddd4fb-e5dc-4275-85ff-9c42cd93a060",
      fullName: "Miriam Daza",
      email: "miriam@gmail.com",
      telefono: "555555",
      cursos: [
        "Curso 6-8pm Miercoles"
      ],
      estatus: "false"
    },
  ])
  var courses = ["Starters", "Curso preparación EAT", "Curso 6-8pm Miercoles"];

  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('Todos');
  const [filterCourse, setFilterCourse] = useState('Todos');
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
    students.map((obj)=>newArray.push(obj));

/*     newArray.sort((x, y) => x.fullName.localeCompare(y.fullName)); */
    var _ = require('lodash');
    var orden;
    if (order === true) {
      orden = 'asc'
    }else{
      orden = 'desc'
    }
    let sorted = _.orderBy(newArray, ['fullName'], [orden]);
    setStudents(sorted);

    
  }

 

  return (
    <div>
      <Sidebar />


      {/* Content */}
      <main className="lg:pl-80 p-8">
        {/* Header */}
        <Header />

        <div className="mt-[50px]">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">Estudiantes</h1>
          </div>
          {/* Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
            <form className="col-span-2">
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

            <form className="col-span-1">
              <div className="relative">
                <RiUserFill className="absolute left-2 top-3 textColorCustom" />
                <select
                  type="text"
                  className="bg-white py-[9px] pl-8 pr-4 text-gray-600 outline-none  w-full"
                  placeholder="Search"
                  onChange={(e) => setFilterActive(e.target.value)}
                >
                  <option value='Todos'>Todos</option>
                  <option value='true'>Activos</option>
                  <option value='false'>Inactivos</option>
                </select>
              </div>
            </form>

            <form className="col-span-1">
              <div className="relative">
                <RiFilterLine className="absolute left-2 top-3 textColorCustom" />
                <select
                  id="filtros"
                  className="bg-white py-2 pl-8 pr-4 outline-none  w-full text-gray-600"
                  defaultValue={""}
                  onChange={(e) => setFilterCourse(e.target.value)}
                >
                  <option value='Todos'>Todos</option>
                  {courses.map((course) =>
                    <option key={course} value={course}>{course}</option>
                  )}
                </select>
                
              </div>
            </form>
          </div>
          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              N° de estudiantes: <span className="textColorCustom font-bold">{students.length}</span>
            </p>

            <p className="flex items-center gap-2 text-gray-500 text-sm">
              Ordenar por: 
              <span onClick={ordenar} className="textColorCustom font-bold hover:cursor-pointer flex items-center">
                Nombre{order === false ?<RiArrowDownSLine />:<RiArrowUpSLine />}
              </span>
            </p>
          </div>
          {/* Btn Agregar estudiante */}
          <button onClick={() => setModal(true)} className="rounded-full p-2 flex mx-auto mt-3 mb-6 relative py-2 px-6 text-center textColorCustom border boderColorCustom overflow-hidden transition-all ease-in-out before:absolute before:bgColorCustom before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-500 before:w-full before:h-0 before:rotate-45 hover:before:h-[380%] hover:text-white">
            Agregar estudiante
          </button>
          {/* Estudiantes */}
          {students
            .filter((obj) => {
              return search.toLowerCase() === ''
                ? obj
                : obj.fullName.toLowerCase().includes(search.toLowerCase());
            })
            .filter((obj) => {
              return filterActive.toLowerCase() === 'todos'
                ? obj
                : obj.estatus.toLowerCase().includes(filterActive.toLowerCase());
            })
            .filter((obj) => {
              if (filterCourse === 'Todos') {
                return obj;
              }else{
                return obj.cursos.includes(filterCourse);
              }
            })
            .map((obj) =>
              <Student key={obj.id} obj={obj} edit={handleEdit} />
            )}
        </div>
      </main>
      {modal && <ModalStudent onClose={CloseModal} handleValue={handleObj} />}
    </div>
  );
}

export default Students;