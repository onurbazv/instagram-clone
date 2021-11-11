import { useState } from "react"
import Modal from "../components/modal"
import Header from '../components/header'

// function Modal({children}) {
//     return ReactDOM.createPortal(
//         <div className="w-screen h-screen">
//             {children}
//         </div>,
//         document.getElementById("portal")
//     )
// }

export default function Teste() {

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-green-500 p-4">
                <h1 className="text-2xl w-max mx-auto">Hello World</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-400 text-white h-12 w-24 rounded mx-auto block my-2" 
                    onClick={() => setOpenModal(true)}
                    >
                    Open Modal
                </button>
                <Modal open={openModal} onClose={() => setOpenModal(false)} title="Upload Avatar">
                    <p>Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.</p>
                </Modal>
            </div>
            <div className="bg-red-500 p-4">
                <Header />
            </div>
        </div>
    )
}