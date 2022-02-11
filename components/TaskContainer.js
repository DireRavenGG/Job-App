import { Box, Container } from "@mui/material";

import { Draggable } from "react-beautiful-dnd";

import Card from "./Card";

const TaskContainer = ({ title, jobs, setLocalJobs, setCheese, user }) => {
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
                        setCheese={setCheese}
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
