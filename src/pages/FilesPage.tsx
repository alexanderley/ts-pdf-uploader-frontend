import React, { useState, useEffect } from "react";

// import axios from "axios";
import Files from "../components/Files";
import FileUpload from "../components/FileUpload";
import API_URL from "../../apiKey";
import axios from "axios";

interface File {
  _id: string;
  name: string;
}

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    const response = await axios.get(`${API_URL}/upload`);
    setFiles(response.data.foundFiles);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <FileUpload fetchFiles={fetchFiles} />
      <Files files={files} fetchFiles={fetchFiles} />
    </>
  );
};

export default FilesPage;
