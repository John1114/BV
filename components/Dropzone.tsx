import { DragEventHandler, useState } from 'react';



export function Dropzone() {

    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
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