# Project setup

First ensure the backend is setup and running

Install dependencies:

```
npm install
```

Run the app:

```
npm run dev
```

Run the tests:

```
npm run test
```

# Description

Accord implements most of the requirements outlined in the challenge doc. The backend will execute workflows defined in the declarative language, and the frontend provides a simple interface for running predefined workflows and viewing the results. This would serve as a proof of concept for the declarative language and/or execution engine before building a full production app.

## Step 10

For step 10, I came up with the following list of features needed in the declarative language:

- Full interpolation support for steps (ie reference user input or other tasks in steps)
- Ability to run steps in parallel by passing an array for a particular step.
- And/Or/Not steps
- lessThan, equalTo

Other features would depend mostly on the domain we're building this for (ie maybe we need a step to search a publication database).

I decided to implement the top feature (full interpolation support), because it would allow much more flexibility in structuring the workflow, as well as customizing it based on user input. The `custom_name_classifier` workflow takes advantage of this feature.

# TODO

I skipped some parts of the challenge due to time constraints:

- Step 8, streaming results I skipped completely. Given more time I would implement this over websockets with [fastify-websocket](https://github.com/fastify/fastify-websocket).
- Step 9, making the UI look nice. I had already added a little bit of polish in previous steps, and I tidied things up a little bit at the end, but I didn't make any significant changes in step 9. I think the current state of the UI is reasonable for a small POC like this.

I also did not add as much test coverage as I would normally like to for a production app. I relied mostly on integration tests because they give the best tradeoff between test coverage and time investment. The current tests are enough to give me reasonable confidence in the functionality and allow easy refactoring, but if I had more time I would like to add some unit tests too.

There are also many TODO comments throughout the codebase for small things or refactors that I would like to do given more time.

Of course, if this was a production app there would be MANY more features required. A few of the top ones:

- UI for users to define their own workflows
- Ability to save workflows (we'll need a database)
- Use saved workflows as building blocks of new workflows
- Overhaul task execution architecture to handle tasks that can run for hours. Each task and step should run independently, and should handle retries due to network errors.
