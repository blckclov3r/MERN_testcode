import {Box, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useMemo} from "react";
import Button from "@mui/material/Button";
import {IClients, IProject, SelectOption} from "@/components/projects/ProjectsContainer";


interface AddProjectProps {
    id: string | null
    handleClose: () => void
    open: boolean
    setClientId: Dispatch<SetStateAction<string | null>>
    setName: Dispatch<SetStateAction<string | null>>
    setDescription: Dispatch<SetStateAction<string | null>>
    setStatus: Dispatch<SetStateAction<string | null>>
    clientId: string | null
    name: string | null
    description: string | null
    status: string | null
    addProject: any
    updateProject: any
    projectList: { project: IProject } | undefined
    clientsList: { clients: IClients[] } | undefined
    clientIdOptions: SelectOption[]
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

const ProjectModal: React.FC<AddProjectProps> = (props) => {

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setDescription(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (props.id === "" || props.id === null) {
                await props.addProject()
            } else {
                await props.updateProject()
            }
            props.setClientId(null)
            props.setName(null)
            props.setDescription(null)
            props.setStatus(null)
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

    const handleStatusChange = (event: SelectChangeEvent) => {
        props.setStatus(event.target.value as string);
    };

    const handleClientChange = async (event: SelectChangeEvent) => {
        await props.setClientId(event.target.value as string)
    }

    const selectedStatus = useMemo(() => {
        return props.clientIdOptions?.filter(x => {
            if (x.label === props.projectList?.project.status) {
                return x
            }
        })[0]?.value ?? null
    }, [props.id, props.projectList?.project?.status])


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
                            {props.id ? props.id : "Add Project"}
                        </Typography>
                        <form onSubmit={handleSubmit}>

                            <Select
                                labelId={'clientId'}
                                id={'clientId'}
                                onChange={handleClientChange}
                                value={props?.clientId || (props.projectList?.project.clientId || '')}
                                defaultValue={props.projectList?.project.clientId}
                                size={'small'}
                                sx={{my: 1}}
                                fullWidth={true}
                            >
                                {
                                    props.clientsList?.clients.map((client) => (
                                        <MenuItem key={client.id} value={client.id}>
                                            {client.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>

                            <TextField
                                label="Name"
                                variant="outlined"
                                value={props.name ? props.name : undefined}
                                onChange={handleNameChange}
                                fullWidth
                                defaultValue={props.projectList?.project?.name ?? undefined}
                                margin="normal"
                                size="small"
                                InputLabelProps={{shrink: (!!props.name || props.projectList?.project?.name) as boolean}}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                value={props.description ? props.description : undefined}
                                onChange={handleDescriptionChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                defaultValue={props.projectList?.project?.description ?? undefined}
                                InputLabelProps={{shrink: (!!props.description || props.projectList?.project?.description) as boolean}}
                            />

                            <Select
                                labelId={'statusId'}
                                id={'selectedStatusId'}
                                value={props.status || (selectedStatus !== null ? selectedStatus : props.clientIdOptions[0].value)}
                                defaultValue={(props.id ? selectedStatus : props.clientIdOptions[0].value) ?? props.clientIdOptions[0].value}
                                onChange={handleStatusChange}
                                size={'small'}
                                sx={{my: 1}}
                            >
                                {props.clientIdOptions?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>

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
export default ProjectModal;