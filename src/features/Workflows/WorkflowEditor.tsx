import { Workflow } from "../../types";
import WorkflowRunner from "./WorkflowRunner";

const workflows: Workflow[] = [
  {
    entry_point: "hello_world",
    tasks: {
      hello_world: {
        output: "hello world!",
      },
    },
  },
  {
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
];

export default function WorkflowEditor() {
  return (
    <div className="m-8 flex flex-col gap-4">
      {workflows.map((workflow, index) => (
        <WorkflowRunner key={index} name={`Workflow ${index + 1}`} workflow={workflow} />
      ))}
    </div>
  );
}
