import { DropResult } from "react-beautiful-dnd";
import { useMutation } from "react-query";
import { updateStatus } from "../api/mutations/updateStatus";
import { Job } from "../types/job";
import UserProps from "../types/user";

const useDragEndHandler = (
  localJobs: Job[],
  setLocalJobs: (jobs: Job[]) => void,
  setResult: any,
  user?: UserProps,
  result?: DropResult
) => {
  console.log(result);
  const updateMutate = useMutation(updateStatus);

  if (!result || !result.destination) return;
  if (!user) {
    const jobIndex = localJobs.findIndex(
      (job) => job.id.toString() === result.draggableId
    );
    localJobs[jobIndex].status = result.destination.droppableId;

    const localJobsArr = Array.from(localJobs);
    const [reorder] = localJobsArr.splice(result.source.index, 1);
    localJobsArr.splice(result.destination.index, 0, reorder);

    setLocalJobs(localJobsArr);
    setResult(undefined);
    return;
  }
  const jobIndex = localJobs.findIndex(
    (job) => job.id.toString() === result.draggableId
  );
  localJobs[jobIndex].status = result.destination.droppableId;

  const localJobsArr = Array.from(localJobs);
  const [reorder] = localJobsArr.splice(result.source.index, 1);
  localJobsArr.splice(result.destination.index, 0, reorder);

  setLocalJobs(localJobsArr);

  if (result.destination.droppableId != result.source.droppableId) {
    localJobs.map((job) => {
      if (job.id.toString() === result.draggableId) {
        const updateObj = {
          id: result.draggableId,
          status: result.destination!.droppableId,
        };
        updateMutate.mutate(updateObj);
      }
    });
  }
  setResult(undefined);
  return;
};

export default useDragEndHandler;
