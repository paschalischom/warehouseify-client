import React from 'react';
import styled from "styled-components";
import {Toolbar, Tooltip, IconButton, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


const StyledToolbar = styled(({active, ...props}) => <Toolbar {...props} />)`
    ${({ active }) => active && `
        background-color: #db460e;
    `}
`

const ToolbarTitle = styled(({active, ...props}) => <Typography {...props} />)`
    flex: 1 1 100%;
    
    ${({active}) => active ?
        `
         color: black;
         &.MuiTypography-root {
            font-size: 24px;
         }
        ` : `
         color: #fff;
         &.MuiTypography-root {
            font-size: 16px;
         }
        `
    }
`

export default function TableToolbar(props) {
    const { selectedRowsNum, ...callbackProps } = props;
    const { onDeleteRequest } = callbackProps;
    const activeConditional = selectedRowsNum > 0;

    const handleDeleteButton = () => {
        onDeleteRequest();
    }

    return (
        <React.Fragment>
            <StyledToolbar active={activeConditional}>
                <ToolbarTitle active={activeConditional} noWrap>
                    {activeConditional ? selectedRowsNum + ' PoI Selected' : 'Points of Interest'}
                </ToolbarTitle>
                {activeConditional ?
                    <Tooltip title={'Delete'}>
                        <IconButton aria-label={'delete'} color={"inherit"} onClick={handleDeleteButton}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title={'Filter'}>
                        <IconButton aria-label={'filter'} color={"inherit"}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                }
            </StyledToolbar>
        </React.Fragment>
    )
}
