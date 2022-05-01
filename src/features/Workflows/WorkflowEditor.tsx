import { Workflow } from "../../types";
import WorkflowRunner from "./WorkflowRunner";

interface WorkflowWithParams {
  workflow: Workflow;
  parameters: string[];
}

const workflows: WorkflowWithParams[] = [
  {
    workflow: {
      entry_point: "hello_world",
      tasks: {
        hello_world: {
          output: "hello world!",
        },
      },
    },
    parameters: [],
  },
  {
    workflow: {
      entry_point: "hello_name",
      tasks: {
        name: {
          output: "Alan",
        },
        hello_name: {
          output: "hello ${name}!",
        },
      },
    },
    parameters: [],
  },
  {
    workflow: {
      entry_point: "hello_input",
      tasks: {
        hello_input: {
          output: "hello @{name}!",
        },
      },
    },
    parameters: ["name"],
  },
  {
    workflow: {
      entry_point: "slow_goodbye",
      tasks: {
        slow_goodbye: {
          steps: [
            {
              wait: 5,
            },
          ],
          output: "goodbye!",
        },
      },
    },
    parameters: [],
  },
  {
    workflow: {
      entry_point: "join",
      tasks: {
        slow_goodbye: {
          steps: [
            {
              wait: 5,
            },
          ],
          output: "goodbye",
        },
        slow_name: {
          steps: [
            {
              wait: 5,
            },
          ],
          output: "Ada",
        },
        join: {
          output: "${slow_goodbye} ${slow_name}!",
        },
      },
    },
    parameters: [],
  },
];

export default function WorkflowEditor() {
  return (
    <div className="m-8 flex flex-col gap-4">
      {workflows.map(({ workflow, parameters }, index) => (
        <WorkflowRunner key={index} name={`Workflow ${index + 1}`} workflow={workflow} parameters={parameters} />
      ))}
    </div>
  );
}
