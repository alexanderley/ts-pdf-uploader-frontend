import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../apiKey";
import { useParams } from "react-router-dom";
import pdf from "pdf-parse";

const FileContentPage: React.FC = () => {
  const [pdfData, setPdfData] = useState("");
  const { id } = useParams();
  console.log("this is the id", id);

  const fetchPdfData = async () => {
    try {
      const response = await axios.get(`${API_URL}/download/${id}`);
      //   console.log("pdfData", response.data.fetchedFile.file.data);
      const pdfData = response.data.fetchedFile.file.data;

      console.log("This so the pdf data", pdfData);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPdfData();
  }, []);

  return <div>FileContentPage</div>;
};

export default FileContentPage;
