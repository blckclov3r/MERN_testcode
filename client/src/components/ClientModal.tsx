import {Box, Modal, TextField, Typography} from '@mui/material';
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
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

    const [name, setName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [phone, setPhone] = useState<string | null>('');

    const {ADD_CLIENT, GET_CLIENTS, GET_CLIENTID, UPDATE_CLIENT} = clients();
    const id = props?.title ?? null

    const {data, loading} = useQuery(GET_CLIENTID, {
        variables: {
            id
        },
        skip: props.title === "" || props.title === null,
        ssr: true
    })

    useEffect(() => {
        if (loading && id) {
            setName(null);
            setEmail(null);
            setPhone(null);
        }
    }, [id, loading]);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name,
            email,
            phone
        },
    });


    const [updateClient] = useMutation(UPDATE_CLIENT, {
        variables: {
            id,
            ...((name !== null) ? {name} : {}),
            ...((email !== null) ? {email} : {}),
            ...((phone !== null) ? {phone} : {}),
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
            if (id === "Add Client") {
                await addClient().then(() => {
                    setName(null)
                    setEmail(null)
                    setPhone(null)
                })
            } else {
                await updateClient().then(() => {
                    setName(null)
                    setEmail(null)
                    setPhone(null)
                })
            }
            props.handleClose();
        } catch (err) {
            console.log('@@err', err)
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
        }
    };

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div onKeyDown={handleKeyDown}>
                    <Box sx={style}>
                        <Typography sx={{mb: 1}} id="modal-modal-title" variant="h6" component="h2">
                            {props.title}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={name ? name : undefined}
                                onChange={handleNameChange}
                                fullWidth
                                defaultValue={data?.client.name ?? undefined}
                                margin="normal"
                                size="small"
                                InputLabelProps={{shrink: !!name || data?.client.name}}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={email ? email : undefined}
                                onChange={handleEmailChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                defaultValue={data?.client.email ?? undefined}
                                InputLabelProps={{shrink: !!email || data?.client.email}}
                            />
                            <TextField
                                label="Phone"
                                variant="outlined"
                                value={phone ? phone : undefined}
                                onChange={handlePhoneChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                defaultValue={data?.client.phone ?? undefined}
                                InputLabelProps={{shrink: !!phone || data?.client.phone}}
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
                </div>
            </Modal>
        </>
    );
}
export default ClientModal;