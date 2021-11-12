import { createPortal } from "react-dom"
export default function Modal({open, onClose, title, children}) {
    return open ? createPortal(
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black grid place-items-center">
                <div className="w-auto mx-auto max-w-3xl z-50">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                            <h3 className="text-2xl font-semibold text-blue-600">{title}</h3>
                            <button className="p-1 ml-4 border-0 text-blue-800 float-right text-2xl leading-none outline-none focus:outline-none"
                                    onClick={() => onClose()}>
                                <i class="far fa-times-circle fa-1x"></i>
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