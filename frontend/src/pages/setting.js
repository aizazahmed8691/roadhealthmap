import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/header";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "auto",
  },
}));

function SettingsPage() {
  const classes = useStyles();
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handlePasswordClickOpen = () => {
    setOpenPasswordModal(true);
  };

  const handlePasswordClose = () => {
    setOpenPasswordModal(false);
  };

  const handleProfileClickOpen = () => {
    setOpenProfileModal(true);
  };

  const handleProfileClose = () => {
    setOpenProfileModal(false);
  };
  //for changing password
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const handleChangePass = async () => {
    try {
      await axios.post(
        '/changePassword',
        {
          currentPassword: currentPass,
          newPassword: newPass,
          confirmNewPassword: confirmNewPass,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // handle success
      console.log("success");
      // clear input fields
      setCurrentPass("");
      setNewPass("");
      setConfirmNewPass("");
      // close dialog
      handlePasswordClose();
    } catch (err) {
      // handle error
      console.log(err.response.data.error);
    }
  };

  const handleCurrentPass = (e) => {
    setCurrentPass(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmNewPass = (e) => {
    setConfirmNewPass(e.target.value);
  };

  //for updating profile
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [discrpvalue, setDiscrpValue] = useState("");

  const handleDiscrpChange = (event) => {
    setDiscrpValue(event.target.value);
  };
  const [file, setFile] = useState("");
  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();

    // const response = await axios.get(`http://localhost:5000/getAdminid`);
    // const admin = response.data.admin;

    // if (!admin) {
    //   alert("Admin not found");
    //   return;
    // }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", inputValue);
    formData.append("description", discrpvalue);
    formData.append("adminID", user._id);

    try {
      await axios.put(
        `http://localhost:5000/updateAdminProfile/${user._id}`,
        formData
      );
      alert("Admin profile updated successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to update admin profile");
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "18%",
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={handlePasswordClickOpen}
        >
          Change Password
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleProfileClickOpen}
          style={{ marginLeft: "40px" }}
        >
          Update Profile
        </Button>
      </div>
      <Dialog open={openPasswordModal} onClose={handlePasswordClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="current-password"
            label="Current Password"
            type="password"
            value={currentPass}
            onChange={handleCurrentPass}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="new-password"
            label="New Password"
            type="password"
            value={newPass}
            onChange={handleNewPass}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirm-new-password"
            label="Confirm New Password"
            type="password"
            value={confirmNewPass}
            onChange={handleConfirmNewPass}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePass} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openProfileModal} onClose={handleProfileClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            id="image"
            label="profile pic"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter you Full name"
            type="text"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            color="inherit"
          />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={discrpvalue}
            onChange={handleDiscrpChange}
            color="inherit"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SettingsPage;
