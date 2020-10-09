import React from "react";
import styled from "styled-components";
import {ReactComponent as MultiplyIcon} from "../../icons/multiply_icon.svg";
import CustomBiasNumberField from "./CustomBiasNumberField";
import {SvgIcon, Typography} from "@material-ui/core";

const BiasInputContainer = styled.div`
    height: 40px;
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BiasInputLabel = styled.div`
    height: 10px;
    margin-bottom: 5px;
`

const StyledLabelTypography = styled(Typography)`
    text-decoration: underline;
    text-decoration-color: #db460e;
`

const BiasInputBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StyledSvgIcon = styled(({...props}) => <SvgIcon viewBox={"0 0 35 35"} {...props} />)`
    transform: scale(1.5) translateY(3px);
    margin: 0px 10px;
    color: #909090;
`

const StyledMultiplicandTypography = styled(({...props}) => <Typography {...props} />)`
    transform: translateY(3px);
    
    &.MuiTypography-root {
        margin: 0px 10px;
        color: #909090;
        font-style: italic;
    }
`

const BiasInputWrapper = styled.div`
    width: 60px;
    margin-left: 5px;
`

export default function BiasInput(props) {
    const { className, id, label, multiplicandText, register } = props;
    const inputRef = React.useRef(null);

    return (
        <BiasInputContainer className={className}>
            <BiasInputLabel>
                <StyledLabelTypography variant={"caption"} color={"primary"} noWrap align={"center"} style={{
                    width: '200px',
                    display: "inline-block"
                }}>
                    {label}
                </StyledLabelTypography>
            </BiasInputLabel>
            <BiasInputBody>
                <StyledMultiplicandTypography color={"primary"} variant={"subtitle1"}>
                    {multiplicandText}
                </StyledMultiplicandTypography>
                <StyledSvgIcon>
                    <MultiplyIcon />
                </StyledSvgIcon>
                <BiasInputWrapper>
                    <CustomBiasNumberField
                        id={id}
                        name={id}
                        defaultValue={label === 'N/A' ? 0 : 1}
                        register={register}
                    />
                </BiasInputWrapper>
            </BiasInputBody>
        </BiasInputContainer>
    )
}
