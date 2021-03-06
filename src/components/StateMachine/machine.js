import { Machine } from 'xstate'
export const fetchMachine = Machine({
  id: "stmachine",
  initial: "New",
  states: {
    New: {
      on: {
        start: {
          target: "wip"
        },
        cancel: {
          target: "canceled"
        }
      }
    },
    wip: {
      on: {
        complete: {
          target: "completed"
        },
        holding: {
          target: "hold"
        },
        cancel: {
          target: "canceled"
        }
      }
    },
    completed: {},
    hold: {
      on: {
        resume: {
          target: "wip"
        }
      }
    },
    canceled: {}
  }
});
