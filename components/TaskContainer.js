import { alpha, Box, Container } from "@mui/material";

import { Draggable } from "react-beautiful-dnd";

import Card from "./Card";

const TaskContainer = ({ title, jobs, setLocalJobs, index }) => {
  return (
    <Container
      disableGutters
      sx={{
        m: 1,
        minHeight: "120px",
        maxHeight: "100%",
        bgcolor: alpha("#BDC2C8", 0.1),
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
