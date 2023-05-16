import clients from "@/queries/clients";
import {useMutation, useQuery} from "@apollo/client";
import {Client} from "@/generated/graphql";
import {Box, Button, TableCell, TableRow} from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddClientModal from "@/components/AddClientModal";
import {useState} from "react";

type ClientRowProps = {
    // data: { clients: Client[] };
    client: Client
};

const ClientRow: React.FC<ClientRowProps> = ({client}) => {
    const {DELETE_CLIENT, GET_CLIENTS} = clients()
    const [deleteClients] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{query: GET_CLIENTS}]
    })


    return (
        <>
            <TableCell>{client.id}</TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Button variant={'contained'} size={'small'} color={'primary'}>
                        <ModeEditOutlinedIcon/>
                    </Button>
                    <Button variant={'contained'} size={'small'} color={'error'} onClick={()=>{deleteClients}}>
                        <DeleteOutlineOutlinedIcon/>
                    </Button>
                </Box>
            </TableCell>
        </>
    )
}

export default ClientRow