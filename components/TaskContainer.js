import { Container, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const TaskContainer = ({ title, jobs }) => {
  return (
    <Container
      sx={{
        width: "225px",
        minHeight: "500px",
        maxHeight: "100%",
        bgcolor: "secondary.light",
        color: "#fefefe",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {jobs.map((job, index) =>
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
                <Card {...job} />
              </div>
            )}
          </Draggable>
        ) : null
      )}
    </Container>
  );
};

export default TaskContainer;
