import { useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"
import ModalCreate from "../components/ModalCreate";
import Module from "../components/Module";

function HomeAdmin() {
  let navigate = useNavigate();


  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);

  function handleValue(e) {
    if (e !== null) {
      setCourses(courses.concat(e))
    }
  }

  const [courses, setCourses] = useState([
    { id: "1", nombre: "Curso 6:00-8:00pm Miercoles", fecha: "19 sep, 2022", nivel: "B2+" },
    { id: "2", nombre: "Curso preparación EAT", fecha: "15 oct, 2023", nivel: "C1" },
    { id: "3", nombre: "Curso Starters", fecha: "06 dic, 2020", nivel: "A1" },
  ]);

  function handleDelete(e) {
    if (e !== null) {
      var newArray = courses.filter((course) => course.id !== e);
      setCourses(newArray);
    }
  }

  function handleEdit(e) {
    if (e !== null) {
      var newArray = courses.map((course) => {
          if (course.id === e.id) {
              return e
          }else{
              return course
          }
      });
      setCourses(newArray);
    }
  }


  return (
    <div>
      <Sidebar />


      {/* Content */}
      <main className="lg:pl-80 p-8">
        {/* Header */}
        <Header />

        <div className="mt-[50px]">

          <button onClick={() => setShowMyModal(true)} className="rounded-full p-2 flex mx-auto mt-3 mb-6 relative py-2 px-6 text-center textColorCustom border boderColorCustom overflow-hidden transition-all ease-in-out before:absolute before:bgColorCustom before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-500 before:w-full before:h-0 before:rotate-45 hover:before:h-[380%] hover:text-white">
            Agregar módulo
          </button>

          {courses.map((obj) =>
            <Module key={obj.id} obj={obj} delete={handleDelete} edit={handleEdit} />
          )}

        </div>
        <ModalCreate onClose={handleOnClose} visible={showMyModal} handleValue={handleValue} type={"modulo"}  />
      </main>
    </div>
  );
}

export default HomeAdmin;