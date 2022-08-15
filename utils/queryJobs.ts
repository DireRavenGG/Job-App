import { useQuery } from "react-query";
import { fetchJobsRequest } from "../api/mutations/fetchJobRequest";

const QueryJobs = (name: string) => {
  const { data: jobs } = useQuery(
    ["jobs", name],
    () => fetchJobsRequest(name),
    { retry: false }
  );
  return jobs;
};

export default QueryJobs;
