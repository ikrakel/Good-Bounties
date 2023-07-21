import { Box, Button, Divider, Modal, ModalDialog } from "@mui/joy";
import { FC } from "react";
import { Text } from "../Text";
import { Flex } from "./Flex";

interface Props {
  text: string;
  type: "yesno" | "ok";
  open: boolean;
  close: () => void;
  submit: () => void;
}

export const ADialog: FC<Props> = ({ text, type, open, close, submit }) => {
  return (
    <Modal open={open} onClose={close}>
      <ModalDialog>
        <Text type="header2">Confirmation</Text>
        <Divider sx={{ my: 2 }} />
        <Flex y yc sx={{ minWidth: "50vw", minHeight: "80px" }}>
          <Text>{text}</Text>
        </Flex>
        <Divider sx={{ my: 2 }} />
        {type === "yesno" && (
          <Flex x xc gap={4}>
            <Button color="danger" onClick={close} sx={{ minWidth: "100px" }}>
              No
            </Button>
            <Button
              onClick={() => {
                submit();
                close();
              }}
              sx={{ minWidth: "100px" }}
            >
              Yes
            </Button>
          </Flex>
        )}
      </ModalDialog>
    </Modal>
  );
};
