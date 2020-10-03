import React from 'react';
import styled from "styled-components";
import {Button, Typography} from "@material-ui/core";
import { connect } from 'react-redux';
import { addTempPoi } from "../../../../../../store/actions/userDataActions";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

// Warning! Sexy coding ahead!
const StyledResultsContainer = styled.div`
    position: absolute;
    width: 300px;
    height: inherit;
    right: -300px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1fr;
    
    ${props => props.isOpen && `
    
        & > ${StyledResultsHeader} {
            width: 100%;
            border-left: 1px solid #2e2e31;
        }
        
        & > ${StyledResultsWrapper} {
            transition-delay: 0.3s;
            height: 100%;
            border-top: 1px solid #db460e;
            border-right: 1px solid #db460e;
            border-bottom: 1px solid #db460e;
        }
    `
    }
    
    ${props => !(props.isOpen) && `
        
        & > ${StyledResultsHeader} {
            transition-delay: 0.3s;
        }
    `
    }
`

const StyledResultsHeader = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    width: 0px;
    background-color: #1b1a1d;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
`

const StyledResultsWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    height: 0;
    background-color: #1b1a1d;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
`

const StyledResultsBody = styled.div`
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
`

const StyledBodyTitle = styled.div`
    margin: 15px;
`

const StyledBodyContent = styled.div`
`

const StyledAttrTitleTypography = styled(Typography)`
    &.MuiTypography-root {
        color: #b7b7b7;
        margin: 0px 8px;
    }
`

const StyledResultsFooter = styled.div`
    margin: 15px 10px;
`

const StyledFooterButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

function SearchResultContainer(props) {

    const { tempPoi, showSearchResults, setShowSearchResults, addTempPoi } = props;

    const handleYesButtonClick = () => {
        addTempPoi(tempPoi);
        setShowSearchResults(false);
    }

    const handleNoButtonClick = () => {
        setShowSearchResults(false);
    }

    return (
        <React.Fragment>
            <StyledResultsContainer isOpen={showSearchResults}>
                <StyledResultsHeader>
                    <Typography color={"secondary"} noWrap variant={"subtitle1"} align={"center"} style={{
                        padding: '15px 0px',
                    }}>
                        Search Results
                    </Typography>
                </StyledResultsHeader>
                <StyledResultsWrapper>
                    <StyledResultsBody>
                        <StyledBodyTitle>
                            <StyledAttrTitleTypography variant={"body2"} align={"left"}>
                                Results shown for address:
                            </StyledAttrTitleTypography>
                            <Typography color={"primary"} variant={"subtitle2"} align={"center"}>
                                {tempPoi.address}
                            </Typography>
                        </StyledBodyTitle>
                        <StyledBodyContent>
                            <div>
                                <StyledAttrTitleTypography noWrap variant={"body1"} align={"center"} display={"inline"}>
                                    State:
                                </StyledAttrTitleTypography>
                                <Typography color={"primary"} noWrap variant={"body1"} align={"center"} display={"inline"}>
                                    {tempPoi.state}
                                </Typography>
                            </div>
                            <div>
                                <StyledAttrTitleTypography noWrap variant={"body1"} align={"center"} display={"inline"}>
                                    Lat:
                                </StyledAttrTitleTypography>
                                <Typography color={"primary"} noWrap variant={"body1"} align={"center"} display={"inline"}>
                                    {tempPoi.lat}
                                </Typography>
                            </div>
                            <div>
                                <StyledAttrTitleTypography noWrap variant={"body1"} align={"center"} display={"inline"}>
                                    Lng:
                                </StyledAttrTitleTypography>
                                <Typography color={"primary"} noWrap variant={"body1"} align={"center"} display={"inline"}>
                                    {tempPoi.lng}
                                </Typography>
                            </div>
                        </StyledBodyContent>
                    </StyledResultsBody>
                    <StyledResultsFooter>
                        <Typography variant={"body2"} align={"center"} style={{
                            color: '#b7b7b7'
                        }}>
                            Would you like to add the above result in your list of Points of Interest?
                        </Typography>
                        <StyledFooterButtons>
                            <Button
                                variant={"outlined"}
                                color={"secondary"}
                                startIcon={<CheckOutlinedIcon/>}
                                onClick={handleYesButtonClick}
                            >
                                YES
                            </Button>
                            <Button
                                variant={"outlined"}
                                color={"secondary"}
                                startIcon={<ClearOutlinedIcon/>}
                                onClick={handleNoButtonClick}
                            >
                                NO
                            </Button>
                        </StyledFooterButtons>
                    </StyledResultsFooter>
                </StyledResultsWrapper>
            </StyledResultsContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        tempPoi: state.userTemp.tempPoi,
        showSearchResults: state.userTemp.showSearchResults
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowSearchResults: (showSearchResults) => dispatch({type: 'SHOW_SEARCH_RESULTS', showSearchResults}),
        addTempPoi: (poi) => dispatch(addTempPoi(poi))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultContainer);
