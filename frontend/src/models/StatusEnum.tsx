export const StatusOptions = [
  { id: 0, label: "Open" },
  { id: 1, label: "Submitted" },
  { id: 2, label: "Expired" },
  { id: 3, label: "Completed" },
];

export const StatusLabelToEnum = {
  Open: 0,
  Submitted: 1,
  Expired: 2,
  Completed: 3,
};

export enum StatusEnum {
  Open = "Open",
  Submitted = "Submitted",
  Expired = "Expired",
  Completed = "Completed",
}

export const StatusColors = {
  0: "purple",
  1: "blue",
  2: "red",
  3: "green",
};
