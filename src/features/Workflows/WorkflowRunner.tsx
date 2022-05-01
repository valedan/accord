import Button from "../../components/Button";
import { Workflow } from "../../types";
import { useWorkflow } from "./useWorkflow";

interface Props {
  name: string;
  workflow: Workflow;
}

export default function WorkflowEditor({ name, workflow }: Props) {
  const { output, error, isLoading, runWorkflow } = useWorkflow();

  const handleClick = async () => {
    await runWorkflow(workflow);
  };

  return (
    <div className="flex items-center">
      <Button className="mr-2" onClick={handleClick}>
        {name}
      </Button>

      {error && <div className="text-red-600">{error}</div>}
      {output && <div>{output}</div>}
    </div>
  );
}
