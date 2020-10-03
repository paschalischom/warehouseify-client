import React from "react";
import styled, {keyframes} from "styled-components";

const spin = keyframes`
    0% {
        top: 16px;
        height: 128px;
    }
        
    50%, 100% {
        top: 48px;
        height: 32px;
    }
`;

const Spinner = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    
    & > div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        animation: ${spin} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    
    & > div:nth-child(1) {
        background: #db460e;
        left: 8px;
        animation-delay: -0.32s;
    }
    
    & > div:nth-child(2) {
        background: #1b1a1d;
        left: 32px;
        animation-delay: -0.18s;
    }
    
    & > div:nth-child(3) {
        background: #db460e;
        left: 56px;
        animation-delay: 0;
    }
`

export default function LoadingSpinner() {
    return (
        <React.Fragment>
            <Spinner>
                <div/>
                <div/>
                <div/>
            </Spinner>
        </React.Fragment>
    )
}
