import React from "react";
import styled from "styled-components";
import {Typography, Icon} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

const SocialMediaWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const StyledIcon = styled(Icon)`
    margin: 0px 5px;
`

export default function SocialMedia(props) {
    const { style }  = props;
    return (
        <React.Fragment>
            <SocialMediaWrapper style={style}>
                <Typography color={"primary"} variant={"caption"} style={{
                    marginRight: '35px',
                }}>
                    Follow us on:
                </Typography>
                <StyledIcon>
                    <GitHubIcon color={"primary"} fontSize={"small"} />
                </StyledIcon>
                <StyledIcon>
                    <TwitterIcon color={"primary"} fontSize={"small"} />
                </StyledIcon>
                <StyledIcon>
                    <LinkedInIcon color={"primary"} fontSize={"small"} />
                </StyledIcon>
                <StyledIcon>
                    <FacebookIcon color={"primary"} fontSize={"small"} />
                </StyledIcon>
            </SocialMediaWrapper>

        </React.Fragment>
    )
}
