import { DragEventHandler, useState } from 'react';



export function Dropzone() {

    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e: DragEventHandler<HTMLFormElement | undefined) => {
        e.preventDefault()
        e.stopPropagation()
        if ()
    }
    return (
        <form id="form-file-upload" onDragEnter={handleDrag}>
        <input id="file-upload" type="file" multiple={true} />
        <label id="label-file-upload" htmlFor="input-file-upload">
            <div>
                <p>Drag and drop your file here</p>
                <button className="upload-button">Upload file</button>
            </div>
        </label>
        </form>
    )
}