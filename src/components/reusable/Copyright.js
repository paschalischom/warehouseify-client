import React from "react";
import styled from "styled-components";
import CopyrightIcon from '@material-ui/icons/Copyright';
import {Typography} from "@material-ui/core";

const CopyrightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Copyright(props) {
    const { text } = props;

    return (
        <React.Fragment>
            <CopyrightContainer>
                <CopyrightIcon fontSize={"small"} color={"secondary"} style={{
                    marginRight: '8px',
                    fontSize: '1rem',
                }}/>
                <Typography color={"primary"} variant={"caption"} style={{
                    fontSize: '10px'
                }}>
                    {text}
                </Typography>
            </CopyrightContainer>
        </React.Fragment>
    )
}
