import { useMemo, useState } from "react";
import { RiAddLine, RiArrowDownSLine, RiArrowUpSLine, RiCheckboxBlankCircleFill, RiCloseLine, RiCodeSSlashLine, RiFileMusicLine, RiImage2Line, RiMenu3Fill, RiQuestionLine, RiQuestionMark, RiText } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalTypeQuestion from "../components/ModalTypeQuestion";
import ModalMultipleChoice from "../components/ModalMultipleChoice";
import QuestionMultipleChoice from "../components/QuestionMultipleChoice";
import QuestionListening from "../components/QuestionListening";
import ModalAddMedia from "../components/ModalAddMedia";
import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Text from "../components/Text";
import Image from "../components/Image";
import Audio from "../components/Audio";
import { useDispatch, useSelector } from "react-redux";
import { setElementsRedux, selectElements } from '../redux/newElementsSlice';
import ModalListening from "../components/ModalListening";
import ModalComplete from "../components/ModalComplete";
import QuestionComplete from "../components/QuestionComplete";
import ModalDragandDRop from "../components/ModalDrag&Drop";
import QuestionDragandDrop from "../components/QuestionDrag&Drop";
import ModalSpeaking from "../components/ModalSpeaking";
import QuestionSpeaking from "../components/QuestionSpeaking";

