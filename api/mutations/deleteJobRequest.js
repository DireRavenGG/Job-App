export async function deleteJobRequest(id) {
  const response = await fetch("/api/jobs/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  const { job } = data;
  return job;
}
