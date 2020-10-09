import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const StyledTextField = styled(TextField)`
    &.MuiOutlinedInput-root .MuiTextField-root {
        -webkit-appearance: none;
        margin: 0;
        background: red;
    }
`

const styles = theme => ({
    inputRoot: {
        color: "#909090",

        '&:focus': {
            color: theme.palette.secondary.main,
        },

        '&::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: '0'
        },
        '&::-webkit-inner-spin-button': {
            appearance: 'none',
            margin: '0'
        }
    },
    root: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `#909090`,
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
        }
    }
});

function CustomBiasNumberField(props) {
    const { classes, register, ...other } = props;

    return (
        <React.Fragment>
            <StyledTextField
                {...other}
                variant={"outlined"}
                fullWidth
                color={"secondary"}
                margin={"dense"}
                type={'number'}
                InputProps={{
                    classes: {
                        root: classes.root,
                        input: classes.inputRoot
                    }
                }}
                inputProps={{
                    style: {
                        textAlign: "center"
                    }
                }}
                inputRef={register}
            />
        </React.Fragment>
    )
}

export default withStyles(styles)(CustomBiasNumberField);
