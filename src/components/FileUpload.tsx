import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import API_URL from "../../apiKey";

import classes from "./FileUpload.module.css";

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFiles || !selectedFiles.length) {
      console.error("No files selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", fileName); // Add the file name to the form data

      // Append each selected file to the form data
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("testFile", selectedFiles[i]);
      }

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for form data
        },
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Upload your file here!</h1>
      <form onSubmit={handleSubmit} className={classes.uploadForm}>
        <div className={classes.topSection}>
          <div>
            <label htmlFor="name">File Name: </label>
            <input
              type="text"
              name="file-name"
              id="name"
              value={fileName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="files">Select File: </label>

            <label className="custom-file-upload">
              Upload Files
              <input
                type="file"
                name="file"
                id="files"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className={classes.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FileUpload;
