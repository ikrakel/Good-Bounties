import { extendTheme as extendJoyTheme } from "@mui/joy/styles";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

const { unstable_sxConfig: joySxConfig, ...joyTheme } = extendJoyTheme({
  colorSchemes: {
    // dark: {
    //   palette: {
    //     background: {
    //       body: "#0a1929",
    //       level1: "#001e3c",
    //       surface: "#142434",
    //     },
    //     neutral: {
    //       solidBg: "#001e3c",
    //       solidActiveBg: "#132f4c",
    //       solidHoverBg: "#132f4c",
    //       plainHoverBg: "#132f4c",
    //       solidBorder: "#143559",
    //       softBorder: "#143559",
    //       plainBorder: "#143559",
    //       outlinedBorder: "#143559",
    //     },
    //     divider: "#143559",
    //     common: {
    //       white: "#b2bac2",
    //     },
    //     text: {
    //       primary: "#b2bac2",
    //     },
    //   },
    // },
    // light: {
    //   palette: {
    //     background: {
    //       surface: "#142434",
    //     },
    //   },
    // },
  },
  fontSize: {
    lg: "0.9rem",
    md: "0.9rem",
  },
  typography: {
    display1: {
      letterSpacing: "0.02rem",
    },
    body1: {
      letterSpacing: "0.02rem",
    },
  },
  components: {
    JoyTabs: {
      defaultProps: {
        variant: "plain",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({}),
      },
    },
    JoyTabPanel: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          marginTop: theme.spacing(2),
        }),
      },
    },
    JoyTabList: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          backgroundColor: theme.palette.background.surface,
        }),
      },
    },
    JoyTab: {
      defaultProps: {},
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          backgroundColor: theme.palette.background.body,
          border: ownerState.selected
            ? `2px solid ${theme.palette.primary[500]}`
            : `1px solid ${theme.palette.neutral.outlinedBorder}`,
        }),
      },
    },
    JoySelect: {
      defaultProps: {
        variant: "solid",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          color: theme.palette.common.white,
          letterSpacing: theme.typography.body1.letterSpacing,
          border: `1px solid ${theme.palette.neutral.outlinedBorder}`,
        }),
      },
    },
    JoyIconButton: {
      defaultProps: {
        size: "sm",
        variant: "plain",
      },
    },
    JoyAutocomplete: {
      defaultProps: {
        variant: "solid",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          letterSpacing: theme.typography.body1.letterSpacing,
        }),
        input: ({ ownerState, theme }) => ({
          letterSpacing: theme.typography.body1.letterSpacing,
        }),
        listbox: ({ ownerState, theme }) => ({
          letterSpacing: theme.typography.body1.letterSpacing,
        }),
      },
    },
    JoyList: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    JoyInput: {
      defaultProps: {
        variant: "solid",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          border: `1px solid ${theme.palette.neutral.outlinedBorder}`,
        }),
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontSize: "xs",
          letterSpacing: theme.typography.body1.letterSpacing,
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {},
    },
    JoyDivider: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }),
      },
    },
  },
});

const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using
  // `CssVarsProvider` from Joy UI.
  cssVarPrefix: "joy",
  colorSchemes: {
    dark: {
      palette: {
        FilledInput: {
          bg: joyTheme.colorSchemes.dark.palette.neutral.solidBg,
          hoverBg: joyTheme.colorSchemes.dark.palette.neutral.solidHoverBg,
          disabledBg: joyTheme.colorSchemes.dark.palette.neutral.solidDisabledBg,
        },
        TableCell: {
          border: "#143559",
        },
      },
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({}),
      },
    },
  },
});

export const theme = {
  ...muiTheme,
  ...joyTheme,
  colorSchemes: deepmerge(muiTheme.colorSchemes, joyTheme.colorSchemes),
  //@ts-ignore
  components: deepmerge(muiTheme.components, joyTheme.components),
  typography: {
    ...muiTheme.typography,
    ...joyTheme.typography,
  },
} as unknown as ReturnType<typeof extendJoyTheme>;

theme.generateCssVars = (colorScheme) => ({
  css: {
    ...muiTheme.generateCssVars(colorScheme).css,
    ...joyTheme.generateCssVars(colorScheme).css,
  },
  //@ts-ignore
  vars: deepmerge(muiTheme.generateCssVars(colorScheme).vars, joyTheme.generateCssVars(colorScheme).vars),
});

theme.unstable_sxConfig = {
  ...muiSxConfig,
  ...joySxConfig,
};
