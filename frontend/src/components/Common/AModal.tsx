import { Box, Button, Divider, Modal, ModalDialog } from "@mui/joy";
import { FC, ReactNode } from "react";
import { Text } from "../Text";
import { FlexCenterCol, FlexCenterRow } from "../css/Flex";

interface Props {
  close: () => void;
  submit?: () => void;
  cancel?: () => void;
  open?: boolean;
  title: string;
  submitText?: string;
  children: ReactNode;
  error?: string;
}

export const AModal: FC<Props> = ({ close, submit, cancel, open, submitText, title, children, error }) => {
  return (
    <Modal open={open !== undefined ? open : true} onClose={close}>
      <ModalDialog size="lg" variant="outlined">
        <Text type="header2">{title}</Text>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ minWidth: "50vw", minHeight: "80px" }}>{children}</Box>
        <Divider sx={{ my: 2 }} />

        {error && (
          <Box sx={{ ...FlexCenterRow, mb: 2 }}>
            <Text type="caption" color="danger">
              {error}
            </Text>
          </Box>
        )}

        <Box sx={{ ...FlexCenterRow, columnGap: 4 }}>
          <Button
            variant="soft"
            onClick={() => {
              cancel && cancel();
              close();
            }}
            sx={{ minWidth: "100px" }}
          >
            Cancel
          </Button>
          <Button
            variant="soft"
            disabled={!!error}
            onClick={() => {
              submit && submit();
              close();
            }}
            sx={{ minWidth: "100px" }}
          >
            {submitText ?? "Submit"}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
