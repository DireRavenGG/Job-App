import { Container, ListItemSecondaryAction, Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Containers from "../components/TaskContainer";
import Navigation from "../components/Navigation";
import { useQuery, useMutation } from "react-query";
import styles from "../styles/Home.module.css";
import TaskContainer from "../components/TaskContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateJobs } from "../api/mutations/updateJobs";
import ContainerHeader from "../components/ContainerHeader";

async function fetchJobsRequest() {
  const response = await fetch("/api/jobs");
  const data = await response.json();
  const { jobs } = data;
  return jobs;
}

export default function Home() {
  const { data: jobs } = useQuery("jobs", fetchJobsRequest);

  const [localJobs, setLocalJobs] = useState([]);

  const updateMutate = useMutation(updateJobs, {
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    if (jobs) {
      setLocalJobs([...jobs]);
    }
  }, [jobs]);

  const dragEndHandler = (result) => {
    if (!result.destination) return;

    const jobIndex = localJobs.findIndex((job) => job.id == result.draggableId);
    localJobs[jobIndex].status = result.destination.droppableId;

    const localJobsArr = Array.from(localJobs);
    const [reorder] = localJobsArr.splice(result.source.index, 1);
    localJobsArr.splice(result.destination.index, 0, reorder);

    setLocalJobs(localJobsArr);

    if (result.destination.droppableId != result.source.droppableId) {
      localJobs.map((job) => {
        if (job.id == result.draggableId) {
          const updateObj = {
            id: result.draggableId,
            status: result.destination.droppableId,
          };
          updateMutate.mutate(updateObj);
        }
      });
    }
  };

  const titleArr = ["To Do", "In Progress", "PLACEHOLDER", "Completed"];

  return (
    <Container>
      <Navigation />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="fit-content"
        margin="auto"
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gap={1}
          width="100%"
          justifyItems="center"
        >
          {titleArr.map((title) => (
            <ContainerHeader key={title} title={title} />
          ))}
        </Box>
        <Box width="fit-content" display="flex" flexDirection="row">
          <DragDropContext key={"title"} onDragEnd={dragEndHandler}>
            {titleArr.map((title, index) => (
              <Droppable key={`${index}`} droppableId={`${title}`}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TaskContainer
                      key={title}
                      title={title}
                      jobs={localJobs}
                      setLocalJobs={setLocalJobs}
                    />
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </Box>
      </Box>
    </Container>
  );
}
