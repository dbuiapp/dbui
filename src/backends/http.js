// This backend uses http requests

export default async function createRequest (action, params) {
  const response = await fetch(
    new Request(`/api/action/${action}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(params)
    })
  );
  const data = await response.json();
  if (response.status > 299 && data.error) {
    throw new Error(data.error);
  }
  return data;
}