import {
    Box,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import { IClients, IProject, SelectOption } from './types';

interface AddProjectProps {
    id: string | null;
    handleClose: () => void;
    open: boolean;
    setClientId: Dispatch<SetStateAction<string | null>>;
    setName: Dispatch<SetStateAction<string | null>>;
    setDescription: Dispatch<SetStateAction<string | null>>;
    setStatus: Dispatch<SetStateAction<string | null>>;
    clientId: string | null;
    name: string | null;
    description: string | null;
    status: string | null;
    addProject: any;
    updateProject: any;
    projectList: { project: IProject } | undefined;
    clientsList: { clients: IClients[] } | undefined;
    clientIdOptions: SelectOption[];
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleStatusChange: (event: SelectChangeEvent) => void;
    handleClientChange: (event: SelectChangeEvent) => Promise<void>;
    selectedStatus: string;
    handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent) => Promise<void>;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    border: 'none',
};

const ProjectModal: React.FC<AddProjectProps> = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div onKeyDown={props.handleKeyDown}>
                    <Box sx={style}>
                        <Typography
                            sx={{ mb: 1 }}
                            id='modal-modal-title'
                            variant='h6'
                            component='h2'
                        >
                            {props.id ? props.id : 'Add Project'}
                        </Typography>
                        <form onSubmit={props.handleSubmit}>
                            <Select
                                labelId={'clientId'}
                                id={'clientId'}
                                onChange={props.handleClientChange}
                                value={
                                    (props?.clientId ||
                                        (props.projectList?.project?.clientId ?? '')) ??
                                    null
                                }
                                defaultValue={props.projectList?.project?.clientId ?? ''}
                                size={'small'}
                                sx={{ my: 1 }}
                                fullWidth={true}
                            >
                                {props.clientsList?.clients?.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>
                                        {client.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <TextField
                                label='Name'
                                variant='outlined'
                                value={props.name ? props.name : undefined}
                                onChange={props.handleNameChange}
                                fullWidth
                                defaultValue={props.projectList?.project?.name ?? undefined}
                                margin='normal'
                                size='small'
                                InputLabelProps={{
                                    shrink: (!!props.name ||
                                        props.projectList?.project?.name) as boolean,
                                }}
                            />
                            <TextField
                                label='Description'
                                variant='outlined'
                                value={props.description ? props.description : undefined}
                                onChange={props.handleDescriptionChange}
                                fullWidth
                                margin='normal'
                                size='small'
                                defaultValue={props.projectList?.project?.description ?? undefined}
                                InputLabelProps={{
                                    shrink: (!!props.description ||
                                        props.projectList?.project?.description) as boolean,
                                }}
                            />

                            <Select
                                labelId={'statusId'}
                                id={'selectedStatusId'}
                                value={
                                    props.status ||
                                    (props.selectedStatus !== null
                                        ? props.selectedStatus
                                        : props.clientIdOptions[0].value)
                                }
                                defaultValue={
                                    (props.id
                                        ? props.selectedStatus
                                        : props.clientIdOptions[0].value) ??
                                    props.clientIdOptions[0].value
                                }
                                onChange={props.handleStatusChange}
                                size={'small'}
                                sx={{ my: 1 }}
                            >
                                {props.clientIdOptions?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                <Button
                                    onClick={props.handleClose}
                                    variant='contained'
                                    color={'error'}
                                    size={'small'}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='small'
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
export default ProjectModal;
