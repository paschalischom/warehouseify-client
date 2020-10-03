import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import {ListItem, ListItemText} from "@material-ui/core";
import styled from "styled-components";
import { connect } from 'react-redux';

const FixedSizeListContainer = styled.div`
    width: 100;
    height: 400;
    maxWidth: 150;
    background-color: white;
    -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
    -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
    box-shadow:0 1px 4px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.2) inset;
`

function renderRow(props) {
    const { data, index, style} = props;
    const { popoverData, onChange} = data;

    const handleChange = (newValue) => {
        onChange(newValue);
    };

    return (
        <ListItem button style={style} key={index} onClick={() => handleChange(index)}>
            <ListItemText primary={popoverData[index]['name'] + ', ' + popoverData[index]['abbreviation']} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
};

function ToolbarPopover(props) {
    const {onChange, popoverData} = props;

    return (
        <React.Fragment>
            <FixedSizeListContainer>
                <FixedSizeList height={300} width={150} itemSize={46}
                               itemCount={popoverData.length}
                               itemData={{popoverData, onChange}} style={{zIndex: '101',}}>
                    {renderRow}
                </FixedSizeList>
            </FixedSizeListContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        states: state.ui.states
    }
}

export default connect(mapStateToProps)(ToolbarPopover)
