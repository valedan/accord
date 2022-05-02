import { useEffect, useState } from "react";

import { Button, Input } from "../../components";
import { Workflow } from "../../types";
import { useWorkflow } from "./useWorkflow";

interface Props {
  name: string;
  workflow: Workflow;
  parameters: string[];
}

export default function WorkflowRunner({ name, workflow, parameters }: Props) {
  const { output, debug, error, isLoading, runWorkflow } = useWorkflow(name);
  const [paramInputs, setParamInputs] = useState<{ [key: string]: string }>({});

  // reset the state when the workflow changes
  useEffect(() => {
    setParamInputs({});
  }, [name]);

  const handleRunWorkflow = async () => {
    await runWorkflow(workflow, paramInputs);
  };

  const handleUpdateParam = (key: string, value: string) => {
    setParamInputs({ ...paramInputs, [key]: value });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRunWorkflow();
    }
  };

  return (
    <div className="flex flex-col ">
      {parameters.map((param, index) => (
        <div key={index} className="flex items-center">
          {/* TODO: Validate that user provides input here (all inputs are required by backend) */}
          <Input
            label={param}
            id={param}
            value={paramInputs[param] || ""}
            onChange={(e) => handleUpdateParam(param, e.target.value)}
            className="mr-4 mb-4"
            onKeyDown={handleKeyDown}
          />
        </div>
      ))}
      <div className="flex">
        <Button
          className="mr-2 mb-2"
          disabled={isLoading}
          onClick={handleRunWorkflow}
        >
          {isLoading ? "Loading..." : "Execute workflow"}
        </Button>
      </div>
      {error && <div className="text-red-600">Error: {error}</div>}
      {output && <div className={"font-bold"}>Result: {output}</div>}
      <div className="mt-8">
        {debug.length ? (
          <>
            <p>Debug:</p>
            <div className="border-gray-400 border w-2/3 p-2 rounded">
              {debug.map((line, index) => (
                <div key={index}>{JSON.stringify(line, null, 2)}</div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
