import { Container, Box } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useMutation } from "react-query";
import TaskContainer from "../components/TaskContainer";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import ContainerHeader from "../components/ContainerHeader";
import { Job } from "../types/job";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/config";
import UserProps from "../types/user";
import useQueryJobs from "../utils/useQueryJobs";
import useDragEndHandler from "../utils/useDragEndHandler";

interface HomeProps {
  demo: Job[];
  setDemo: Dispatch<SetStateAction<Job[]>>;
  user: UserProps | undefined;
}

export default function Home({ demo, setDemo, user }: HomeProps) {
  const jobs = useQueryJobs(user?.username);
  const setJobs = (jobs: Job[]) => {
    setLocalJobs(jobs);
  };
  const [result, setResult] = useState<DropResult>();
  const [localJobs, setLocalJobs] = useState<Job[]>([]);

  useDragEndHandler(localJobs, setJobs, setResult, user, result);

  useEffect(() => {
    if (user) {
      if (jobs) {
        setLocalJobs([...jobs]);
      }
    } else {
      setLocalJobs(demo);
    }
  }, [demo, jobs, user]);

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
            <DragDropContext
              key={"title"}
              onDragEnd={(result) => setResult(result)}
            >
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
