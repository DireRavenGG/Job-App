export async function CreateAccount(userData) {
  const response = await fetch("/api/accounts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userData }),
  });
  const data = await response.json();
  const { account } = data;
  return account;
}
