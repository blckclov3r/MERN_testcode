import {Box, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import clients from "@/queries/clients"
import Table from '@mui/material/Table';
import ClientRow from "@/components/ClientRow";
import {Client} from "@/generated/graphql";
import Button from "@mui/material/Button";
import {useState} from "react";
import ClientModal from "@/components/ClientModal";

const Clients = () => {
    const {GET_CLIENTS, DELETE_CLIENT} = clients()
    const {data, loading, error} = useQuery(GET_CLIENTS)

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("")
    const handleOpen = (id?: string) => {
        if (id) {
            setTitle(id)
        }
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
        setTitle("")
    }

    return (
        <>
            <Box sx={{my: 3}}>
                <Typography variant={'h3'}>Clients</Typography>
            </Box>
            <Button variant={'contained'} color={'primary'} onClick={() => {
                handleOpen()
            }} sx={{mb: 2}}>Add Client</Button>
            {
                loading ? (
                    <Box>
                        <Typography variant={'body1'}>Loading...</Typography>
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                {
                                    data?.clients?.map((client: Client) => (
                                        <TableRow
                                            key={client.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <ClientRow handleOpen={handleOpen}
                                                       client={client}/>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            <ClientModal title={title ? title : 'Add Client'} handleClose={handleClose} open={open}/>
        </>
    )
}

export default Clients