import {Box, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import Table from '@mui/material/Table';
import {Project} from "@/generated/graphql";
import Button from "@mui/material/Button";
import projects from "@/queries/projects";
import ProjectRow from "@/components/projects/ProjectRow";
import {useState} from "react";
import ProjectModal from "@/components/projects/ProjectModal";

const ProjectContainer = () => {
    const {GET_PROJECTS} = projects()
    const {data, loading, error} = useQuery(GET_PROJECTS)

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
                <Typography variant={'h3'}>Projects</Typography>
            </Box>
            <Button variant={'contained'} color={'primary'} onClick={() => {
                handleOpen()
            }} sx={{mb: 2}}>Add Project</Button>
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
                                    <TableCell>description</TableCell>
                                    <TableCell>status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data?.projects?.map((project: Project) => (
                                        <TableRow
                                            key={project.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <ProjectRow
                                                handleOpen={handleOpen}
                                                project={project}/>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            <ProjectModal title={title ? title : 'Add Project'} handleClose={handleClose} open={open}/>
        </>
    )
}

export default ProjectContainer