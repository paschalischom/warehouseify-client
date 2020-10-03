import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {Button, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {FixedSizeList} from "react-window";
import {AutoSizer} from "react-virtualized";
import TelegramIcon from '@material-ui/icons/Telegram';
import {submitQuery} from "../../../../store/actions/userTempDataActions";

const OuterWrapper = styled.div`
    height: 100%;
    background-color: #2e2e31;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

const PoiListContainer = styled.div`
    flex: 2;
    margin: 10px;
    padding: 10px;
    border: 1px solid #b7b7b7;
    display: flex;
    flex-direction: column;
`

const QueryInputsContainer = styled.div`
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #b7b7b7;
    height: fit-content;
`

const StyledDivider = styled(Divider)`
    &.MuiDivider-root {
        background-color: #b7b7b7;
    }
`

const FixedSizeListContainer = styled.div`
    flex: 1;
`

const SubmitQueryContainer = styled.div`
    flex: 3;
    display: flex;
`

const StyledSubmitButton = styled(Button)`
    &.MuiButton-root {
        margin: auto;
    }
`

function renderRow(props) {
    const { index, style, data } = props;
    const { listData } = data;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText disableTypography primary={
                <React.Fragment>
                    <Typography variant={"body2"} color={"primary"} noWrap>
                        {index + '. ' + listData[index].address + ', Radius: ' + listData[index].radius + 'm.'}
                    </Typography>
                    <StyledDivider variant="middle" component="div" />
                </React.Fragment>
            }/>
        </ListItem>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitCamelCase(string) {
    string = capitalizeFirstLetter(string);
    return string.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

function OverviewFormFinalLookTabContent(props) {
    const { handleTabChange, index, ...reduxProps } = props;
    const { poiList, queryInputs, submitQuery } = reduxProps;

    const handleSubmitButton = (event) => {
        submitQuery();
        handleTabChange(event, index + 1)
    }

    return (
        <React.Fragment>
            <OuterWrapper>
                <PoiListContainer>
                    <Typography variant={"subtitle1"} color={"secondary"}>
                        Active Points Of Interest
                    </Typography>
                    <FixedSizeListContainer>
                        <AutoSizer>
                            {({ height, width }) => (
                                <FixedSizeList height={height} width={width} itemSize={46}
                                               itemCount={Object.values(poiList).length}
                                               itemData={{listData: Object.values(poiList)}}
                                >
                                    {renderRow}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    </FixedSizeListContainer>
                </PoiListContainer>
                <QueryInputsContainer>
                    <Typography variant={"subtitle1"} color={"secondary"}>
                        Query Customization
                    </Typography>
                    <List dense aria-label={"query-customization"}>
                        {Object.keys(queryInputs).map((inputType, index) => (
                            <React.Fragment key={inputType}>
                                <ListItem button>
                                    <ListItemText disableTypography primary={
                                            queryInputs[inputType] === ""
                                                ? <Typography variant={"body2"} color={"primary"}>
                                                        {index +  '. ' + splitCamelCase(inputType) + ': None'}
                                                </Typography>
                                                : <Typography variant={"body2"} color={"primary"}>
                                                        {index +  '. ' + splitCamelCase(inputType) + ': ' + queryInputs[inputType]}
                                                </Typography>
                                    } />
                                </ListItem>
                                <StyledDivider variant="middle" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                </QueryInputsContainer>
                <SubmitQueryContainer>
                    <StyledSubmitButton variant={"outlined"}
                                        color={"secondary"}
                                        size={"large"}
                                        startIcon={<TelegramIcon />}
                                        onClick={handleSubmitButton}
                    >
                        SEARCH NOW!
                    </StyledSubmitButton>
                </SubmitQueryContainer>
            </OuterWrapper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        poiList: state.user.poiList,
        queryInputs: state.userTemp.queryInputs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitQuery: () => dispatch(submitQuery())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewFormFinalLookTabContent);
