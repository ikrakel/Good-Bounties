import { Divider, Typography, TypographyProps } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { FC } from "react";

interface Props extends TypographyProps {
  children: React.ReactNode;
  type?: "header" | "header2" | "body" | "caption" | "light";
  mb?: number;
}

const HeaderSx = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: "2rem",
  letterSpacing: "0.15rem",
  textTransform: "uppercase",
  my: 1,
};

const Header2Sx = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  lineHeight: "1.75rem",
  letterSpacing: "0.15rem",
  textTransform: "uppercase",
  my: 1,
};

const BodySx = {
  fontSize: "0.9rem",
  fontWeight: "normal",
  letterSpacing: "0.1rem",
};

const CaptionSx = {
  fontWeight: "normal",
  lineHeight: "1rem",
  letterSpacing: "0.15rem",
  textTransform: "uppercase",
  fontSize: "xs",
};

const LightSx = {
  fontSize: "0.75rem",
  fontWeight: "normal",
  color: "grey",
};

const sxMap = {
  header: HeaderSx,
  header2: Header2Sx,
  body: BodySx,
  caption: CaptionSx,
  light: LightSx,
};

export const Text: FC<Props> = ({ children, type = "body", mb, ...rest }) => {
  const { sx: sxProps, ...props } = rest;
  let sx: SxProps = { ...sxMap[type] };
  if (sxProps) sx = { ...sx, ...sxProps };

  return (
    <>
      <Typography sx={{ ...sx, mb: type !== "header" ? mb : undefined }} {...props}>
        {children}
      </Typography>
    </>
  );
};
