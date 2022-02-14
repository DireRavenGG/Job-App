import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

const ContainerHeader: React.FC<Props> = ({ title }) => {
  return (
    <Box>
      <Typography style={{ color: "#fefefe" }} variant="h6">
        {title}
      </Typography>
    </Box>
  );
};

export default ContainerHeader;
