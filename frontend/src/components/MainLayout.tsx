import { Box, useTheme } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";
import { Flex } from "./Common/Flex";
import { AModal } from "./Common/AModal";
import { useState } from "react";

export const MainLayout = () => {
  const theme = useTheme();

  return (
    <Flex
      y
      sx={{
        backgroundColor: theme.palette.background.body,
        display: "flex",
        width: "100%",
      }}
    >
      <Topbar />
      <Box
        sx={{
          minHeight: "100vh",
          overflowY: "hidden",
          width: "100%",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};
