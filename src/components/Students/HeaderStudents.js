import React, { useState } from 'react'
import { RiArrowDownSLine, RiCheckboxBlankCircleFill, RiNotification3Line } from 'react-icons/ri'

export default function Header() {
  const [options, setOptions] = useState(false);
  const [options2, setOptions2] = useState(false);
  return (
    <header className="fixed left-0 top-0 w-full bg-white p-5 flex justify-between border-b z-10">
      <div className='lg:invisible text-center w-[30%]'>
        <h1 className='uppercase font-bold tracking-[4px] textColorCustom'>Tu Logo</h1>
      </div>
      <ul className="flex items-center gap-4">
        <li >
          <a >
            {/* Notificaciones */}
            <div className="relative inline-block text-left">
              <div >
                <button
                  onClick={() => {setOptions2(!options2); setOptions(false);}}
                  type="button"
                  className="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3  text-sm font-semibold text-gray-900  ring-white "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <RiNotification3Line className="relative text-gray-600 "/>
                  <RiCheckboxBlankCircleFill className="text-orange-600 text-[8px] absolute -top-0 right-3" />
                </button>
              </div>
              {options2 === true &&
                <div className="absolute -right-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <div className="" role="none">
                    <a className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:text-gray-400" role="menuitem" tabindex="-1" id="menu-item-0">Notificación 1</a>
                    <a className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-b-md " role="menuitem" tabindex="-1" id="menu-item-1">Notificación 2</a>
                  </div>
                </div>
              }
            </div>

          </a>
        </li>
        <li>
          <a  className="flex text-gray-600 items-center gap-2">
            Ferra Alexandra
            {/* Opciones */}
            <div className="relative inline-block text-left ">
              <div>
                <button
                  onClick={() => {setOptions(!options); setOptions2(false);}}
                  type="button"
                  className="hover:scale-95 duration-75 cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3  text-sm font-semibold text-gray-900  ring-white "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <RiArrowDownSLine />
                </button>
              </div>
              {options === true &&
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <div className="" role="none">
                    <a className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:text-gray-400" role="menuitem" tabindex="-1" id="menu-item-0">Opción 1</a>
                    <a className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-b-md " role="menuitem" tabindex="-1" id="menu-item-1">Opción 2</a>
                  </div>
                </div>
              }
            </div>
          </a>
        </li>
      </ul>
    </header>
  )
}
