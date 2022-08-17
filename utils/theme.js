import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4ECDC4",
    },
    secondary: {
      light: "#383e44",
      main: "#292f36",
    },
    error: {
      main: "#FF6B6B",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: {
          "& label": {
            color: "#c7cdd1",
          },

          "& .MuiOutlinedInput-input": {
            color: "#c7cdd1",
          },
          "& MuiInputAdornment-root": {
            backgroundColor: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#383e44",
            },
            "&:hover fieldset": {
              borderColor: "#454d54",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4ECDC4",
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      defaultProps: {
        sx: {
          "& .MuiFormControlLabel-label": {
            color: "#c7cdd1",
          },
          "& .MuiCheckbox-root": {
            color: "#383e44",
          },
          "& .Mui-checked": {
            color: "#4ECDC4",
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          color: "#c7cdd1",
          "& .MuiSelect-icon": {
            color: "#c7cdd1",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#383e44",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#454d54",
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          color: "rgba(199,205,209,.45)",
        },
      },
    },
    MuiInputAdornment: {
      defaultProps: {
        sx: {
          "& .MuiSvgIcon-root": {
            fill: "#c7cdd1",
          },
        },
      },
    },
  },
});

export default theme;
