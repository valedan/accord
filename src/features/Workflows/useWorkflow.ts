import { useState } from "react";

import { Workflow } from "../../types";

export const useWorkflow = () => {
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const runWorkflow = async (workflow: Workflow) => {
    setOutput(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workflow }),
      });

      const { output, error, message }: { output?: string; error?: string; message?: string } = await response.json();

      if (output) {
        setOutput(output);
      }

      if (error) {
        setError(`${error} ${message}`);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { output, error, isLoading, runWorkflow };
};
