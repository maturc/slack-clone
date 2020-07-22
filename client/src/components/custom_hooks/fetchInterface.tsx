export default async function fetchInterface( route: string, method: string = "get", body: string | null = null ): Promise<any> {
  try {
    debugger
    const response = await fetch(`http://localhost:5000${route}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    });
    const data = await response.json();
    return data;
  } catch(e) {
    console.log("Authentication error.")
    //needs to be reworked
  }
}