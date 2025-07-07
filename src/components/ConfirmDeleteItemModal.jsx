import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function ConfirmDeleteItemModal({ open, handleClose, handleConfirm }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to remove this item from your cart?</p>
      </DialogContent>
      <DialogActions>
        <Button 
        onClick={handleConfirm} 
        color="error" 
        variant="outlined"
        >
        Remove
        </Button>
        <Button 
        onClick={handleClose} 
        color="primary" 
        autoFocus 
        variant="contained" 
        sx={{ fontWeight: 'bold', fontSize: '1rem' }}
        >
        Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteItemModal;