import React from "react";

import classes from "./Files.module.css";
import axios from "axios";
import API_URL from "../../apiKey";
import FileElement from "./FileElement";

interface File {
  _id: string;
  name: string;
}

interface FilesProps {
  files: File[]; // Define a prop for files
  fetchFiles: () => void; // Define a prop for fetchFiles function
}

const Files: React.FC<FilesProps> = (props) => {
  const removeElement = async (_id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/upload`, {
        data: { _id },
      });
      props.fetchFiles();
      console.log("response: ", response);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <h2>Files</h2>
      <div className={classes.filesContainer}>
        {props.files.length > 0 ? (
          props.files.map((file) => (
            <FileElement
              key={file._id} // Add a unique key for each FileElement
              _id={file._id}
              name={file.name}
              removeElement={removeElement}
            />
          ))
        ) : (
          <p>No files available</p>
        )}
      </div>
    </>
  );
};

export default Files;
