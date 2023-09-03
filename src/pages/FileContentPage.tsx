import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../apiKey";
import { Link, useParams } from "react-router-dom";
// import pdf from "pdf-parse";

import classes from "./FileContent.module.css";

const FileContentPage: React.FC = () => {
  const [pdfData, setPdfData] = useState("");
  const [fileName, setFileName] = useState("");
  const { id } = useParams();
  console.log("this is the id", id);

  const fetchPdfData = async () => {
    try {
      const response = await axios.get(`${API_URL}/download/${id}`);

      console.log("text content:", response.data.fileName);

      setPdfData(response.data.text);
      setFileName(response.data.fileName);

      const pdfData = response.data.fetchedFile.file.data;

      console.log("This so the pdf data", pdfData);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPdfData();
  }, []);

  return (
    <>
      <Link to={"/upload"}>← Go back</Link>
      <h1>File Content:</h1>
      {fileName ? <h2>{fileName}</h2> : ""}
      {pdfData ? <p className={classes.textContent}>{pdfData}</p> : ""}
    </>
  );
};

export default FileContentPage;
