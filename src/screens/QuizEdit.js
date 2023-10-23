import { useMemo, useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from "../components/Header";
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckboxBlankCircleFill, RiCloseLine, RiDashboardLine, RiFileEditLine, RiFileUserLine, RiMenu3Fill, RiSettings3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalCreate from "../components/ModalCreate";
import Section from "../components/Section";
import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

function QuizEdit() {
    let navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const [showMyModal, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    const [dropdown, setDropdown] = useState(true);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    /*  */

    const [sections, setSections] = useState([
        { id: "1", nombre: "Listening" },
        { id: "2", nombre: "Speaking" },
        { id: "3", nombre: "Reading" },
    ]);

    function handleDelete(e) {
        if (e !== null) {
          var newArray = sections.filter((section) => section.id !== e);
          setSections(newArray);
        }
      }
    
      function handleEdit(e) {
        if (e !== null) {
          var newArray = sections.map((section) => {
              if (section.id === e.id) {
                  return e
              }else{
                  return section
              }
          });
          setSections(newArray);
        }
      }

    const itemIds = useMemo(() => sections.map((item) => item.nombre), [sections]);

    function handleValue(e) {
        if (e !== null) {
            setSections(sections.concat(e))
        }

    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setSections((items) => {
                const activeIndex = itemIds.indexOf(active.id)
                const overIndex = itemIds.indexOf(over.id)

                return arrayMove(items, activeIndex, overIndex);
            })
        }
    }


    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
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
                                <span  className="flex items-center gap-4">
                                    <RiFileEditLine className="text-gray-400" />
                                    <div className="flex-1 flex items-center justify-between font-semibold text-gray-400 hover:cursor-pointer">
                                        <p onClick={()=>navigate("/moduleEdit")} className="hover:cursor-pointer">Exámenes</p>
                                        <div onClick={()=>setDropdown(!dropdown)} className="hover:cursor-pointer">{dropdown ?<RiArrowUpSLine /> :<RiArrowDownSLine />} </div>
                                         
                                    </div>
                                </span>
                                <nav className={`flex flex-col border-l relative ${dropdown ? "left-0":"-left-full"}  top-0 transition-colors  border-gray-600 ml-2 `}>
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
                    <header className="fixed left-0 top-0 w-full bg-white p-3 flex justify-between border-b ">
                        <div className='lg:invisible text-center w-[30%]'>
                            <h1 className='uppercase font-bold tracking-[4px] textColorCustom'>Tu Logo</h1>
                        </div>
                        <ul className="flex items-center gap-4">
                            <li>
                                <a onClick={()=>navigate("/preview")} className="flex bg-blue-500 text-white py-2 px-1 rounded-2xl items-center gap-2 hover:scale-95 duration-100 hover:cursor-pointer">
                                    Vista previa
                                </a>
                            </li>
                            <li>
                                <a className="flex bg-emerald-500 text-white p-2 rounded-2xl items-center gap-2 hover:scale-95 duration-100 hover:cursor-pointer">
                                    Guardar
                                </a>
                            </li>
                            <li>
                                <a onClick={()=>navigate("/moduleEdit")} className="flex bg-red-500 text-white p-2 rounded-2xl items-center gap-2 hover:scale-95 duration-100 hover:cursor-pointer">
                                    Salir
                                </a>
                            </li>
                        </ul>
                    </header>

                    <div className="mt-[50px]">
                        <SortableContext
                            items={itemIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {itemIds.map(section => <Section key={section} id={section} obj={sections.find(e => e.nombre === section)} delete={handleDelete} edit={handleEdit}/>)}
                        </SortableContext>
                        <button onClick={() => setShowMyModal(true)} className="rounded-full p-2 flex mx-auto mt-3 mb-6 relative py-2 px-6 text-center textColorCustom border boderColorCustom overflow-hidden transition-all ease-in-out before:absolute before:bgColorCustom before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-500 before:w-full before:h-0 before:rotate-45 hover:before:h-[380%] hover:text-white">
                            Agregar sección
                        </button>
                    </div>
                    <ModalCreate onClose={handleOnClose} visible={showMyModal} handleValue={handleValue} type={"seccion"} />
                </main>
            </div>
        </DndContext>
    );
}

export default QuizEdit;