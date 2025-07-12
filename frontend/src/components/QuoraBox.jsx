import { Avatar } from "@mui/material"; // Corrected import for MUI v5 core components
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import "./css/QuoraBox.css";

function QuoraBox() {
  const user = useSelector(selectUser);

  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        {/*
          The Avatar component in MUI v5 (and v4) expects a string for `src`.
          If user?.photo can be null or undefined, the component handles it gracefully
          by displaying the first letter of the name or a default icon.
          Ensure `user?.photo` provides a valid URL or is `null`/`undefined`.
        */}
        <Avatar src={user?.photo} alt={user?.displayName || "User Avatar"} />
        {/* Added alt text for accessibility, using displayName if available */}
      </div>
      <div className="quoraBox__quora">
        <h5>What is your question or link?</h5>
      </div>
    </div>
  );
}

export default QuoraBox;
