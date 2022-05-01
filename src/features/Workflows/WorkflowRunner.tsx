import { useState } from "react";

import { Button, Input } from "../../components";
import { Workflow } from "../../types";
import { useWorkflow } from "./useWorkflow";

interface Props {
  name: string;
  workflow: Workflow;
  parameters: string[];
}

export default function WorkflowEditor({ name, workflow, parameters }: Props) {
  const { output, error, isLoading, runWorkflow } = useWorkflow();
  const [paramInputs, setParamInputs] = useState<{ [key: string]: string }>({});

  const handleClick = async () => {
    await runWorkflow(workflow, paramInputs);
  };

  const handleUpdateParam = (key: string, value: string) => {
    setParamInputs({ ...paramInputs, [key]: value });
  };

  return (
    <div className="flex items-end ">
      {parameters.map((param, index) => (
        <div key={index} className="flex items-center">
          <Input
            label={param}
            value={paramInputs[param] || ""}
            onChange={(e) => handleUpdateParam(param, e.target.value)}
            className="mr-4"
          />
        </div>
      ))}
      <div className="flex items-center ">
        <Button className="mr-2" disabled={isLoading} onClick={handleClick}>
          {isLoading ? "Loading..." : name}
        </Button>

        {error && <div className="text-red-600">{error}</div>}
        {output && <div>{output}</div>}
      </div>
    </div>
  );
}
