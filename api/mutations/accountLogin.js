export async function AccountLogin(userData) {
  const response = await fetch("/api/accounts/login", {
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
