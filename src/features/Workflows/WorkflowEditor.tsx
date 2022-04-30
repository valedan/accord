import { useState } from "react";

export default function WorkflowEditor() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setResponse(null);
    setError(null);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`);
    console.log(data);
    const resp = await data.json();
    console.log(resp);
    setResponse(resp);
  };

  return (
    <div className="m-8">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        Hello world
      </button>
      {error && <div className="text-red-600">{error.message}</div>}
      {response && <div>{response.message}</div>}
    </div>
  );
}
