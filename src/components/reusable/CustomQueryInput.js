import React from 'react';
import {FormControlLabel, Checkbox, InputAdornment, Typography} from "@material-ui/core";
import CustomAutocomplete from "./CustomAutocomplete";
import styled from "styled-components";
import CustomTextField from "./CustomTextField";

const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
        color: #fff;
    }
`

function CheckboxLabelTypography() {
    return (
        <Typography variant={"caption"} noWrap color={"primary"} align={"center"}>
            Include N/A values?
        </Typography>
    )
}

export default function CustomQueryInput(props) {
    const {label, options, renderOption, getOptionLabel, register, id, name, isSlider, errors, ...other} = props;

    return (
        <React.Fragment>
            <div style={{
                position: "relative"
            }}>
                {!isSlider
                    ? <React.Fragment>
                        <CustomAutocomplete
                            {...other}
                            id={id}
                            name={name}
                            label={label}
                            options={options}
                            renderOption={renderOption}
                            getOptionLabel={getOptionLabel}
                            helperText={"Leave blank for no filtering"}
                            inputRef={register}
                        />
                        {
                            options.includes("N/A") &&
                                <FormControlLabel
                                    control={<StyledCheckbox color={"secondary"} defaultValue={false}
                                                             name={name + "Checkbox"} id={id + 'Checkbox'}
                                                             inputRef={register}/>}
                                    label={<CheckboxLabelTypography/>}
                                    labelPlacement={"top"}
                                    style={{
                                        position: "absolute",
                                        top: "120px",
                                        left: "47px"
                                    }}
                                />
                        }
                    </React.Fragment>
                    : <React.Fragment>
                        <CustomTextField
                            id={id+'From'}
                            name={name+'From'}
                            label={'From...'}
                            type={'number'}
                            helperText={"Leave blank for no filtering"}
                            inputRef={register({ min: 0, max: Number.MAX_SAFE_INTEGER})}
                            InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Typography color={"primary"}>
                                                $
                                            </Typography>
                                        </InputAdornment>,
                                }}
                        />
                        {errors.priceRangeFrom &&
                            <Typography color={"secondary"} variant={"caption"}>
                                Input needs to be a positive number.
                            </Typography>
                        }
                        <CustomTextField
                            id={id+'To'}
                            name={name+'To'}
                            label={'To...'}
                            type={'number'}
                            helperText={"Leave blank for no filtering"}
                            inputRef={register({ min: 0, max: Number.MAX_SAFE_INTEGER})}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Typography color={"primary"}>
                                            $
                                        </Typography>
                                    </InputAdornment>,
                            }}
                        />
                        {errors.priceRangeTo &&
                            <Typography color={"secondary"} variant={"caption"}>
                                Input needs to be a positive number.
                            </Typography>
                        }
                    </React.Fragment>
                }
                </div>
        </React.Fragment>
    )
}
