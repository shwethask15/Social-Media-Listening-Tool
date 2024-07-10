import React, { useState } from "react";
import axiosInstance from "../../Components/redux/axiosInstance";
import "./style/VerbatimItem.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
};

const headerStyle = {
  backgroundColor: "#dab9dc",
  width: "100%",
  padding: "10px 20px",
  color: "black",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  margin: "-20px -20px 0 -20px",
};

const saveButtonStyle = {
  marginTop: "20px",
  color: "black",
  backgroundColor: "#fcf3f3",
  alignSelf: "flex-end",
};

const VerbatimItem = ({
  mention_id,
  date,
  location,
  language,
  virality,
  sentiment,
  severity,
  subCategory,
  content,
  brand,
  link,
  icon,
  updateOptions,
  onUpdate, // Expect onUpdate function
}) => {
  const [isEditing, setIsEditing] = useState({
    virality: false,
    sentiment: false,
    severity: false,
  });

  const [newValues, setNewValues] = useState({
    virality,
    sentiment,
    severity,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const handleModalOpen = (field) => {
    setCurrentField(field);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentField(null);
  };

  const handleChange = (field, value) => {
    setNewValues((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSave = async () => {
    if (!currentField) return;

    const data = {
      virality,
      sentiment,
      severity,
    };
    data[currentField] = newValues[currentField];

    try {
      const response = await axiosInstance.put(
        `http://127.0.0.1:8000/verbatims_list/${mention_id}`,
        data,
        {
          params: {
            mention_id: mention_id,
          },
        }
      );

      if (response.status === 200) {
        if (typeof onUpdate === "function") {
          onUpdate(mention_id, data); // Ensure onUpdate is a function before calling
        }
        handleModalClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error(
        "Error updating verbatim:",
        error.response?.data || error.message
      );
    }
  };

  const handleMailClick = () => {
    const subject = encodeURIComponent("MARS SML data");
    const body = encodeURIComponent(
      `Source: ${link}\n\nDescription: ${content}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="verbatim-item">
      <div className="verbatim-header">
        <span className="verbatim-date">{date}</span>
        <span className="verbatim-location">{location}</span>
        <span className="verbatim-language">{language}</span>
        <button onClick={handleMailClick} className="mail-icon">
          <i className="fa fa-envelope"></i>
        </button>
      </div>
      <div className="verbatim-content">
        {icon && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img src={icon} alt="icon" className="verbatim-icon" />
          </a>
        )}
        <p>{content}</p>
      </div>
      <div className="verbatim-footer">
        <span className="verbatim-brand">Brand: {brand}</span>
        <div className="verbatim-tags">
          {["virality", "sentiment", "severity"].map((field) => (
            <div key={field} className="verbatim-tag-container">
              <span className="verbatim-tag">
                {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                {newValues[field]}
                <button
                  onClick={() => handleModalOpen(field)}
                  className="edit-icon"
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </span>
            </div>
          ))}
          <span className="verbatim-tag">Sub-Category: {subCategory}</span>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <div style={headerStyle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {currentField && currentField.toUpperCase()}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleModalClose}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {currentField && (
              <FormControl
                component="fieldset"
                style={{ width: "100%", marginTop: "20px" }}
              >
                <RadioGroup
                  aria-label={currentField}
                  name={currentField}
                  value={newValues[currentField]}
                  onChange={(e) => handleChange(currentField, e.target.value)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingLeft: "20px",
                  }}
                >
                  {updateOptions[currentField].map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio sx={{ '&.Mui-checked': { color: '#220047' } }} />}
                      label={option}
                      style={{
                        color:
                          newValues[currentField] === option
                            ? "#220047"
                            : "#000",
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            <Button
              onClick={handleSave}
              variant="contained"
              style={saveButtonStyle}
            >
              SAVE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default VerbatimItem;
