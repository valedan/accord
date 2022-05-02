import { useEffect, useState } from "react";

import { TaskResult, Workflow, WorkflowParams } from "../../types";

export const useWorkflow = (name: string) => {
  const [output, setOutput] = useState<string | null>(null);
  const [debug, setDebug] = useState<TaskResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reset = () => {
    setOutput(null);
    setDebug([]);
    setError(null);
    setIsLoading(false);
  };

  // reset the state when the workflow changes
  useEffect(() => {
    reset();
  }, [name]);

  const runWorkflow = async (
    workflow: Workflow,
    parameters: WorkflowParams
  ) => {
    reset();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workflow, parameters }),
        }
      );

      const {
        output,
        debug,
        error,
        message,
      }: {
        output?: string;
        debug?: TaskResult[];
        error?: string;
        message?: string;
      } = await response.json();

      if (output) {
        setOutput(output);
      }

      if (debug) {
        setDebug(debug);
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

  return { output, debug, error, isLoading, runWorkflow };
};
