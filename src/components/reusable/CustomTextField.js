import React from 'react';
import {TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    label: {
        color: 'white',
        zIndex: '0',
        fontSize: '16px',
    },
    disabledLabel: {
        color: '#bd0909 !important'
    },
    inputRoot: {
        color: "#909090",

        '&:focus': {
            color: theme.palette.secondary.main,
        }
    },
    underline: {
        '&::before':{
            borderBottom: `1px solid #909090`,
        },

        '&:hover:before': {
            borderBottom: `2px solid #fff !important`,
        },
    },
    helperText: {
        color: theme.palette.primary.main
    }
});

function CustomTextField(props) {
    const { classes, margin, InputProps, ...other } = props;

    return (
        <React.Fragment>
            <TextField
                {...other}
                variant={'standard'}
                fullWidth
                color={'secondary'}
                margin={margin ? margin : "normal"} // Override default style of "normal"
                InputLabelProps={{
                    classes: {
                        root: classes.label,
                        disabled: classes.disabledLabel
                    }
                }}
                InputProps={{
                    classes: {
                        underline: classes.underline,
                        input: classes.inputRoot
                    },
                    ...InputProps
                }}
                FormHelperTextProps={{
                    classes: {
                        root: classes.helperText
                    }
                }}
                autoComplete={"off"}
            />
        </React.Fragment>
    )
}

export default withStyles(styles)(CustomTextField);
