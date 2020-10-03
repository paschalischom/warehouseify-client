import React  from "react";
import styled from "styled-components";

const StyledInfoWindowContainer = styled.div`
    padding: 0;
`

const AttributeTable = styled.div`
    box-sizing: border-box;
`

const TableRow = styled.div`
    display: flex;
    white-space: nowrap;
`

const TableColumn = styled.div`
    flex: 50%;
    padding: 5px 10px;
    white-space: nowrap;    
`

const StyledTableHeader = styled.p`
    font-weight: bold;
    margin: 0;
`

const StyledAttributeKey = styled.p`
    display: inline-block;
    font-weight: bold;
    margin: 0;
`

const StyledAttributeValue = styled.p`
    display: inline-block;
    padding-left: 4px;
    margin: 0;
`

export default function MarkerInfoWindow(props) {

    const { markerInfo, visible } = props;

    return (
        <React.Fragment>
            {visible &&
            <StyledInfoWindowContainer>
                <h4>
                    {markerInfo.address}
                </h4>
                <AttributeTable>
                    <TableRow>
                        <TableColumn>
                            <StyledTableHeader>
                                Attributes:
                            </StyledTableHeader>
                        </TableColumn>
                    </TableRow>
                    <TableRow>
                        <TableColumn>
                            <StyledAttributeKey>
                                Lat:
                            </StyledAttributeKey>
                            <StyledAttributeValue>
                                {markerInfo.lat}
                            </StyledAttributeValue>
                        </TableColumn>
                        <TableColumn>
                            <StyledAttributeKey>
                                State:
                            </StyledAttributeKey>
                            <StyledAttributeValue>
                                {markerInfo.state}
                            </StyledAttributeValue>
                        </TableColumn>
                    </TableRow>
                    <TableRow>
                        <TableColumn>
                            <StyledAttributeKey>
                                Lng:
                            </StyledAttributeKey>
                            <StyledAttributeValue>
                                {markerInfo.lng}
                            </StyledAttributeValue>
                        </TableColumn>
                        <TableColumn>
                            <StyledAttributeKey>
                                Radius(m):
                            </StyledAttributeKey>
                            <StyledAttributeValue>
                                {markerInfo.radius}
                            </StyledAttributeValue>
                        </TableColumn>
                    </TableRow>
                    <TableRow>
                        <TableColumn>
                            <StyledAttributeKey>
                                Status:
                            </StyledAttributeKey>
                            <StyledAttributeValue>
                                {markerInfo.status}
                            </StyledAttributeValue>
                        </TableColumn>
                        <TableColumn>
                            <StyledAttributeKey>
                                Updated:
                            </StyledAttributeKey>
                            <StyledAttributeValue>
                                {markerInfo.updated}
                            </StyledAttributeValue>
                        </TableColumn>
                    </TableRow>
                </AttributeTable>
            </StyledInfoWindowContainer>
            }
        </React.Fragment>
    )
}
