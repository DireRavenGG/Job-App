import { Container, ListItemSecondaryAction, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Containers from "../components/TaskContainer";
import Navigation from "../components/Navigation";
import { useQuery, useMutation } from "react-query";
import styles from "../styles/Home.module.css";
import TaskContainer from "../components/TaskContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateJobs } from "../api/mutations/updateJobs";

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
      <Stack direction="row" justifyContent="space-evenly">
        <DragDropContext key={"title"} onDragEnd={dragEndHandler}>
          {titleArr.map((title, index) => (
            <Droppable key={`${index}`} droppableId={`${title}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskContainer key={title} title={title} jobs={localJobs} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Stack>
    </Container>
  );
}
