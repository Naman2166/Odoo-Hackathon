import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlined from "@mui/icons-material/AssignmentTurnedInOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { Avatar, Button, Input, IconButton, Tooltip } from "@mui/material";

import "./css/QuoraHeader.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import api from '../api';
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";

function QuoraHeader({ darkMode, toggleDarkMode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user,
      };
      try {
        const res = await api.post("/api/questions", body, config);
        console.log(res.data);
        console.log("Question added successfully:", res.data.message);
        window.location.href = "/";
      } catch (e) {
        console.error("Error in adding question:", e);
        console.log("Error in adding question");
      }
    }
  };

  const handleLogoutConfirm = () => {
    setIsLogoutConfirmOpen(true);
  };

  const performLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        console.log("Logged out successfully");
        setIsLogoutConfirmOpen(false);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        console.log("Error in logout");
        setIsLogoutConfirmOpen(false);
      });
  };

  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/18/Wikipedia20_animated_Plane.gif"
            alt="Quora Logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
        </div>
        <div className="qHeader__input">
          <SearchIcon />
          <input type="text" placeholder="Search questions" />
        </div>
        <div className="qHeader__Rem">
          <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            <IconButton onClick={toggleDarkMode} color="inherit" size="large">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <span onClick={handleLogoutConfirm}>
            <Avatar src={user?.photo} alt={user?.displayName || "User Avatar"} />
          </span>

          <Button onClick={() => setIsModalOpen(true)} variant="contained">
            Add Question
          </Button>

          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            closeIcon={<CloseIcon />}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar className="avatar" src={user?.photo} alt={user?.displayName || "User Avatar"} />
              <div className="modal__scope">
                <PeopleAltOutlined />
                <p>Public</p>
                <ExpandMoreIcon />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
                fullWidth
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: include a link that gives context"
                />
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="Context Image"
                  />
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <Button
                className="cancle"
                onClick={() => setIsModalOpen(false)}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                type="submit"
                className="add"
                variant="contained"
              >
                Add Question
              </Button>
            </div>
          </Modal>

          <Modal
            open={isLogoutConfirmOpen}
            onClose={() => setIsLogoutConfirmOpen(false)}
            center
            closeOnEsc
            closeOnOverlayClick={true}
            closeIcon={<CloseIcon />}
            styles={{
              modal: {
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                textAlign: "center",
              },
              closeButton: {
                top: "10px",
                right: "10px",
              },
            }}
          >
            <h4 style={{ marginBottom: "20px" }}>Are you sure you want to logout?</h4>
            <div style={{ display: "flex", justifyContent: "space-around", gap: "10px" }}>
              <Button variant="outlined" onClick={() => setIsLogoutConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={performLogout}>
                Logout
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default QuoraHeader;
