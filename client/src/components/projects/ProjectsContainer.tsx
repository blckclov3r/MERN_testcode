import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import Table from "@mui/material/Table";
import { Project } from "@/generated/graphql";
import Button from "@mui/material/Button";
import projects from "@/queries/projects";
import ProjectRow from "@/components/projects/ProjectRow";
import { useCallback, useState } from "react";
import ProjectModal from "@/components/projects/ProjectModal";
import clients from "@/queries/clients";

export interface IProject {
  id: string;
  name?: string;
  description?: string;
  status?: string;
  clientId: string;
}

export interface IClients {
  __typename: string;
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type SelectOption = {
  id: number;
  value: string;
  label: string;
};
const clientIdOptions: SelectOption[] = [
  {
    id: 1,
    value: "new",
    label: "Not Started",
  },
  {
    id: 2,
    value: "progress",
    label: "In Progress",
  },
  {
    id: 3,
    value: "completed",
    label: "Completed",
  },
];
const ProjectContainer = () => {
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handleOpen = useCallback(
    (id?: string) => {
      if (id) {
        setId(id);
      }
      setOpen(true);
    },
    [id]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setId(null);
  }, [id]);

  const { ADD_PROJECT, GET_PROJECTS, GET_PROJECTID, UPDATE_PROJECT } =
    projects();
  const { GET_CLIENTS } = clients();

  const { data: projectList, loading } = useQuery<{ project: IProject }>(
    GET_PROJECTID,
    {
      variables: {
        id: id,
      },
      skip: id === "" || id === null,
      ssr: true,
    }
  );
  const { data: clientsList } = useQuery<{ clients: IClients[] }>(GET_CLIENTS, {
    ssr: true,
  });
  const { data: projectsList } = useQuery(GET_PROJECTS, { ssr: true });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: projectList?.project.id ?? "",
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
      status: status ?? "new",
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

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant={"h3"}>Projects</Typography>
      </Box>
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={() => {
          handleOpen();
        }}
        sx={{ mb: 2 }}
      >
        Add Project
      </Button>
      {loading ? (
        <Box>
          <Typography variant={"body1"}>Loading...</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
      />
    </>
  );
};

export default ProjectContainer;
