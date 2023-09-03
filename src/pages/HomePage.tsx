import React from "react";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <h1>
        Welcome to the{" "}
        <span>
          <FontAwesomeIcon icon={faFilePdf} />
        </span>{" "}
        uploader!
      </h1>
      <p>Login to upload your pdf's to the server :)</p>
      <h2>
        <Link to={"/login"}>Login</Link>
      </h2>
    </>
  );
};

export default HomePage;
