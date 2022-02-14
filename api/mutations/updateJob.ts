type Job = {
  title: string;

  moreInfo: string;

  id: number;
};

export async function updateJobs(job: Job) {
  const response = await fetch("/api/jobs/updateJob", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  const data = await response.json();
  const { jobData } = data;
  return jobData;
}
