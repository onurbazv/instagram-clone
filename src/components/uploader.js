import { useState } from 'react'
import * as SETTINGS from '../constants/settings'
import { uploadFile } from '../services/firebase'
import randomString from '../helpers/random-string'

export default function Uploader({basePath, onSuccess}) {
    const [uploadProgress, setUploadProgress] = useState(0)

    const recalculateProgress = (current, total) => {
        setUploadProgress((current / total) * 100)
    }

    const onChangeHandler = async event => {
        const selectedFile = event.target.files[0]
        if (SETTINGS.ALLOWED_FILETYPES.includes(selectedFile.type) && SETTINGS.MAX_FILESIZE >= selectedFile.size) {
            const ext = `.${selectedFile.name.split('.')[selectedFile.name.split('.').length - 1]}`
            const file = new File([selectedFile], `${randomString(32)}${ext}`, {type: selectedFile.type})
            await uploadFile(file, `${basePath}${file.name}`, recalculateProgress, onSuccess)
        } else {
            console.log("Make sure you're uploading an image with size < 1mb.")
        }
    }



    return (
        <div>
            <label
                className="w-64 flex flex-col items-center px-4 py-6 mx-auto bg-white rounded-md shadow-md tracking-wide uppercase 
                border border-blue cursor-pointer hover:bg-blue-600 hover:text-white text-blue-600 ease-linear transition-all duration-150">
                <i className="fas fa-cloud-upload-alt fa-3x"></i>
                <span className="mt-2 text-base leading-normal">Select a file</span>
                <input type="file" className="hidden" onChange={onChangeHandler} multiple={false}/>
            </label>
            {uploadProgress !== 0 && <div className="mt-4 relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                    <div
                        style={{width: `${uploadProgress}%`}}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600">
                    </div>
                </div>
            </div>}
        </div>
    )
}
