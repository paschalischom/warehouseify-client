import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from "styled-components";
import MapForm from './MapForm';
import QueryFilteringForm from "./QueryFilteringForm";
import QueryRankingForm from "./QueryRankingForm";
import OverviewForm from "./OverviewForm";
import ResultsForm from "./ResultsForm";
import {makeStyles} from "@material-ui/styles";
import { ReactComponent as MapIcon } from "../../../icons/map_icon.svg";
import { ReactComponent as FilterIcon } from "../../../icons/filter_icon.svg";
import { ReactComponent as RankingIcon } from "../../../icons/ranking_icon.svg";
import { ReactComponent as QueryIcon } from "../../../icons/query_icon.svg";
import { ReactComponent as ResultsIcon } from "../../../icons/results_icon.svg";
import {SvgIcon} from "@material-ui/core";

const TabPanelContainer = styled.div`
    height: 100%;
    margin: 0px 35px;
`

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <TabPanelContainer
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {props.children}
        </TabPanelContainer>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ContainerLayout = styled.div`
    flex-grow: 1;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    background-color: #303033;
`

const TabContainer = styled.div`
    width: 60px;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
`

const ContentContainer = styled.div`
    width: 100%;
    background-color: #1b1a1d;
    min-width: 1500px;
    box-sizing: border-box;
`

const StyledTabs = styled(Tabs)`
    &.MuiTabs-root {
        margin-top: 10px;
        height: 50%;
    }
    
    & .MuiTabs-flexContainer {
        height: 100%;
        justify-content: space-between;
    }
`

const StyledTab = styled(Tab)`
    width: inherit;
    
    &.MuiTab-root {
        min-width: 0px;
    }
    
    &.MuiTab-textColorSecondary {
        color: #989191;
    }
`

const StyledSvgIcon = styled(({...props}) => <SvgIcon viewBox={"0 0 35 35"} {...props} />)`
    transform: scale(1.5);
`

export default function NavigationTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <ContainerLayout>
                <TabContainer>
                    <StyledTabs
                        orientation="vertical"
                        variant="standard"
                        value={value}
                        onChange={handleChange}
                        aria-label="Form Tabs"
                        textColor={"secondary"}
                    >
                        <StyledTab icon={
                            <StyledSvgIcon>
                                <MapIcon />
                            </StyledSvgIcon>
                        } aria-label="Map Form" {...a11yProps(0)} />
                        <StyledTab icon={
                            <StyledSvgIcon>
                                <FilterIcon />
                            </StyledSvgIcon>
                        } aria-label="Filtering Form" {...a11yProps(1)} />
                        <StyledTab icon={
                            <StyledSvgIcon>
                                <RankingIcon />
                            </StyledSvgIcon>
                        } aria-label="Ranking Form" {...a11yProps(2)} />
                        <StyledTab icon={
                            <StyledSvgIcon>
                                <QueryIcon />
                            </StyledSvgIcon>
                        } aria-label="Overview Form" {...a11yProps(3)} />
                        <StyledTab icon={
                            <StyledSvgIcon>
                                <ResultsIcon />
                            </StyledSvgIcon>
                        } aria-label="Results" {...a11yProps(4)} />
                    </StyledTabs>
                </TabContainer>
                <ContentContainer>
                    <TabPanel value={value} index={0}>
                        <MapForm handleTabChange={handleChange} index={0}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <QueryFilteringForm handleTabChange={handleChange} index={1}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <QueryRankingForm handleTabChange={handleChange} index={2}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <OverviewForm handleTabChange={handleChange} index={3}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ResultsForm />
                    </TabPanel>
                </ContentContainer>
            </ContainerLayout>
        </React.Fragment>
    );
}
