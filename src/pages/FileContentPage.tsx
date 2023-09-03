import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../apiKey";
import { Link, useParams } from "react-router-dom";

import classes from "./FileContent.module.css";

const FileContentPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState("");
  const [fileName, setFileName] = useState("");
  const { id } = useParams();

  const fetchPdfData = async () => {
    try {
      const response = await axios.get(`${API_URL}/download/${id}`);

      setPdfData(response.data.text);
      setFileName(response.data.fileName);

      setLoading(false);
    } catch (err: unknown) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfData();
  }, []);

  return (
    <>
      <Link to={"/upload"}>← Go back</Link>
      <h1>File Content:</h1>
      {loading ? (
        <div className={classes.spinner}>Loading...</div>
      ) : (
        <>
          {fileName ? <h2>{fileName}</h2> : ""}
          {pdfData ? <p className={classes.textContent}>{pdfData}</p> : ""}
        </>
      )}
    </>
  );
};

export default FileContentPage;
