import Button from "../../components/Button";
import { useWorkflow } from "./useWorkflow";

const workflows = [
  {
    entry_point: "hello_world",
    tasks: {
      hello_world: {
        output: "hello world!",
      },
    },
  },
];

export default function WorkflowEditor() {
  const { output, error, isLoading, runWorkflow } = useWorkflow();

  const handleClick = async () => {
    await runWorkflow(workflows[0]);
  };

  return (
    <div className="m-8">
      <Button onClick={handleClick}>Hello world</Button>
      {error && <div className="text-red-600">{error}</div>}
      {output && <div>{output}</div>}
    </div>
  );
}
