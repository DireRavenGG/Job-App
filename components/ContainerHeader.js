import { Box, Container, Typography } from "@mui/material";

const ContainerHeader = ({ title }) => {
  return (
    <Box>
      <Typography style={{ color: "#fefefe" }} variant="h6">
        {title}
      </Typography>
    </Box>
  );
};

export default ContainerHeader;
