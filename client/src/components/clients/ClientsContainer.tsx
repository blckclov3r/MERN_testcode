import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import clients from "@/queries/clients";
import Table from "@mui/material/Table";
import ClientRow from "@/components/clients/ClientRow";
import { Client } from "@/generated/graphql";
import Button from "@mui/material/Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ClientModal from "@/components/clients/ClientModal";

const ClientsContainer = () => {
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const {
    ADD_CLIENT,
    GET_CLIENTS,
    GET_CLIENTID,
    UPDATE_CLIENT,
    DELETE_CLIENT,
  } = clients();
  const { data: dataClients } = useQuery(GET_CLIENTS);
  const { data: dataClient } = useQuery(GET_CLIENTID, {
    variables: {
      id,
    },
    skip: id === "" || id === null,
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery<any>({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients?.concat([addClient]) ?? [] },
      });
    },
    // refetchQueries: [{query: GET_CLIENTS}]
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      id,
      ...(name !== null ? { name } : {}),
      ...(email !== null ? { email } : {}),
      ...(phone !== null ? { phone } : {}),
    },
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (id === "" || id === null) {
        if (!name || !phone || !email) {
          alert("Please fill in all fields");
        }
        await addClient();
      } else {
        await updateClient();
      }
      setId(null);
      setName(null);
      setEmail(null);
      setPhone(null);
      handleClose();
    } catch (err) {
      console.log("@@err", err);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
    }
  };

  const handleOpen = (id?: string) => {
    if (id) {
      setId(id);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant={"h3"}>Clients</Typography>
      </Box>
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={() => {
          handleOpen();
        }}
        sx={{ mb: 2 }}
      >
        Add Client
      </Button>
      {
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataClients?.clients?.map((client: Client) => (
                <TableRow
                  key={client.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <ClientRow handleOpen={handleOpen} client={client} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <ClientModal
        id={id ? id : "Add Client"}
        handleClose={handleClose}
        open={open}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handlePhoneChange={handlePhoneChange}
        name={name}
        email={email}
        phone={phone}
        dataClient={dataClient}
      />
    </>
  );
};

export default ClientsContainer;
