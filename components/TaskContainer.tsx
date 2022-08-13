import { Box, Container } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import { Draggable } from "react-beautiful-dnd";
import { Job } from "../types/job";

import Card from "./Card";
interface TaskContainerProps {
  title: string;
  jobs: any[];
  setLocalJobs: any;
  setDemo: Dispatch<SetStateAction<Job[]>>;
  user: any;
}
const TaskContainer = ({
  title,
  jobs,
  setLocalJobs,
  setDemo,
  user,
}: TaskContainerProps) => {
  return (
    <Container
      disableGutters
      sx={{
        m: 1,
        minHeight: "120px",
        maxHeight: "100%",
        bgcolor: "secondary.light",
        width: "215px",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          py: "4px",
        }}
      >
        {jobs
          ? jobs.map((job, index) =>
              job.status === title ? (
                <Draggable
                  key={job.id}
                  draggableId={`${job.id}`}
                  index={index}
                  disableInteractiveElementBlocking={true}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        {...job}
                        setLocalJobs={setLocalJobs}
                        allJobs={jobs}
                        user={user}
                        setDemo={setDemo}
                      />
                    </div>
                  )}
                </Draggable>
              ) : null
            )
          : null}
      </Box>
    </Container>
  );
};

export default TaskContainer;
