// TODO: Share types with backend. Monorepo or package?
interface WaitStep {
  wait: number;
}

interface LengthStep {
  length: string;
}

interface GreaterThanStep {
  gt: [string, number];
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

interface WorkflowParams {
  [key: string]: string;
}

interface Workflow {
  entry_point: string;
  tasks: TaskCollection;
}

export type { Task, TaskCollection, Workflow, WorkflowParams };
