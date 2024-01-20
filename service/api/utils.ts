export type DomainType = "server" | "msw";

export const getDomain = (type: DomainType) => {
  switch (type) {
    case "server":
      return "https://api.tikitaka.chat";
    case "msw":
      return "/";
    default:
      throw new Error("Invalid type");
  }
};
