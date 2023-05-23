import { useMutation } from "@apollo/client";
import { Box, Button, TableCell } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Project } from "@/generated/graphql";
import projects from "@/queries/projects";

interface IProject {
  handleOpen: (id: string) => void;
  project: Project;
}

const ProjectRow: React.FC<IProject> = (props) => {
  const { DELETE_PROJECT, GET_PROJECTS } = projects();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: props.project?.id },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <>
      <TableCell>{props.project?.id}</TableCell>
      <TableCell>{props.project?.name}</TableCell>
      <TableCell>{props.project?.description}</TableCell>
      <TableCell>{props.project?.status}</TableCell>
      <TableCell align={"right"} sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={"contained"}
            size={"small"}
            color={"primary"}
            onClick={() => {
              props.handleOpen(props.project?.id as string);
            }}
          >
            <ModeEditOutlinedIcon />
          </Button>
          <Button
            variant={"contained"}
            size={"small"}
            color={"error"}
            onClick={async () => {
              const result = confirm(
                "Do you want to delete this project id" + props?.project?.id
              );
              if (result) {
                await deleteProject();
              }
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
      </TableCell>
    </>
  );
};

export default ProjectRow;
