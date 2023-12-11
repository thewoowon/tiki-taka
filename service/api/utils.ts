export type DomainType = "server" | "msw";

export const getDomain = (type: DomainType) => {
  switch (type) {
    case "server":
      return "https://tikitakachatdata.com";
    case "msw":
      return "/";
    default:
      throw new Error("Invalid type");
  }
};
