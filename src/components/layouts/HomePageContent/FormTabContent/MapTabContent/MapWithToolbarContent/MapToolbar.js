import React from 'react';
import styled from "styled-components";
import {Breadcrumbs, Typography, Popper, Button, Fade, ClickAwayListener, Tabs, Tooltip} from "@material-ui/core";
import {AddressInputForm, ToolbarPopover} from './ToolbarContent';
import ExploreIcon from "@material-ui/icons/Explore";
import PlaceIcon from "@material-ui/icons/Place";
import SearchIcon from '@material-ui/icons/Search';
import Tab from "@material-ui/core/Tab";
import { connect } from 'react-redux';
import {makeStyles} from "@material-ui/styles";

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const StyledToolbar = styled.div`
    position: relative;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: #202020;
    align-items: center;
    display: flex;
`

const StyledBreadcrumbs = styled(Breadcrumbs)`
    flex: 1;
    
    & > ol {
        flex-wrap: nowrap;
    }
`

const StyledToolbarTabs = styled(Tabs)`
    flex: 1;
    
    & > div > div {
        justify-content: flex-end;
    }
`

const StyledTab = styled(Tab)`
    width: inherit;
    min-width: inherit;
    color: #989191;
`

const ToolbarHeader = styled.div`
    position: absolute;
    left: 0;
    top: -24px;
    width: 20%;
    height: 24px;
    background-color: #989191;
    -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
    -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
    box-shadow:0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
`

const SearchBar = styled.div`
    position: absolute;
    right: 0;
    top: -50px;
    width: 35%;
    height: 0px;
    margin-top: 50px;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    overflow: hidden;
    
    ${props => props.isOpen && `
        height: 50px;
        margin-top: 0px;
    `
    }
}
`

const useStyles = makeStyles({
    customLabelColor: {
        color: "#989191",
        minWidth: "auto"
    }
});

function MapToolbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [stateSelection, setStateSelection] = React.useState('All States');
    const [toolbarMode, setToolbarMode] = React.useState(0);
    const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);
    const { states, toggleDrawMarkers, onToolbarStateChange } = props;
    const classes = useStyles();


    const handleButtonClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const handleStateSelection = (newStateIndex) => {
        setStateSelection(states[newStateIndex]['name'] + ', ' + states[newStateIndex]['abbreviation']);
        onToolbarStateChange(newStateIndex);
    };

    const handleChange = (event, newMode) => {
        setToolbarMode(newMode);

        if (newMode === 1) {
            toggleDrawMarkers(true);
        } else {
            toggleDrawMarkers(false);
        }

        if (newMode === 2) {
            setIsSearchBarOpen(true);
        } else if (isSearchBarOpen) {
            setIsSearchBarOpen(false);
        }
    };

    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <StyledToolbar>
                <StyledBreadcrumbs aria-label={'breadcrumb'}
                                   separator={
                                       <Typography style={{ color: '#2e2e31'}}>
                                           |
                                       </Typography>
                                    }
                >
                    <Typography color="primary" noWrap variant={'subtitle1'} style={{
                        padding: '15px',
                    }}>
                        Map Overview
                    </Typography>
                    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
                        <Tooltip title={"Focus state"} placement={"top"}>
                            <Button onClick={handleButtonClick} color={"secondary"}>{stateSelection}</Button>
                        </Tooltip>
                    </ClickAwayListener>
                    <Popper open={open} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps}>
                                <ToolbarPopover onChange={handleStateSelection} popoverData={states}/>
                            </Fade>
                        )}
                    </Popper>
                </StyledBreadcrumbs>
                <StyledToolbarTabs
                    orientation="horizontal"
                    variant="standard"
                    value={toolbarMode}
                    onChange={handleChange}
                    aria-label="Form Tabs"
                    textColor={"secondary"}
                >
                    <Tooltip title={"Explore Map"} placement={"top"}>
                        <StyledTab icon={<ExploreIcon fontSize={'large'} />} aria-label="Explore" {...a11yProps(0)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                    </Tooltip>
                    <Tooltip title={"Place Pin"} placement={"top"}>
                        <StyledTab icon={<PlaceIcon fontSize={'large'} />} aria-label="Place" {...a11yProps(1)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                    </Tooltip>
                    <Tooltip title={"Search"} placement={"top"}>
                        <StyledTab icon={<SearchIcon fontSize={'large'} />} aria-label="Public" {...a11yProps(2)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                    </Tooltip>
                </StyledToolbarTabs>
                <ToolbarHeader>
                    <Typography align={"center"} noWrap variant={"subtitle1"} style={{
                        color: '#1b1a1d',
                    }}>
                        Toolbar
                    </Typography>
                </ToolbarHeader>
                <SearchBar isOpen={isSearchBarOpen}>
                    <AddressInputForm onAddressInput={onToolbarStateChange}/>
                </SearchBar>
            </StyledToolbar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        states: state.ui.states
    }
}

export default connect(mapStateToProps)(MapToolbar)
