export const StatusOptions = [
  { label: "Open", id: "0" },
  { label: "Submitted", id: "1" },
  { label: "Validated", id: "2" },
  { label: "Disputed", id: "3" },
  { label: "Claimed", id: "4" },
  { label: "Expired", id: "5" },
];

export const StatusLabelToEnum = {
  Open: 0,
  Submitted: 1,
  Validated: 2,
  Disputed: 3,
  Claimed: 4,
  Expired: 5,
};

export enum StatusEnum {
  Open = "Open",
  Submitted = "Submitted",
  Expired = "Expired",
  Completed = "Completed",
}

export const StatusColors = {
  "0": "purple",
  "1": "blue",
  "2": "green",
  "3": "red",
  "4": "green",
  "5": "red",
};
