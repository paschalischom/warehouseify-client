import React from 'react';
import styled from "styled-components";
import {ListingCard, ListingsMap} from "./ListingsTabContent";
import {AutoSizer} from "react-virtualized";
import {FixedSizeList} from "react-window";
import { connect } from 'react-redux';
import {useToggle} from "../../../reusable/hooks/useToggle";
import {Typography} from "@material-ui/core";
import { ReactComponent as Logo } from "../../../../images/logo5.svg";
import LoadingSpinner from "../../../reusable/LoadingSpinner";

const OuterWrapper = styled.div`
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #2e2e31;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

const StyledListingsList = styled.div`
    width: calc(100% - 50px);
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
`

const SidebarContainer = styled.div`
    width: 450px;
    position: absolute;
    height: 100%;
    right: -400px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    
    ${props => props.isOpen && `
        {
            right: 0px;
        }
    `
}
`

const MapHandle = styled.button`
    width: 50px;
    height: 100%;
    background-color: #db4612;
`

const StyledMapContainer = styled.div`
    overflow: hidden;
    height: 100%;
`

const SpinnerContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #2e2e31;
    z-index: 2;
    left: -100%;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    
    ${props => props.searchingInProgress && `
        {
            left: 0px;
        }
    `
}
`

function renderRow(props) {
    const { index, style, data } = props;
    const { results, isOpen, selectRowIndex } = data;
    const { setSelectedRowIndex } = selectRowIndex;

    return (
        <div key={index} style={style}>
            <ListingCard index={index} listing={results[index]} isOpen={isOpen}
                         setSelectedRowIndex={setSelectedRowIndex}
            />
        </div>
    );
}

function ResultsFormForLeaseTabContent(props) {
    const { searchingInProgress, results } = props;
    const [isOpen, toggleIsOpen] = useToggle(false);
    const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);

    const handleMapHandleClick = () => {
        toggleIsOpen();
    }

    const selectRowIndex = React.useMemo(
        () => ({
            selectedRowIndex,
            setSelectedRowIndex
        }),
        [selectedRowIndex]
    );

    return (
        <React.Fragment>
            <OuterWrapper>
                <SpinnerContainer searchingInProgress={searchingInProgress}>
                    <LoadingSpinner />
                </SpinnerContainer>
                {results.length
                    ? <StyledListingsList isOpen={isOpen}>
                        <AutoSizer>
                            {({height, width}) => (
                                <FixedSizeList height={height} width={width} itemSize={170}
                                               itemCount={Object.values(results).filter(result => result.status === "For Lease").length}
                                               itemData={{results: Object.values(results).filter(result => result.status === "For Lease"),
                                                   isOpen: isOpen, selectRowIndex: selectRowIndex}}
                                >
                                    {renderRow}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    </StyledListingsList>
                    : <div style={{margin: "auto"}}>
                        <Logo />
                        <Typography color={"secondary"} variant={"subtitle1"}>
                            No results were found. Please refine your search.
                        </Typography>
                        <Typography color={"primary"} variant={"caption"} style={{margin: "20px"}}>
                            Tip: Consider defining PoIs with overlapping radiuses.
                        </Typography>
                    </div>
                }
                <SidebarContainer isOpen={isOpen}>
                    <MapHandle onClick={handleMapHandleClick}>
                        <Typography color={"primary"} variant={"subtitle1"} style={{
                            transform: 'rotateZ(-90deg)',
                            position: 'absolute'
                        }}>
                            MAP
                        </Typography>
                    </MapHandle>
                    <StyledMapContainer isOpen={isOpen}>
                        <ListingsMap results={Object.values(results).filter(result => result.status === "For Lease")} selectedRowIndex={selectedRowIndex}/>
                    </StyledMapContainer>
                </SidebarContainer>
            </OuterWrapper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        searchingInProgress: state.userTemp.searchingInProgress,
        results: state.userTemp.results
    }
}

export default connect(mapStateToProps)(ResultsFormForLeaseTabContent);
