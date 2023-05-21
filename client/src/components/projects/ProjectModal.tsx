import {Box, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {ChangeEvent, FormEvent, useEffect, useMemo, useState} from "react";
import Button from "@mui/material/Button";
import {useMutation, useQuery} from "@apollo/client";
import projects from "@/queries/projects";

interface IProject {
    id: string;
    name?: string;
    description?: string;
    status?: string;
}

interface AddProjectProps {
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

type SelectOption = {
    id: number;
    value: string;
    label: string;
}

const clientIdOptions: SelectOption[] = [
    {
        id: 1,
        value: 'new',
        label: 'Not Started'
    },
    {
        id: 2,
        value: 'progress',
        label: 'In Progress'
    },
    {
        id: 3,
        value: 'completed',
        label: 'Completed'
    },
]
console.log('@@clientIdOptions', clientIdOptions)

const ProjectModal: React.FC<AddProjectProps> = (props) => {

    const [status, setStatus] = useState<string | null>('')

    const [name, setName] = useState<string | null>('');
    const [description, setDescription] = useState<string | null>('');

    const {ADD_PROJECT, GET_PROJECTS, GET_PROJECTID, UPDATE_PROJECT} = projects();
    const id = props?.title ?? null

    const {data: projectList, loading} = useQuery<{ project: IProject }>(GET_PROJECTID, {
        variables: {
            id
        },
        // skip: props.title === "" || props.title === null,
        ssr: true
    })
    const {data: projectsList} = useQuery<{ projects: IProject[] }>(GET_PROJECTS);

    useEffect(() => {
        if (loading && id) {
            setName(null);
            setDescription(null);
            setStatus(null);
        }
    }, [id, loading]);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {
            // id: data?.project.id,
            name,
            description,
            status
        },
        update(cache, {
            data: {addProject}
        }) {
            const {projects} = cache.readQuery<any>({query: GET_PROJECTS})
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: projects?.concat([addProject]) ?? []}
            })
        }
        // refetchQueries: [{query: GET_PROJECTS}]
    });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id,
            ...((name !== null) ? {name} : {}),
            ...((description !== null) ? {description} : {}),
            ...((status !== null) ? {status} : {}),
        },
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await updateProject().then(() => {
            setName(null)
            setDescription(null)
            setStatus(null)
        })

        try {
            if (id === "Add Project") {
                if (!name || !description || !status) {
                    alert('Please fill in all fields')
                }
                await addProject().then(() => {
                    setName(null)
                    setDescription(null)
                    setStatus(null)
                })
            } else {
                await updateProject().then(() => {
                    setName(null)
                    setDescription(null)
                    setStatus(null)
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

    const handleStatusChange = (event: any) => {
        setStatus(event.target.value as string);
    };

    const selectedStatus = useMemo(() => {
        return clientIdOptions?.filter(x => {
            if (x.label === projectList?.project.status) {
                return x
            }
        })[0]?.value ?? null
    }, [id, projectList?.project?.status])

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
                            <Select
                                labelId={'clientId'}
                                id={'select'}
                                value={status || (selectedStatus !== null ? selectedStatus : clientIdOptions[0].value)}
                                defaultValue={(id ? selectedStatus : clientIdOptions[0].value) ?? clientIdOptions[0].value}
                                onChange={handleStatusChange}
                            >
                                {clientIdOptions?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>

                            <TextField
                                label="Name"
                                variant="outlined"
                                value={name ? name : undefined}
                                onChange={handleNameChange}
                                fullWidth
                                defaultValue={projectList?.project?.name ?? undefined}
                                margin="normal"
                                size="small"
                                InputLabelProps={{shrink: (!!name || projectList?.project?.name) as boolean}}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                value={description ? description : undefined}
                                onChange={handleDescriptionChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                defaultValue={projectList?.project?.description ?? undefined}
                                InputLabelProps={{shrink: (!!description || projectList?.project?.description) as boolean}}
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
export default ProjectModal;