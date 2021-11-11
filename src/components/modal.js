import { createPortal } from "react-dom"
export default function Modal({open, onClose, title, children}) {
    return open ? createPortal(
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black grid place-items-center">
                <div className="w-auto mx-auto max-w-3xl z-50">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-blue-900">{title}</h3>
                            <button className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => onClose()}>
                                <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                                X
                                </span>
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById("portal")
    ) : null
}