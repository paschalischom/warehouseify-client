import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import CustomQueryInput from "../../../reusable/CustomQueryInput";
import {
    StepButton,
    IconButton,
    StepLabel,
    Step,
    Stepper,
    Typography,
    Paper, Button
} from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from "react-redux";
import {updateQueryInputs} from "../../../../store/actions/userTempDataActions";

const OuterWrapper = styled.div`
    height: 100%;
    background-color: #2e2e31;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.3fr 1.7fr;
    gap: 75px 1px;
`

const QueryStepper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    margin: 25px 10px 0px 10px;
`

const StyledStepper = styled(Stepper)`
    &.MuiPaper-root {
        background-color: #202020;
    }
`

const QueryForm = styled.form`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    height: 475px;
    margin: 0px 10px 0px 10px;
    background-color: #202020;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`

const QueryContainer = styled(({isActive, ...props}) => <Paper {...props} />)`
    flex: 1;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.6fr 2fr 0.4fr;
    
    &.MuiPaper-root {
        background-color: #202020;
        transition: border 0.3s ease-in-out, opacity 0.3s ease-in-out, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        -webkit-transition: border 0.3s ease-in-out, opacity 0.3s ease-in-out, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
    
    ${props => props.isActive
    ? `
        border: 1px solid #db460e;
        opacity: 1;
        cursor: default;
        &>div {
            pointer-events: all;
        }
    `
    : `
        border: 1px solid transparent;
        opacity: 0.3;
        cursor: pointer;
        &>div {
            pointer-events: none;
        }
    `
    }
`

const QueryTitle = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    margin: 25px 25px 0px 25px;
`

const QueryDescription = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
`

const QueryBody = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const QueryFooter = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #db460e3d;
`

const StyledSubmitButton = styled(Button)`
    &.MuiButton-root {
        position: absolute;
        right: 0;
        top: -12%;
    }
`

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'white',

        '&.MuiStepIcon-active': {
            color: "#ffeb00"
        }
    },
}));

function QCFormCustomizationTabContent(props) {
    const { register, errors, handleSubmit } = useForm();
    const [activeStep, setActiveStep] = React.useState(0);
    const { states, queryRanges, updateQueryInputs } = props;
    const classes = useStyles();

    const onSubmit = (data, e) => {
        updateQueryInputs(data);
    }

    const totalSteps = () => {
        return queryFields.length;
    };

    const isFirstStep = () => {
        return activeStep === 0;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        !isLastStep() &&
        setActiveStep(activeStep => activeStep + 1)
    };

    const handlePrev = () => {
        !isFirstStep() &&
        setActiveStep(activeStep => activeStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const queryFields = [
        { id: "state", name: "state", label: "State",
            options: Object.keys(states).map(state => states[state].name),
            description: "Filter by State. All returned results will be located within the desired state."
        },
        {  id: "buildingClass", name: "buildingClass", label: "Building Class",
            options: queryRanges.buildingClasses,
            description: "Specify a building class describing the property. Note that building class " +
                "'F' indicates an industrial property. Some of our listings do not have a building class" +
                "assigned so we suggest leaving this blank for more results. (or, at least include the 'N/A' values"
        },
        { id: "propertyType", name: "propertyType", label: "Property Type",
            options: queryRanges.subTypes,
            description: "Only properties of the specified type will be returned. Our listings" +
                " have a number of types that propose possible uses of the given property."
        },
        { id: "status", name: "status", label: "Status",
            options: ["All", "For Lease", "For Sale"],
            description: "Choose to either 'LEASE' or 'BUY' a property. The time to invest " +
                "is now old man!"
        },
        { id: "priceRange", name: "priceRange", label: "Price Range", isSlider: true,
            description: "Limit the price range of the results. Note for leasing the pricing " +
                "goes off a SquareFoot per Month rate while properties intended for sale " +
                "have a standard pricing model. Contact the real estate broker for further info!"
        },
    ]

    const renderOption = (option) => (
        <React.Fragment>
            {option}
        </React.Fragment>
    )

    const getOptionLabel = (option) => `${option}`

    return (
        <React.Fragment>
            <OuterWrapper>
                <QueryStepper>
                    <StyledStepper nonLinear activeStep={activeStep}>
                        {queryFields.map((queryField, index) => (
                            <Step key={queryField.id}>
                                <StepButton onClick={handleStep(index)}>
                                    <StepLabel StepIconProps={{
                                        classes: {
                                            root: classes.icon
                                        }
                                    }}>
                                        <Typography variant={"body2"} color={"secondary"}>
                                            {'Choose ' + queryField.label}
                                        </Typography>
                                    </StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </StyledStepper>
                </QueryStepper>
                <QueryForm onSubmit={handleSubmit(onSubmit)}>
                    {queryFields.map((queryField, index) => (
                        <QueryContainer
                            key={queryField.id}
                            variant={"elevation"}
                            elevation={activeStep === index ? 24 : 1}
                            isActive={index === activeStep}
                            onClick={index === activeStep ? (e) => e.preventDefault : handleStep(index)}
                        >
                            <QueryTitle>
                                <Typography variant={"body1"} color={"primary"} align={"center"} style={{
                                    marginBottom: "10px"
                                }}>
                                    {queryField.label}
                                </Typography>
                            </QueryTitle>
                            <QueryDescription>
                                <Typography variant={"body2"} color={"primary"} align={"center"}>
                                    {queryField.description}
                                </Typography>
                            </QueryDescription>
                            <QueryBody>
                                <CustomQueryInput
                                    isSlider={queryField.isSlider}
                                    id={queryField.id}
                                    name={queryField.name}
                                    label={queryField.label}
                                    options={queryField.options}
                                    renderOption={renderOption}
                                    getOptionLabel={getOptionLabel}
                                    register={register}
                                    errors={errors}
                                />
                            </QueryBody>
                            <QueryFooter>
                                <IconButton color={"secondary"} onClick={handlePrev} disabled={index === 0}>
                                    <NavigateBeforeIcon />
                                </IconButton>
                                <IconButton color={"secondary"} onClick={handleNext} disabled={index === totalSteps() - 1}>
                                    <NavigateNextIcon />
                                </IconButton>
                            </QueryFooter>
                        </QueryContainer>
                    ))}
                    <StyledSubmitButton variant={"contained"} color={"secondary"} type={'submit'}>
                        Store preferences
                    </StyledSubmitButton>
                </QueryForm>
            </OuterWrapper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        states: state.ui.states,
        queryRanges: state.ui.queryRanges
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQueryInputs: (queryInputs) => dispatch(updateQueryInputs(queryInputs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QCFormCustomizationTabContent);
