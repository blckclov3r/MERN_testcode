import clients from "@/queries/clients";
import {useMutation} from "@apollo/client";
import {Box, Button, TableCell} from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Client} from "@/generated/graphql";

type ClientRowProps = {
    client: Client
    handleOpen: (id: string) => void
};

const ClientRow: React.FC<ClientRowProps> = (props) => {
    const {DELETE_CLIENT, GET_CLIENTS} = clients()
    const [deleteClients] = useMutation(DELETE_CLIENT, {
        variables: {id: props.client?.id},
        refetchQueries: [{query: GET_CLIENTS}]
    })


    return (
        <>
            <TableCell>{props.client?.id}</TableCell>
            <TableCell>{props.client?.name}</TableCell>
            <TableCell>{props.client?.email}</TableCell>
            <TableCell>{props.client?.phone}</TableCell>
            <TableCell align={"right"}>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Button variant={'contained'} size={'small'} color={'primary'} onClick={() => {
                        props.handleOpen(props.client?.id as string ?? "")
                    }}>
                        <ModeEditOutlinedIcon/>
                    </Button>
                    <Button variant={'contained'} size={'small'} color={'error'} onClick={() => {
                        deleteClients()
                    }}>
                        <DeleteOutlineOutlinedIcon/>
                    </Button>
                </Box>
            </TableCell>
        </>
    )
}

export default ClientRow