import React from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { connect } from "react-redux";
import { deletePoi } from "../../store/actions/userDataActions";
import EditDialog from "./EditDialog";

const StyledButtonGroup = styled(ButtonGroup)`
    height: 20px;
    width: 100px;
`

const options = ['Edit', 'Delete'];

function AdvancedSelect(props) {
    const [open, setOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const { poiUID, deletePoi } = props;

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    }

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
        if (selectedIndex === 0) {
            // Edit
            setEditDialogOpen(true);
        }
        else if (selectedIndex === 1) {
            // Delete
            deletePoi(poiUID);
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <StyledButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick} style={{backgroundColor: 'rgb(220 109 67 / 75%)'}}>{
                    options[selectedIndex]}
                </Button>
                <Button
                    color="secondary"
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select operation"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </StyledButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
                    style={{zIndex: 3}}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <EditDialog editDialogOpen={editDialogOpen} handleEditDialogClose={handleEditDialogClose} poiUID={poiUID}/>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePoi: (poiUID) => dispatch(deletePoi(poiUID))
    }
}

export default connect(null, mapDispatchToProps)(AdvancedSelect)
