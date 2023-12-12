import { assign, createMachine } from "xstate";
interface Context {}

type Events = { type: "CLOSE_MESSAGE_BOX" };

type Services = {
  getClovaResponse: {
    data: { firstChunk: string };
  };
};

const initialContext: Context = {
  stageNumber: 0,
} as const;

const tikitakaStateMachine = createMachine(
  {
    id: "tikitaka-state",
    initial: "idle",
    context: initialContext,

    states: {
      idle: {
        entry: ["resetAll"],
      },
      request_clova: {
        invoke: {
          src: "getClovaResponse",
          onDone: {
            target: "response_message_box",
          },
          onError: {
            target: "error_message_box",
          },
        },
      },
      response_message_box: {
        tags: "showResponseMessages",
        on: {
          CLOSE_MESSAGE_BOX: "idle",
        },
      },
      error_message_box: {
        on: {
          CLOSE_MESSAGE_BOX: "idle",
        },
      },
    },
  },
  {
    actions: {
      resetAll: assign({ ...initialContext }),
    },
  }
);

export default tikitakaStateMachine;
