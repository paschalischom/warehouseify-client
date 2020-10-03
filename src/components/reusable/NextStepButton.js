import React from 'react';
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)`
    &.MuiButton-root {
        border: 2px solid #bdbdbd;
    }
`

export default function NextStepButton(props) {
    const { onTabChangeRequest } = props;

    const handleClick = () => {
        onTabChangeRequest();
    }

    return (
        <React.Fragment>
            <StyledButton variant={"contained"} color={"secondary"} onClick={handleClick}>
                NEXT STEP >>>
            </StyledButton>
        </React.Fragment>
    )
}
