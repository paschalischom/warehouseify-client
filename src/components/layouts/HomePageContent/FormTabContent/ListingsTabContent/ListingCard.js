import React from 'react';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import {CardActionArea, CardContent, CardMedia, Divider, Typography} from "@material-ui/core";
import GenericWarehouse from '../../../../../images/generic_warehouse.jpg';

const StyledCard = styled(Card)`
    &.MuiCard-root {
        height: 150px;
        background-color: #202020;
        margin: 20px;
    }
`

const StyledCardActionArea = styled(CardActionArea)`
    &.MuiCardActionArea-root {
        height: inherit;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        
        &:hover {
            background-color: #dc6d4345;
        }
    }
`

const StyledCardMedia = styled(({isOpen, ...props}) => <CardMedia {...props} />)`
    &.MuiCardMedia-img {
        transition: all 0.3s ease-in-out;
        -webkit-transition: all 0.3s ease-in-out;

        ${props => props.isOpen
        ? `
            width: 0px;
            height: inherit;
        `
        : `
            width: 250px;
            height: inherit;
        `
        }
    }
`

const StyledCardContent = styled(CardContent)`
    &.MuiCardContent-root {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
`

const StyledCardHeader = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    
    ${props => props.isOpen
    ? `
            width: 350px;
            & > .MuiTypography-h5 {
                font-size: 1.4rem;
            }
            & > .MuiTypography-body2 {
                font-size: 0.75rem;
            }
    `
    : `
           flex: 1;
    `
    }
`

const StyledDivider = styled(Divider)`
    &.MuiDivider-root {
        background-color: #dc6d439e;
        height: 80%;
    }
`

const StyledCardDetails = styled.div`
    flex: 1;
`

const StyledDetailsTable = styled.div`
    height: 100px;
    width: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitCamelCase(string) {
    string = capitalizeFirstLetter(string);
    return string.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

export default function ListingCard(props) {
    const { index, listing, isOpen, setSelectedRowIndex } = props;
    const excludedAttributes = ['id', 'description', 'latitude', 'longitude', 'priceHigh', 'priceLow', 'title', 'url'];

    const handleCardClick = () => {
        setSelectedRowIndex(index);
    }

    return (
        <React.Fragment>
            <StyledCard elevation={12} square>
                <StyledCardActionArea onClick={handleCardClick}>
                    <StyledCardMedia
                        component={"img"}
                        src={GenericWarehouse}
                        title={"Generic Warehouse JPG TM"}
                        isOpen={isOpen}
                    />
                    <StyledCardContent>
                        <StyledCardHeader isOpen={isOpen}>
                            <Typography gutterBottom variant={"h5"} color={"primary"} style={{
                                paddingTop: '10px'
                            }}>
                                {listing['title']}
                            </Typography>
                            <Typography gutterBottom variant={"body2"} color={"primary"}>
                                {listing['description']}
                            </Typography>
                        </StyledCardHeader>
                        <StyledDivider orientation={"vertical"} variant={"middle"}/>
                        <StyledCardDetails>
                            <Typography gutterBottom variant={"subtitle2"} color={"primary"} style={{
                                paddingTop: '5px'
                            }}>
                                Details:
                            </Typography>
                            <StyledDetailsTable>
                                {Object.keys(listing).map((attr) => (
                                    !excludedAttributes.includes(attr) &&
                                    <React.Fragment key={attr}>
                                        <Typography variant={"body2"} color={"primary"}>
                                            {splitCamelCase(attr) + ': ' + listing[attr]}
                                        </Typography>
                                    </React.Fragment>
                                ))}
                            </StyledDetailsTable>
                        </StyledCardDetails>
                    </StyledCardContent>
                </StyledCardActionArea>
            </StyledCard>
        </React.Fragment>
    )
}
