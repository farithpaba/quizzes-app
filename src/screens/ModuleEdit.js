import { useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from "../components/Header";
import { RiAddCircleFill, RiArrowDownSLine, RiArrowUpSLine, RiCheckboxBlankCircleFill, RiCloseLine, RiDashboardLine, RiMenu3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalCreate from "../components/ModalCreate";
import Exam from "../components/Exam";

function ModuleEdit() {
    let navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [dropdown, setDropdown] = useState(true);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const [showMyModal, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    function handleValue(e) {
        if (e !== null) {
            console.log(e);
            setQuizzes(quizzes.concat(e))
        }
    }


    const [quizzes, setQuizzes] = useState([
        { id: "1", nombre: "Examen 1", nivel: "B2+", fechaInicio: "2023-09-12", fechaCierre: "2023-09-12", cronometro:false, calificable:true, intentos:1, revision:false,duracion:"N/A" },
        { id: "2", nombre: "Examen 2", nivel: "A2", fechaInicio: "2023-10-15", fechaCierre: "2023-10-15", cronometro:false, calificable:false, intentos:2, revision:true,duracion:"N/A" },
        { id: "3", nombre: "Examen 3", nivel: "B2+", fechaInicio: "2023-01-30", fechaCierre: "2023-01-30", cronometro:false, calificable:true, intentos:3, revision:false,duracion:"N/A" },
    ]);

    function handleDelete(e) {
        if (e !== null) {
            var newArray = quizzes.filter((quiz) => quiz.id !== e);
            setQuizzes(newArray);
        }
    }

    function handleEdit(e) {
        if (e !== null) {
            console.log(e);
            var newArray = quizzes.map((quiz) => {
                if (quiz.id === e.id) {
                    return e
                } else {
                    return quiz
                }
            });
            setQuizzes(newArray);
        }
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
                   

                    <button onClick={() => setShowMyModal(true)} className="rounded-full p-2 flex mx-auto mt-3 mb-6 relative py-2 px-6 text-center textColorCustom border boderColorCustom overflow-hidden transition-all ease-in-out before:absolute before:bgColorCustom before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-500 before:w-full before:h-0 before:rotate-45 hover:before:h-[380%] hover:text-white">
                        Crear exámen
                    </button>
                    {quizzes.map((obj) =>
                        <Exam key={obj.id} obj={obj} delete={handleDelete} edit={handleEdit} />
                    )}
                </div>
                <ModalCreate onClose={handleOnClose} visible={showMyModal} handleValue={handleValue} type={"examen"} />
            </main>
        </div>
    );
}

export default ModuleEdit;