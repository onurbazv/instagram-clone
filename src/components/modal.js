import { useEffect } from 'react'
import { createPortal } from "react-dom"
export default function Modal({open, onClose, title, children}) {

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [open])

    return open ? createPortal(
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black grid place-items-center overflow-auto">
                <div className="w-auto mx-auto max-w-screen-lg z-50">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-hidden">
                        {title !== "" && <div className="flex items-center justify-between p-4 border-b border-solid border-gray-200 rounded-t">
                            <h3 className="text-2xl font-semibold text-blue-600">{title}</h3>
                            <button className="p-1 ml-4 border-0 text-blue-800 float-right text-2xl leading-none outline-none focus:outline-none"
                                    onClick={() => onClose()}>
                                <i class="far fa-times-circle fa-1x"></i>
                            </button>
                        </div>}
                        <div className={`relative flex-auto ${title !== "" && "p-4"}`}>
                            {title === "" && (
                                <button className="absolute text-2xl right-4 top-4"
                                        onClick={() => onClose()}>
                                    <i class="far fa-times-circle fa-1x"></i>
                                </button>)}
                            {children}
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById("portal")
    ) : null
}