export async function fetchJobsRequest(name: string) {
  const response = await fetch(`/api/jobs/index/${name}`);
  const data = await response.json();

  return data;
}