function SectionEdit() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    /* const elementsRedux = useSelector(selectElements); */

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => { setShowMenu(!showMenu); };

    const [showMyModal, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    const [dropdown, setDropdown] = useState(true);

    const [typeE, setTypeE] = useState(null);

    /* const CloseModalMultipleChoice = () => setTypeE(null);
    const CloseModalListening = () => setTypeE(null);
    const CloseModalComplete = () => setTypeE(null);
    const CloseModalDragandDrop = () => setTypeE(null);
    const CloseModalSpeaking = () => setTypeE(null);
    const CloseModalAddMedia = () => setTypeE(null); */
    const CloseModal = () => setTypeE(null);

    const [options1, setOptions1] = useState(false);
    const [options2, setOptions2] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlayer(e) {
        if (e !== null) {
            /* console.log(e); */
            setIsPlaying(e);
        }
    }

    const [elements, setElements] = useState(useSelector(selectElements))

    const itemIds = useMemo(() => elements.map((item) => item.id), [elements]);

    function handleValue(e) {
        if (e !== null) {
            setTypeE(e);
        }
    }

    function handleObj(e) {
        if (e !== null) {
            console.log(e);
            setElements([...elements, e]);
        }
    }

    function handleDelete(e) {
        if (e !== null) {
            var newArray = elements.filter((elemento) => elemento.id !== e);
            setElements(newArray);
        }
    }

    function handleEdit(e) {
        if (e !== null) {
            var newArray = elements.map((elemento) => {
                if (elemento.id === e.id) {
                    return e
                }else{
                    return elemento
                }
            });
            setElements(newArray);
        }
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setElements((items) => {
                const activeIndex = itemIds.indexOf(active.id)
                const overIndex = itemIds.indexOf(over.id)

                return arrayMove(items, activeIndex, overIndex);
            })
        }
    }

    function preview() {
        navigate("/preview")
        dispatch(setElementsRedux(elements))
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
                            <h1 className="textColorCustom  uppercase font-bold text-2xl tracking-[4px]">
                                Tu Logo
                            </h1>
                        </div>
                        {/* Nav */}
                        <nav>

                            <div
                                href="#"
                                className="flex flex-col gap-4 text-gray-200 py-2 hover:text-gray-200 transition-colors"
                            >
                                <span   className="flex items-center gap-4 ">
                                    <RiCodeSSlashLine className="text-gray-400" />
                                    <div className="flex-1 flex items-center justify-between font-semibold text-gray-400 hover:cursor-pointer">
                                        <p onClick={()=>navigate("/quizEdit")} className="hover:cursor-pointer">Secciones</p>
                                        <div onClick={()=>setDropdown(!dropdown)} className="hover:cursor-pointer">{dropdown ?<RiArrowUpSLine /> :<RiArrowDownSLine />}</div>
                                    </div>
                                </span>
                                <nav className={`flex flex-col border-l relative ${dropdown ? "left-0":"-left-full"}  top-0 transition-colors  border-gray-600 ml-2 `}>
                                    <a href="#" className="relative pl-8 py-2 text-gray-400 focus:text-gray-300">
                                        <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                                        Listening
                                    </a>
                                    <a href="#" className="relative pl-8 py-2 text-gray-400 focus:text-gray-300">
                                        <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                                        Speaking
                                    </a>
                                    <a href="#" className="relative pl-8 py-2 text-gray-400 focus:text-gray-300">
                                        <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                                        Writing
                                    </a>
                                    <a href="#" className="relative pl-8 py-2 text-gray-400 focus:text-gray-300">
                                        <RiCheckboxBlankCircleFill className="absolute -left-[7px] textColorCustom text-sm top-[50%] -translate-y-[50%] p-[4px] bg-[#1E1F24] rounded-full" />
                                        Grammar
                                    </a>
                                </nav>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Btn menu movil */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden fixed right-4 bottom-4 bgColorCustom  text-white text-xl p-3 rounded-full z-50"
                >
                    {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
                </button>

                {/* Btn Add Element */}
                <div>
                    <button
                        onClick={() => {setShowMyModal(true); setOptions2(false);}}
                        className={`fixed left-4 lg:left-80 ${options2 ? "bottom-16":"bottom-4"}  bgColorCustom  text-white text-xl p-3 rounded-full hover:scale-95 duration-150`}
                    >
                        <RiQuestionMark />
                    </button>
                    <button
                        onClick={() => {setTypeE("addImg"); setOptions2(false);}}
                        className={`fixed left-4 lg:left-80  ${options2 ? "bottom-28":"bottom-4"} bgColorCustom  text-white text-xl p-3 rounded-full hover:scale-95 duration-150`}
                    >
                        <RiImage2Line />
                    </button>
                    <button
                        onClick={() => {setTypeE("addText"); setOptions2(false);}}
                        className={`fixed left-4 lg:left-80  ${options2 ? "bottom-40":"bottom-4"} bgColorCustom  text-white text-xl p-3 rounded-full hover:scale-95 duration-150`}
                    >
                        <RiText />
                    </button>
                    <button
                        onClick={() => {setTypeE("addAudio"); setOptions2(false);}}
                        className={`fixed left-4 lg:left-80  ${options2 ? "bottom-52":"bottom-4"} bgColorCustom  text-white text-xl p-3 rounded-full hover:scale-95 duration-150`}
                    >
                        <RiFileMusicLine />
                    </button>
                    <button
                        onClick={()=>{setOptions2(!options2); setOptions1(false);}}
                        className="fixed left-4 lg:left-80 bottom-4 bgColorCustom  text-white text-xl p-3 rounded-full hover:scale-95 duration-150"
                    >
                        <RiAddLine />
                    </button>
                </div>


                {/* Content */}
                <main className="lg:pl-80 p-8">
                    {/* Header */}
                    <header className="fixed left-0 top-0 w-full bg-white p-3 flex justify-between border-b z-40">
                        <div className='lg:invisible text-center w-[30%]'>
                            <h1 className='uppercase font-bold tracking-[4px] textColorCustom'>Tu Logo</h1>
                        </div>
                        <ul className="flex items-center gap-4">
                            <li>
                                <a onClick={()=>preview()}  className="flex bg-blue-500 text-white py-2 px-1 rounded-2xl items-center gap-2 hover:scale-95 duration-100 hover:cursor-pointer">
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

                        {/* Btn Add Element 2 */}
                        <div className="flex  relative justify-center">
                            <div>
                                <button onClick={() => {setOptions1(!options1); setOptions2(false);}}  className="rounded-full p-2 flex mx-auto mt-1 mb-3 relative py-2 px-6 text-center textColorCustom border boderColorCustom overflow-hidden transition-all ease-in-out before:absolute before:bgColorCustom before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-500 before:w-full before:h-0 before:rotate-45 hover:before:h-[380%] hover:text-white">
                                    Agregar elemento
                                </button>
                            </div>

                            {options1 === true &&
                                <div className="absolute top-14 right-90 z-10  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                    <div className="" role="none">
                                        <a onClick={() => {setShowMyModal(true); setOptions1(false);}} className="text-gray-500 text-center hover:bgColorCustom hover:text-white border-b flex items-center justify-between gap-2 px-4 py-2 text-sm hover:cursor-pointer hover:rounded-t-md" >Pregunta<RiQuestionLine /></a>
                                        <a onClick={() => {setTypeE("addImg"); setOptions1(false);}} className="text-gray-500 text-center hover:bgColorCustom hover:text-white border-b flex items-center justify-between px-4 py-2 text-sm hover:cursor-pointer " >Imagen<RiImage2Line /></a>
                                        <a onClick={() => {setTypeE("addAudio"); setOptions1(false);}} className="text-gray-500 text-center hover:bgColorCustom hover:text-white border-b flex items-center justify-between px-4 py-2 text-sm hover:cursor-pointer " >Audio<RiFileMusicLine /></a>
                                        <a onClick={() => {setTypeE("addText"); setOptions1(false);}} className="text-gray-500 text-center hover:bgColorCustom hover:text-white border-b flex items-center justify-between px-4 py-2 text-sm hover:cursor-pointer hover:rounded-b-md" >Texto<RiText /></a>
                                    </div>
                                </div>
                            }
                        </div>

                        <SortableContext
                            items={itemIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {itemIds.map(elementId => {
                                if(elements.find(e => e.id === elementId).type === "multipleChoice")
                                    return <QuestionMultipleChoice key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit}/>
                                if(elements.find(e => e.id === elementId).type === "listening")
                                    return <QuestionListening key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit} handlePlayer={handlePlayer} isPlaying={isPlaying}/> 
                                if(elements.find(e => e.id === elementId).type === "complete")
                                    return <QuestionComplete key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit}/>
                                if(elements.find(e => e.id === elementId).type === "drag&drop")
                                    return <QuestionDragandDrop key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit}/>
                                if(elements.find(e => e.id === elementId).type === "speaking")
                                    return <QuestionSpeaking key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit} handlePlayer={handlePlayer} isPlaying={isPlaying}/>   
                                if(elements.find(e => e.id === elementId).type === "texto")
                                    return <Text key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit}/> 
                                if(elements.find(e => e.id === elementId).type === "imagen")
                                    return <Image key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit}/>
                                if(elements.find(e => e.id === elementId).type === "audio")
                                    return <Audio key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} delete={handleDelete} edit={handleEdit}/>   
                            })}
                        </SortableContext>

                    </div>

                    <ModalTypeQuestion onClose={handleOnClose} visible={showMyModal} handleValue={handleValue} />
                    {typeE === "multipleChoice" && <ModalMultipleChoice onClose={CloseModal} handleValue={handleObj} />}
                    {typeE === "listening" && <ModalListening onClose={CloseModal} handleValue={handleObj} />}
                    {typeE === "complete" && <ModalComplete onClose={CloseModal} handleValue={handleObj} />}
                    {typeE === "drag&drop" && <ModalDragandDRop onClose={CloseModal} handleValue={handleObj} />}
                    {typeE === "speaking" && <ModalSpeaking onClose={CloseModal} handleValue={handleObj} />}
                    {typeE === "addText" && <ModalAddMedia onClose={CloseModal}  handleValue={handleObj} type={"texto"} />}
                    {typeE === "addImg" && <ModalAddMedia onClose={CloseModal}  handleValue={handleObj} type={"imagen"} />}
                    {typeE === "addAudio" && <ModalAddMedia onClose={CloseModal}  handleValue={handleObj} type={"audio"} />}
                </main>
            </div>
        </DndContext>
    );
}

export default SectionEdit;