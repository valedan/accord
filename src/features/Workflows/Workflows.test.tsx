import "whatwg-fetch";
import "@testing-library/jest-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Workflow, WorkflowParams, WorkflowWithParams } from "../../types";
import Workflows from "./Workflows";

const server = setupServer(
  rest.post<{ workflow: Workflow; parameters: WorkflowParams }>(
    `${process.env.NEXT_PUBLIC_API_URL}/workflows`,
    (req, res, ctx) => {
      const { workflow, parameters } = req.body;

      const parameterValues = Object.values(parameters).join(", ");

      // if the user provided any params then return those, otherwise use the task output
      const output = parameterValues.length
        ? parameterValues
        : workflow.tasks[workflow.entry_point].output;

      return res(
        ctx.json({
          output,
          debug: [
            {
              task: workflow.entry_point,
              step: "output",
              result: output,
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe("Workflows", () => {
  it("lets user select and run a workflow", async () => {
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
          entry_point: "goodbye_world",
          tasks: {
            goodbye_world: {
              output: "goodbye world!",
            },
          },
        },
        parameters: [],
      },
    ];

    const { click, selectOptions } = userEvent.setup();
    render(<Workflows workflows={workflows} />);

    await selectOptions(screen.getByRole("combobox"), "goodbye_world");
    await click(screen.getByRole("button", { name: /execute workflow/i }));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Result: goodbye world!")).toBeInTheDocument();
      expect(screen.getByText("Debug:")).toBeInTheDocument();
      expect(screen.getByText(/"task": "goodbye_world"/)).toBeInTheDocument();
    });
  });

  it("provides input fields when required", async () => {
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
        parameters: ["name", "hometown"],
      },
    ];

    const { click, keyboard } = userEvent.setup();
    render(<Workflows workflows={workflows} />);

    await click(screen.getByLabelText(/name/i));
    await keyboard("Taylor");

    await click(screen.getByLabelText(/hometown/i));
    await keyboard("Brockton Bay");

    await click(screen.getByText(/execute workflow/i));

    await waitFor(() => {
      expect(
        screen.getByText("Result: Taylor, Brockton Bay")
      ).toBeInTheDocument();
    });
  });

  it("shows error state when workflow fails", async () => {
    const workflows: WorkflowWithParams[] = [
      {
        workflow: {
          entry_point: "missing",
          tasks: {},
        },
        parameters: [],
      },
    ];

    const { click } = userEvent.setup();
    render(<Workflows workflows={workflows} />);

    await click(screen.getByText(/execute workflow/i));

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("clears output when a new workflow is selected", async () => {
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
          entry_point: "goodbye_world",
          tasks: {
            goodbye_world: {
              output: "goodbye world!",
            },
          },
        },
        parameters: [],
      },
    ];

    const { click, selectOptions } = userEvent.setup();
    render(<Workflows workflows={workflows} />);

    await click(screen.getByText(/execute workflow/i));

    await waitFor(() => {
      expect(screen.getByText("Result: hello world!")).toBeInTheDocument();
      expect(screen.getByText("Debug:")).toBeInTheDocument();
    });

    await selectOptions(screen.getByRole("combobox"), "goodbye_world");

    expect(screen.queryByText(/result/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/debug/i)).not.toBeInTheDocument();
  });
});
