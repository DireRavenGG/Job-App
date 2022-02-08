import { Box, Stack, Typography } from "@mui/material";

const CardInfo = ({ title, datePosted }) => {
  return (
    <Box bgcolor="#fefefe" justifyContent="center" height="80vh" width="60vw">
      <Stack direction="row" alignItems="center" m="8px">
        <Typography variant="h4" sx={{ p: 1 }}>
          {title}
        </Typography>
        <Typography variant="subtitle" sx={{ p: 1 }}>
          ({datePosted})
        </Typography>
      </Stack>
      <Box sx={{ p: 1 }}>
        <Typography variant="h6">More Info</Typography>
        <Typography variant="body2">
          asdfasfd asdfasdf <br /> asdfasdfa adsfasdf
        </Typography>
      </Box>
    </Box>
  );
};

export default CardInfo;
