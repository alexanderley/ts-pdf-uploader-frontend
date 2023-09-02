import React, { useState, useEffect, FormEvent } from "react";

// import axios from "axios";
import Files from "../components/Files";
import FileUpload from "../components/FileUpload";
import API_URL from "../../apiKey";
import axios from "axios";

// Define the type for file data
interface FileData {
  _id: string;
  name: string;
  file: {
    data: Buffer;
    contentType: string;
  };
  __v: number;
}

const FilesPage: React.FC = () => {
  // Shared state to hold file data
  const [fileData, setFileData] = useState<FileData[]>([]);

  // Function to update fileData after successful upload
  // const updateFileData = async (
  //   e: FormEvent,
  //   selectedFiles: FileList,
  //   fileName: string
  // ) => {
  //   e.preventDefault();

  //   if (!selectedFiles || !selectedFiles.length) {
  //     console.error("No files selected");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", fileName); // Add the file name to the form data

  //     // Append each selected file to the form data
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       formData.append("testFile", selectedFiles[i]);
  //     }

  //     const response = await axios.post(`${API_URL}/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data", // Set the content type for form data
  //       },
  //     });

  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    setFileData([]);
  }, []);

  return (
    <>
      <FileUpload />
      <Files />
    </>
  );
};

export default FilesPage;
