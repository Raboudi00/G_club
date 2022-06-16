import React, {useState} from 'react'
import axios from "axios"


function Upload() {
      const [file, setFile] = useState("");
      const [fileName, setFileName] = useState("");
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
          const res = await axios.post(
            "/upload",
            formData
          );
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      };

  return (
    <span className="upload-form">
        <img
          src={require("../../../img/imageUpload.png")}
          alt="broken"
          className="uploadImage"
        />
        <div className="upload-btn">
          <input type="file" onChange={saveFile} />
          <button type="submit" onClick={uploadFile}>Upload</button>
        </div>
      </span>
  )
}

export default Upload