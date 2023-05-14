import {Box, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import clients from "@/queries/clients"
import Table from '@mui/material/Table';
import ClientRow from "@/components/ClientRow";
import {Client} from "@/generated/graphql";

const Clients = () => {
    const {GET_CLIENTS, DELETE_CLIENT} = clients()
    const {data, loading, error} = useQuery(GET_CLIENTS)

    console.log('@@data', data)


    return (
        <>
            <Box sx={{my: 3}}>
                <Typography variant={'h3'}>Clients</Typography>
            </Box>
            {
                loading ? (
                    <Box sx={{my: 3}}>
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
                                            <ClientRow  client={client}/>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }

        </>
    )
}

export default Clients