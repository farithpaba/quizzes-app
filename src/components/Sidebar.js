import React from 'react'
import {
    RiMenu3Fill,
    RiCloseLine,
    RiDashboardLine,
    RiFileUserLine,
    RiCheckboxLine,
    RiLogoutBoxRLine,
} from "react-icons/ri";
import { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setGlobalUserRedux } from '../redux/newGlobalUserSlice';

export default function Sidebar() {

    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    let navigate = useNavigate();

    const dispatch = useDispatch();

    function Logout() {
        dispatch(setGlobalUserRedux("login"))
        navigate("/")
    }
    return (
        <>
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
                        <a
                            onClick={() => { navigate("/") }}
                            className={`${(location.pathname === "/" || location.pathname === "/moduleEdit") ? "flex items-center   font-semibold gap-4 bgColorCustom p-4 text-white rounded-lg hover:cursor-pointer" : "flex items-center hover:cursor-pointer text-gray-400 font-semibold gap-4 hover:bg-purple-600 p-4 hover:text-white rounded-lg transition-colors"}`}
                        >
                            <RiDashboardLine />Módulos
                        </a>
                        <a
                            onClick={() => { navigate("/students") }}
                            className={`${location.pathname === "/students" ? "flex items-center   font-semibold gap-4 bgColorCustom p-4 text-white rounded-lg " : "flex items-center hover:cursor-pointer text-gray-400 font-semibold gap-4 hover:bgColorCustom p-4 hover:text-white rounded-lg transition-colors"}`}
                        >
                            <RiFileUserLine />Estudiantes
                        </a>
                        <a
                            onClick={() => { navigate("/grades") }}
                            className={`${location.pathname === "/grades" ? "flex items-center   font-semibold gap-4 bgColorCustom p-4 text-white rounded-lg " : "flex items-center hover:cursor-pointer text-gray-400 font-semibold gap-4 hover:bgColorCustom p-4 hover:text-white rounded-lg transition-colors"}`}
                        >
                            <RiCheckboxLine />Notas
                        </a>
                    </nav>
                </div>
                {/* Logout */}
                <div>
                    <a
                        onClick={()=>Logout()}
                        className='flex items-center text-gray-400 font-semibold gap-4 hover:bg-red-600 p-4 hover:text-white rounded-lg transition-colors hover:cursor-pointer'
                    >
                        <RiLogoutBoxRLine />Logout
                    </a>
                </div>
            </div>

            {/* Btn menu movile */}
            <button
                onClick={toggleMenu}
                className="lg:hidden fixed right-4 bottom-4 bgColorCustom  text-white text-xl p-3 rounded-full z-50"
            >
                {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
            </button>
        </>
    )
}
