import {Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import clients from "@/queries/clients"
const Clients = () => {
    const {data} = useQuery(clients().GET_CLIENTS)
    console.log('@@data',data)
    return (
        <>
            <Typography variant={'h1'}>Helloworld</Typography>
        </>
    )
}

export default Clients