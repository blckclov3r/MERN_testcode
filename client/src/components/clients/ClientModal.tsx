import { Box, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@apollo/client";
import clients from "@/queries/clients";

interface Client {
  name: string;
  email: string;
  phone: string;
}

interface AddClientProps {
  handleClose: () => void;
  open: boolean;
  id?: string;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string | null;
  email: string | null;
  phone: string | null;
  dataClient: { client: Client } | undefined;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  border: "none",
};

const ClientModal: React.FC<AddClientProps> = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div onKeyDown={props.handleKeyDown}>
          <Box sx={style}>
            <Typography
              sx={{ mb: 1 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {props.id}
            </Typography>
            <form onSubmit={props.handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                value={props.name ? props.name : undefined}
                onChange={props.handleNameChange}
                fullWidth
                defaultValue={props.dataClient?.client.name ?? undefined}
                margin="normal"
                size="small"
                InputLabelProps={{
                  shrink: (!!props.name ||
                    props.dataClient?.client.name) as boolean,
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={props.email ? props.email : undefined}
                onChange={props.handleEmailChange}
                fullWidth
                margin="normal"
                size="small"
                defaultValue={props.dataClient?.client.email ?? undefined}
                InputLabelProps={{
                  shrink: (!!props.email ||
                    props.dataClient?.client.email) as boolean,
                }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                value={props.phone ? props.phone : undefined}
                onChange={props.handlePhoneChange}
                fullWidth
                margin="normal"
                size="small"
                defaultValue={props.dataClient?.client.phone ?? undefined}
                InputLabelProps={{
                  shrink: (!!props.phone ||
                    props.dataClient?.client.phone) as boolean,
                }}
              />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  onClick={props.handleClose}
                  variant="contained"
                  color={"error"}
                  size={"small"}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </Modal>
    </>
  );
};
export default ClientModal;
