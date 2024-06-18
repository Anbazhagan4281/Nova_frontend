import React, { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { toogleModel } from "../redux/reducers/storeReducer";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#fff',
  backdropFilter: "blur(5px)", 
  borderRadius: '10px',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  p: 4,
};

interface ModelContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ModelContainer: React.FC<ModelContainerProps> = ({ isOpen, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [isOpen]);
  const handleClose = () => {
    dispatch(toogleModel());
  };

  return (
    <Modal disableEnforceFocus open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModelContainer;
