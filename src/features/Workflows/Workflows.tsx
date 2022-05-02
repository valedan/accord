import { useState } from "react";

import Select from "../../components/Select";
import workflows from "./presetWorkflows";
import WorkflowRunner from "./WorkflowRunner";

export default function Workflows() {
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);

  return (
    <div className="m-8 flex flex-col">
      <Select
        id="workflow"
        name="workflow"
        onChange={(e) => setSelectedWorkflowIndex(Number(e.target.value))}
        defaultValue={selectedWorkflowIndex}
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
