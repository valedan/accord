import { useState } from "react";

import { Button, Input } from "../../components";
import { Workflow } from "../../types";
import { useWorkflow } from "./useWorkflow";

interface Props {
  name: string;
  workflow: Workflow;
  parameters: string[];
}

export default function WorkflowRunner({ name, workflow, parameters }: Props) {
  const { output, error, isLoading, runWorkflow } = useWorkflow();
  const [paramInputs, setParamInputs] = useState<{ [key: string]: string }>({});

  const handleClick = async () => {
    await runWorkflow(workflow, paramInputs);
  };

  const handleUpdateParam = (key: string, value: string) => {
    setParamInputs({ ...paramInputs, [key]: value });
  };

  return (
    <div className="flex flex-col ">
      {parameters.map((param, index) => (
        <div key={index} className="flex items-center">
          {/* TODO: Validate that user provides input here (all inputs are required by backend) */}
          <Input
            label={param}
            value={paramInputs[param] || ""}
            onChange={(e) => handleUpdateParam(param, e.target.value)}
            className="mr-4 mb-4"
          />
        </div>
      ))}
      <div className="flex">
        <Button className="mr-2 mb-2" disabled={isLoading} onClick={handleClick}>
          {isLoading ? "Loading..." : name}
        </Button>
      </div>
      {error && <div className="text-red-600">Error: {error}</div>}
      {output && <div>Output: {output}</div>}
    </div>
  );
}
