import { WorkflowWithParams } from "./types";

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
  {
    workflow: {
      entry_point: "name_classifier",
      tasks: {
        name_is_long_or_short: {
          steps: [
            {
              length: "@{name}",
            },
            {
              gt: ["@{0}", 7],
            },
            {
              if: {
                condition: "@{0}",
                true: "long name",
                false: "short name",
              },
            },
          ],
        },
        name_classifier: {
          output: "@{name} is a ${name_is_long_or_short}",
        },
      },
    },
    parameters: ["name"],
  },
  {
    workflow: {
      entry_point: "custom_name_classifier",
      tasks: {
        is_name_greater_than_threshold: {
          steps: [
            {
              length: "@{name}",
            },
            {
              gt: ["@{0}", "@{threshold}"] as [string, string],
            },
          ],
        },
        name_is_long_or_short: {
          steps: [
            {
              if: {
                condition: "${is_name_greater_than_threshold}",
                true: "longer than @{threshold}",
                false: "shorter than @{threshold}",
              },
            },
          ],
        },
        custom_name_classifier: {
          output: "@{name} is ${name_is_long_or_short}",
        },
      },
    },
    parameters: ["name", "threshold"],
  },
];

export default workflows;
