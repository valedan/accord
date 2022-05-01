import { Workflow } from "../../types";

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

export default workflows;
