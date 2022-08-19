import { useQuery } from "react-query";
import { fetchJobsRequest } from "../api/mutations/fetchJobRequest";
import { Job } from "../types/job";

const useQueryJobs = (name?: string) => {
  const { data: jobs } = useQuery<Job[]>(
    ["jobs", name],
    () => fetchJobsRequest(name || ""),
    { retry: false, enabled: !!name }
  );
  return jobs;
};

export default useQueryJobs;
