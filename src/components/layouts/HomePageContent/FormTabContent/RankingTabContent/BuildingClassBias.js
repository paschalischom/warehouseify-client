import React from "react";
import { connect } from 'react-redux';
import BiasTemplate from "../../../../reusable/BiasTemplate";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitCamelCase(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function BuildingClassBias(props) {
    const { queryMetadata, register } = props;

    return (
        <React.Fragment>
            <BiasTemplate
                biasTitle={'Building Class Bias'}
                detailedIdData={
                    queryMetadata.buildingClasses
                        .map((buildingClass) =>'buildingClassBias.buildingClassBiasMap.' + buildingClass.replace("/", ""))
                }
                detailedLabelData={
                   queryMetadata.buildingClasses
                        .map((buildingClass) => splitCamelCase(capitalizeFirstLetter(buildingClass)))
                }
                nonDetailedIdData={'buildingClassBias.all'}
                nonDetailedLabelData={'Applicable to all building classes'}
                multiplicandText={'BUILDING CLASS'}
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

export default connect(mapStateToProps)(BuildingClassBias);
