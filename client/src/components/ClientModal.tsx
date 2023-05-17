import {Box, Modal, TextField, Typography} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from "react";
import Button from "@mui/material/Button";
import {useMutation, useQuery} from "@apollo/client";
import clients from "@/queries/clients";

interface AddClientProps {
    handleClose: () => void
    open: boolean
    title?: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    border: 'none'
};

const ClientModal: React.FC<AddClientProps> = (props) => {

    const handleBackdropClick = (event: FormEvent) => {
        event.stopPropagation();
    };

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();

    const {ADD_CLIENT, GET_CLIENTS, GET_CLIENTID} = clients();

    const {data} = useQuery(GET_CLIENTID, {
        variables: {
            id: props.title
        },
        skip: props.title === ""
    })

    console.log('@@data', data)
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name,
            email,
            phone
        },
        refetchQueries: [{query: GET_CLIENTS}]
    })

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
            await addClient()
            props.handleClose();
        } catch (err) {
            console.log('@@err', err)
        }
    };

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{onClick: handleBackdropClick}}
            >
                <Box sx={style}>
                    <Typography sx={{mb: 1}} id="modal-modal-title" variant="h6" component="h2">
                        {props.title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                            fullWidth
                            defaultValue={data?.client.name ?? ""}
                            margin="normal"
                            size="small"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            defaultValue={data?.client.email ?? ""}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={handlePhoneChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            defaultValue={data?.client.phone ?? ""}
                            InputLabelProps={{shrink: true}}
                        />

                        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                            <Button onClick={props.handleClose} variant="contained" color={'error'}
                                    size={'small'}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary" size="small">
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
export default ClientModal;