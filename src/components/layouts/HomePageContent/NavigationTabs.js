import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Map from '@material-ui/icons/Map';
import Info from '@material-ui/icons/Info';
import TelegramIcon from '@material-ui/icons/Telegram';
import SearchIcon from '@material-ui/icons/Search';
import styled from "styled-components";
import MapForm from './MapForm';
import QueryCustomizationForm from "./QueryCustomizationForm";
import OverviewForm from "./OverviewForm";
import ResultsForm from "./ResultsForm";
import {makeStyles} from "@material-ui/styles";
import {useForm} from "react-hook-form";

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
    border-bottom: 1px solid #e8e8e8;
`

const StyledTab = styled(Tab)`
    width: inherit;
    min-width: inherit;
`

const useStyles = makeStyles({
    customLabelColor: {
        color: "#989191",
        minWidth: "auto"
    }
});

export default function NavigationTabs() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();

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
                        <Tab icon={<Map />} aria-label="Map" {...a11yProps(0)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                        <StyledTab icon={<Info />} aria-label="Info" {...a11yProps(1)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                        <StyledTab icon={<TelegramIcon />} aria-label="Overview" {...a11yProps(2)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                        <StyledTab icon={<SearchIcon />} aria-label="Results" {...a11yProps(3)} classes={{
                            textColorSecondary: classes.customLabelColor
                        }}/>
                    </StyledTabs>
                </TabContainer>
                <ContentContainer>
                    <TabPanel value={value} index={0}>
                        <MapForm handleTabChange={handleChange} index={0}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <QueryCustomizationForm handleTabChange={handleChange} index={1}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <OverviewForm handleTabChange={handleChange} index={2}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ResultsForm />
                    </TabPanel>
                </ContentContainer>
            </ContainerLayout>
        </React.Fragment>
    );
}
