export async function updateStatus(status: object) {
  const response = await fetch("/api/jobs/updateStatus", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });
  const data = await response.json();
  const { job } = data;
  return job;
}
