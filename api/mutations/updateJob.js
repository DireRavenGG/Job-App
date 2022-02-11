export async function updateJobs(jobs) {
  const response = await fetch("/api/jobs/updateJob", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobs),
  });
  const data = await response.json();
  const { job } = data;
  return job;
}
