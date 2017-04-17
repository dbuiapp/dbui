// This backend uses http requests

export default async function createRequest (action, params) {
  const response = await fetch(
    new Request(`/api/action/${action}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    })
  );
  return response.json();
}
