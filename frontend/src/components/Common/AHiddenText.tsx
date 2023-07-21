import { Visibility } from "@mui/icons-material";
import { FC, useState } from "react";
import { Text } from "../Text";
import { Clickable } from "../css/Button";

export const AHiddenText: FC<{ text: string }> = ({ text }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible ? (
        <Text
          sx={{ ...Clickable }}
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        >
          {text}
        </Text>
      ) : (
        <Visibility
          sx={{ ...Clickable }}
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}
        />
      )}
    </>
  );
};
