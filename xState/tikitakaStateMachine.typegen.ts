// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getClovaResponse: "done.invoke.tikitaka-state.request_clova:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "getClovaResponse";
  };
  eventsCausingActions: {
    resetAll: "CLOSE_MESSAGE_BOX" | "xstate.init";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    getClovaResponse: never;
  };
  matchesStates:
    | "error_message_box"
    | "idle"
    | "request_clova"
    | "response_message_box";
  tags: "showResponseMessages";
}
