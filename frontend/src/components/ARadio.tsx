import * as React from "react";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { Text } from "./Text";
import { FlexRow } from "./css/Flex";

interface Props {
  options: { id: number; label: string }[];
  onChange: (value: number) => void;
  value: number;
}

export default function ARadio({ options, onChange, value }: Props) {
  return (
    <Box>
      <RadioGroup size="sm" sx={{ gap: 1.5, ...FlexRow }}>
        {options.map((item) => (
          <Sheet
            key={item.id}
            sx={{
              p: 1,
              borderRadius: "md",
              boxShadow: "sm",
              bgcolor: "background.body",
              minWidth: "100px",
              textAlign: "center",
            }}
          >
            <Radio
              label={item.label}
              overlay
              disableIcon
              value={item}
              checked={item.id === value}
              onChange={() => onChange(item.id)}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: "lg",
                    color: checked ? "text.primary" : "text.secondary",
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      "--variant-borderWidth": "2px",
                      "&&": {
                        // && to increase the specificity to win the base :hover styles
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
}
