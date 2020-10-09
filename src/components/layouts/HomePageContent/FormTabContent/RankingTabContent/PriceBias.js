import React from "react";
import BiasTemplate from "../../../../reusable/BiasTemplate";
import {connect} from "react-redux";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitCamelCase(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function PriceBias(props) {
    const { queryMetadata, register } = props;

    return (
        <React.Fragment>
            <BiasTemplate
                biasTitle={'Price Bias'}
                detailedIdData={
                    Object.keys(queryMetadata.statuses)
                        .map((status) => 'priceBias.priceBiasMap.' + status)
                }
                detailedLabelData={
                    Object.keys(queryMetadata.statuses)
                        .map((status) => splitCamelCase(capitalizeFirstLetter(status)))
                }
                nonDetailedIdData={'priceBias.all'}
                nonDetailedLabelData={'Applicable to all Prices'}
                multiplicandText={'PRICE'}
                register={register}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        queryMetadata: state.ui.queryMetadata
    }
}

export default connect(mapStateToProps)(PriceBias);
