export async function updateJobs(jobs: object) {
  const response = await fetch("/api/jobs/updateStatus", {
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
