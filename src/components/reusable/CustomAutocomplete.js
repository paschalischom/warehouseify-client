import React from 'react';
import styled from "styled-components";
import { TextField, Paper} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const PaperComp = styled(Paper)`
    background-color: #606060;
    color: white;
    border: 2px solid #909090;
    border-radius: 8px;
`

/* The label's z-index is set to 0 as to avoid a blurry effect caused by the animated change.
 * It is discussed here: https://github.com/mui-org/material-ui/pull/19547 but even
 * though it's acknowledged, it is not yet fixed as of August 2020.
 */
const styles = theme => ({
    input: {
        color: "white",
    },
    label: {
        color: 'white',
        zIndex: '1',
        fontSize: '16px',
    },
    disabledLabel: {
        color: '#bd0909 !important'
    },
    inputRoot: {
        color: "white",
        background: "#1b1a1d",
        borderRadius: "25px",
        padding: '0px 40px 18px 40px',
        border: '2px solid white',
        maxHeight: '200px',
        overflowY: 'auto'
    },
    popupIndicator: {
        color: 'white'
    },
    clearIndicator: {
        color: 'white'
    },
    textInputRoot: {
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
        color: theme.palette.primary.main,
        fontSize: '0.67rem'
    }
});

function CustomAutocomplete({className, ...other}) {
    const { classes, id, name, label, helperText, options, renderOption, getOptionLabel, inputRef, ...rest} = other;

    return (
        <React.Fragment>
            <Autocomplete
                id={id}
                options={options}
                className={`${classes.root} ${classes.inputRoot} ${className}`}
                classes={{
                    popupIndicator: classes.popupIndicator,
                    clearIndicator: classes.clearIndicator
                }}
                style={{width: 150}}
                autoHighlight
                getOptionLabel={getOptionLabel}
                renderOption={renderOption}
                openOnFocus={true}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label={label}
                        name={name}
                        color={"secondary"}
                        margin={"normal"}
                        inputRef={inputRef}
                        helperText={helperText}
                        InputLabelProps={{
                            ...params.InputLabelProps,
                            classes: {
                                root: classes.label,
                                disabled: classes.disabledLabel
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            classes: {
                                underline: classes.underline,
                                input: classes.textInputRoot
                            }
                        }}
                        FormHelperTextProps={{
                            classes: {
                                root: classes.helperText
                            }
                        }}
                    />
                )}
                PaperComponent={PaperComp}
            />
        </React.Fragment>
    )
}

CustomAutocomplete.propTypes = {
    id: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    renderOption: PropTypes.func.isRequired,
    getOptionLabel: PropTypes.func.isRequired
}

export default withStyles(styles)(CustomAutocomplete);
