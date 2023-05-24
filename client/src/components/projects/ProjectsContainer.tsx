import {
    Box,
    Paper,
    SelectChangeEvent,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import Table from '@mui/material/Table';
import { Project } from '@/generated/graphql';
import Button from '@mui/material/Button';
import projects from '@/queries/projects';
import ProjectRow from '@/components/projects/ProjectRow';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import ProjectModal from '@/components/projects/ProjectModal';
import clients from '@/queries/clients';
import { SelectOption, IProject, IClients } from '@/components/projects/types';

const clientIdOptions: SelectOption[] = [
    {
        id: 1,
        value: 'new',
        label: 'Not Started',
    },
    {
        id: 2,
        value: 'progress',
        label: 'In Progress',
    },
    {
        id: 3,
        value: 'completed',
        label: 'Completed',
    },
];

const ProjectContainer = () => {
    const [id, setId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    const handleOpen = (id?: string) => {
        setOpen(true);
        setId(id ?? null);
    };

    const handleClose = () => {
        setOpen(false);
        setId(null);
    };

    const { ADD_PROJECT, GET_PROJECTS, GET_PROJECTID, UPDATE_PROJECT } = projects();
    const { GET_CLIENTS } = clients();

    const { data: projectList, loading } = useQuery<{ project: IProject }>(GET_PROJECTID, {
        variables: {
            id,
        },
        skip: id === null,
        ssr: true,
    });
    const { data: clientsList } = useQuery<{ clients: IClients[] }>(GET_CLIENTS, {
        ssr: true,
    });
    const { data: projectsList } = useQuery(GET_PROJECTS, { ssr: true });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id,
            ...(clientId !== null ? { clientId } : {}),
            ...(name !== null ? { name } : {}),
            ...(description !== null ? { description } : {}),
            ...(status !== null ? { status } : {}),
        },
    });

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {
            clientId,
            name,
            description,
            status: status ?? 'new',
        },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery<any>({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects?.concat([addProject]) ?? [] },
            });
        },
        // refetchQueries: [{query: GET_PROJECTS}]
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (id === '' || id === null) {
                await addProject();
            } else {
                await updateProject();
            }
            setClientId(null);
            setName(null);
            setDescription(null);
            setStatus(null);
            handleClose();
        } catch (err) {
            console.log('@@err', err);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
        }
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleClientChange = async (event: SelectChangeEvent) => {
        await setClientId(event.target.value as string);
    };

    const selectedStatus = useMemo(() => {
        return (
            clientIdOptions?.filter((x) => {
                if (x.label === projectList?.project?.status) {
                    return x;
                }
            })[0]?.value ?? null
        );
    }, [id, projectList?.project?.status]);

    return (
        <>
            <Box sx={{ my: 3 }}>
                <Typography variant={'h3'}>Projects</Typography>
            </Box>
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                    handleOpen();
                }}
                sx={{ mb: 2 }}
            >
                Add Project
            </Button>
            {loading ? (
                <Box>
                    <Typography variant={'body1'}>Loading...</Typography>
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>name</TableCell>
                                <TableCell>description</TableCell>
                                <TableCell>status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectsList?.projects?.map((project: Project) => (
                                <TableRow
                                    key={project.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <ProjectRow handleOpen={handleOpen} project={project} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <ProjectModal
                id={id}
                handleClose={handleClose}
                open={open}
                setClientId={setClientId}
                setName={setName}
                setDescription={setDescription}
                setStatus={setStatus}
                clientId={clientId}
                name={name}
                description={description}
                status={status}
                addProject={addProject}
                updateProject={updateProject}
                projectList={projectList}
                clientsList={clientsList}
                clientIdOptions={clientIdOptions}
                handleKeyDown={handleKeyDown}
                handleStatusChange={handleStatusChange}
                handleClientChange={handleClientChange}
                selectedStatus={selectedStatus}
                handleNameChange={handleNameChange}
                handleDescriptionChange={handleDescriptionChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default ProjectContainer;
