import React, { useEffect, useState } from "react";

import classes from "./Files.module.css";
import axios from "axios";
import API_URL from "../../apiKey";
import FileElement from "./FileElement";

interface File {
  _id: string;
  name: string;
}

const Files: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    const response = await axios.get(`${API_URL}/upload`);
    console.log("res.data: ", response);
    setFiles(response.data.foundFiles);
  };

  const removeElement = async (_id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/upload`, {
        data: { _id },
      });
      fetchFiles();
      console.log("response: ", response);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <h2>Files</h2>
      <div className={classes.filesContainer}>
        {files.length > 0 ? (
          files.map((file) => (
            <FileElement
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
