import React from "react";
import styled from "styled-components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from "@material-ui/styles";

const StyledPanel = styled.div`
    width: 100%;
    height: 100%;
`

/* First implementation was using absolute positioning in order to center all
* sub containers inside the panel which was not always a desired functionality.
* So I changed the approach in order to allow for the subcontainers to position
* themselves inside the panel without compromising the ability to change their
* dimensions/layout. I HATE ABSOLUTE POSITIONING. (...it breaks stuff...)
*/
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <StyledPanel
            role="tabpanel"
            hidden={value !== index}
            id={`horizontal-tabpanel-${index}`}
            aria-labelledby={`horizontal-tab-${index}`}
            {...other}
        >
            {props.children}
        </StyledPanel>
    );
}

function a11yProps(index) {
    return {
        id: `horizontal-tab-${index}`,
        'aria-controls': `horizontal-tabpanel-${index}`,
    };
}

const ContainerLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.7fr;
`

const TabContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    border-bottom: 1px inset #ffffff59;
`

const ContentContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    margin: 15px 0px;
`

const useStyles = makeStyles({
    customLabelColor: {
        color: "#989191",
    }
});

export default function FormTabs(props) {
    const {labels, content} = props;
    const [value, setValue] = React.useState(0);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <ContainerLayout>
                <TabContainer>
                    <Tabs
                        orientation="horizontal"
                        variant="standard"
                        value={value}
                        onChange={handleChange}
                        aria-label="Form Tabs"
                        textColor={'secondary'}
                        indicatorColor={'secondary'}
                    >
                        {labels.map((label, index) => (
                            <Tab key={label.name} label={label.name} {...a11yProps(index)} classes={{
                                textColorSecondary: classes.customLabelColor
                            }}/>
                        ))}
                    </Tabs>
                </TabContainer>
                <ContentContainer>
                    {content.map((comp, index) => (
                        <TabPanel key={index} value={value} index={index}>
                            {comp.item}
                        </TabPanel>
                    ))}
                </ContentContainer>
            </ContainerLayout>
        </React.Fragment>
    )
}
