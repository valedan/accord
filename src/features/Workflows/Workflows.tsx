import { useState } from "react";

import Select from "../../components/Select";
import { WorkflowWithParams } from "../../types";
import WorkflowRunner from "./WorkflowRunner";

interface Props {
  workflows: WorkflowWithParams[];
}

export default function Workflows({ workflows }: Props) {
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);

  return (
    <div className="ml-16 mt-16 flex flex-col">
      <Select
        id="workflow"
        name="workflow"
        label="Select a workflow"
        onChange={(e) => setSelectedWorkflowIndex(Number(e.target.value))}
        value={selectedWorkflowIndex}
        className="w-64 mb-8"
      >
        {workflows.map(({ workflow }, index) => (
          <option key={index} value={index}>
            {workflow.entry_point}
          </option>
        ))}
      </Select>
      <WorkflowRunner
        name={workflows[selectedWorkflowIndex].workflow.entry_point}
        workflow={workflows[selectedWorkflowIndex].workflow}
        parameters={workflows[selectedWorkflowIndex].parameters}
      />
    </div>
  );
}
