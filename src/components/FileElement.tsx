import React from "react";
import "font-awesome/css/font-awesome.min.css";
import classes from "./FileElement.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

interface FileElementProps {
  _id: string;
  name: string;
  removeElement: (id: string) => Promise<void>;
}

const FileElement: React.FC<FileElementProps> = (props) => {
  return (
    <div className={classes.fileElement}>
      <FontAwesomeIcon icon={faFilePdf} style={{ height: "30px" }} />
      <div>
        <span key={props._id}>
          <Link to={`/file/${props._id}`}>{props.name}</Link>
        </span>
      </div>
      <button
        onClick={() => {
          props.removeElement(props._id);
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default FileElement;
