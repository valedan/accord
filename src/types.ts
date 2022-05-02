// TODO: Share types with backend. Monorepo or package?
interface WaitStep {
  wait: number;
}

interface LengthStep {
  length: string;
}

interface GreaterThanStep {
  gt: [string, number | string];
}

interface IfStep {
  if: {
    condition: string;
    true: string;
    false: string;
  };
}

type Step = WaitStep | LengthStep | GreaterThanStep | IfStep;

interface Task {
  output?: string;
  steps?: Step[];
}

interface TaskCollection {
  [key: string]: Task;
}

interface TaskResult {
  task: string;
  step: number | "output";
  result: string | number | boolean;
}

interface WorkflowParams {
  [key: string]: string;
}

interface Workflow {
  entry_point: string;
  tasks: TaskCollection;
}

interface WorkflowWithParams {
  workflow: Workflow;
  parameters: string[];
}

export type {
  Task,
  TaskCollection,
  TaskResult,
  Workflow,
  WorkflowParams,
  WorkflowWithParams,
};
