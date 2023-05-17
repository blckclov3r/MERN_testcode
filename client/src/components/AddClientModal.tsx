import {Box, Modal, TextField, Typography} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from "react";
import Button from "@mui/material/Button";

interface AddClientProps {
    handleClose: () => void
    open: boolean
    title?: string
}

const AddClientModal: React.FC<AddClientProps> = (props) => {

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

    const handleBackdropClick = (event: FormEvent) => {
        // Prevent closing when clicking outside the modal
        event.stopPropagation();
    };

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        // Perform any further actions with the form data
        props.handleClose();
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
                            margin="normal"
                            size="small"
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            margin="normal"
                            size="small"
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={handlePhoneChange}
                            fullWidth
                            margin="normal"
                            size="small"
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
export default AddClientModal;