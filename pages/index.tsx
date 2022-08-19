import { Container, Box } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useMutation } from "react-query";
import TaskContainer from "../components/TaskContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateJobs } from "../api/mutations/updateStatus";
import ContainerHeader from "../components/ContainerHeader";
import { Job } from "../types/job";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/config";
import UserProps from "../types/user";
import useQueryJobs from "../utils/useQueryJobs";

interface HomeProps {
  demo: Job[];
  setDemo: Dispatch<SetStateAction<Job[]>>;
  user: UserProps | null;
}

export default function Home({ demo, setDemo, user }: HomeProps) {
  const jobs = useQueryJobs(user?.username);

  const [localJobs, setLocalJobs] = useState<Job[]>([]);

  const updateMutate = useMutation(updateJobs, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (user) {
      if (jobs) {
        setLocalJobs([...jobs.jobs]);
      }
    } else {
      setLocalJobs(demo);
    }
  }, [demo, jobs, user]);

  const dragEndHandler = (result: any) => {
    if (!result.destination) return;
    if (!user) {
      const jobIndex = localJobs.findIndex(
        (job) => job.id == result.draggableId
      );
      localJobs[jobIndex].status = result.destination.droppableId;

      const localJobsArr = Array.from(localJobs);
      const [reorder] = localJobsArr.splice(result.source.index, 1);
      localJobsArr.splice(result.destination.index, 0, reorder);

      setLocalJobs(localJobsArr);
      return;
    }
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

  const titleArr = ["To Do", "In Progress", "Look Over", "Completed"];

  return (
    <Box>
      <Box>
        <Navigation user={user} />
      </Box>
      <Container>
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
                        setDemo={setDemo}
                        user={user}
                      />
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.account || null,
      },
    };
  },
  ironOptions
);
