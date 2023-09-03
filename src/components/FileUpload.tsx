import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import API_URL from "../../apiKey";

import classes from "./FileUpload.module.css";

interface FileUploadProps {
  fetchFiles: () => void;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

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
      formData.append("name", fileName);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("testFile", selectedFiles[i]);
      }

      await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      props.fetchFiles();

      setUploadMessage("File uploaded successfully");
      setTimeout(() => {
        setUploadMessage(null);
      }, 1000); // Hide the message after 3 seconds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Upload Your File Here!</h1>
      <form
        onSubmit={handleSubmit}
        className={classes.uploadForm}
        encType="multipart/form-data"
      >
        <div className={classes.topSection}>
          <div>
            <label htmlFor="name">File Name: </label>
            <input
              type="text"
              name="testFile"
              id="testFile"
              value={fileName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="files">Select File: </label>
            <label className="custom-file-upload">
              <input
                type="file"
                name="testFile"
                id="testFile"
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

      {uploadMessage && <p style={{ color: "#50C878" }}>{uploadMessage}</p>}
    </>
  );
};

export default FileUpload;
