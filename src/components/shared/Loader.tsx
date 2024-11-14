import React from "react";

// material-ui
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// ==============================|| LOADER ||============================== //

export default function Loader(): React.ReactElement {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1301,
        width: "100%",
      }}
    >
      <LinearProgress color="primary" />
    </Box>
  );
}