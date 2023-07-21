export enum StatusEnum {
  Open = "Open",
  Submitted = "Submitted",
  Expired = "Expired",
  Completed = "Completed",
}

export const StatusColors = {
  [StatusEnum.Open]: "purple",
  [StatusEnum.Submitted]: "blue",
  [StatusEnum.Expired]: "red",
  [StatusEnum.Completed]: "green",
};
