import React from "react";
import styled, {keyframes} from "styled-components";
import {Typography} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import BiasInput from "./BiasInput";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const BiasTitle = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BiasDetailedCheckbox = styled.div`
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
        color: rgb(152 145 145);
    }
`

const BiasInputsContainer = styled.div`
    flex: 1 0 0px;
    overflow: auto;
    margin: 10px 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`

const StyledList = styled(List)`
    &.MuiList-root {
        // Fancy stuff for chrome users        
        &::-webkit-scrollbar {
            width: 10px;
        }
        
        &::-webkit-scrollbar-track {
            background: #1b1a1d;
        }
        
        &::-webkit-scrollbar-thumb {
            background: #db460ecf;
        }
        
        &::-webkit-scrollbar-thumb:hover {
            background: #db460e;
        }
    }
`

const slideIn = keyframes`
    0% {
       transform: translateX(-100%);
       opacity: 0; 
    }
    
    25% {
        transform: translateX(0%);
    }
    
    100% {
       opacity: 1; 
    }
`

const StyledListItem = styled(({index, ...other}) => <ListItem {...other} />)`
    animation: ${slideIn} 2s;
    animation-delay: ${props => props.index * 100}ms;
    animation-fill-mode: both;
    animation-iteration-count: 1;
`

export default function BiasTemplate(props) {
    const { biasTitle, detailedIdData, detailedLabelData, nonDetailedIdData, nonDetailedLabelData, multiplicandText, register } = props;

    const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    }

    return (
        <React.Fragment>
            <BiasTitle>
                <Typography color={"secondary"} variant={"h6"}>
                    {biasTitle}
                </Typography>
            </BiasTitle>
            <BiasDetailedCheckbox>
                <StyledCheckbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <Typography color={"primary"} variant={"body1"}>
                    Detailed bias?
                </Typography>
            </BiasDetailedCheckbox>
            <BiasInputsContainer>
                <StyledList style={{overflow: "auto"}}>
                    {checked
                        ? detailedLabelData.map((label, index) => (
                                <StyledListItem index={index} key={index}>
                                    {console.log('Render')}
                                    <BiasInput id={detailedIdData[index]} label={label} multiplicandText={multiplicandText} register={register}/>
                                </StyledListItem>
                            ))
                        : <StyledListItem index={0}>
                            {console.log('Render')}
                            <BiasInput id={nonDetailedIdData} label={nonDetailedLabelData} multiplicandText={multiplicandText} register={register}/>
                        </StyledListItem>
                    }
                </StyledList>
            </BiasInputsContainer>
        </React.Fragment>
    )
}
