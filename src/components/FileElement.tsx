import React from "react";
import "font-awesome/css/font-awesome.min.css";
import classes from "./FileElement.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons"; //

interface FileElementProps {
  _id: string;
  name: string;
}

const FileElement: React.FC<FileElementProps> = (props) => {
  return (
    <div className={classes.fileElement}>
      <FontAwesomeIcon icon={faFilePdf} style={{ height: "30px" }} />
      <div>
        <span key={props._id}>{props.name}</span>
      </div>
      <button>✕</button>
    </div>
  );
};

export default FileElement;
