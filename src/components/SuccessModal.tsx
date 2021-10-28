import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const SuccessModal = React.memo(
  ({
    onClose,
    isModalOpen,
    score,
  }: {
    onClose: () => void;
    isModalOpen: boolean;
    score: number;
  }) => {
    return (
      <Dialog
        onClose={onClose}
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title">Gut gemacht</DialogTitle>
        <DialogTitle id="modal-modal-description">
          Du hast alle Artikel richtig ausgefüllt. Dein Score ist: {score}
          <DialogActions>
            <Button autoFocus onClick={onClose}>
              OK
            </Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    );
  }
);
