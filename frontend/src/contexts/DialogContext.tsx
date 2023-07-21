import React, { FC, ReactNode, useState } from "react";
import { ADialog } from "../components/Common/ADialog";

interface DialogContextType {
  openDialog: (text: string, type: "yesno" | "ok", submit: () => void) => void;
}

export const DialogContext = React.createContext<DialogContextType>({
  openDialog: () => {},
});

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState<"yesno" | "ok">("ok");
  const [submit, setSubmit] = useState<() => void>(() => () => {});

  const openDialog = (
    text: string,
    type: "yesno" | "ok",
    submit?: () => void
  ) => {
    setOpen(true);
    setText(text);
    setType(type);
    if (submit) setSubmit(() => () => submit());
  };

  const close = () => setOpen(false);

  const value = {
    openDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <ADialog
        open={open}
        close={close}
        type={type}
        submit={submit}
        text={text}
      />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = React.useContext(DialogContext);
  return context;
};
