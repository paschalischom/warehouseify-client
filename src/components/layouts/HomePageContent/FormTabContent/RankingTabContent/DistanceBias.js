import React from "react";
import { connect } from 'react-redux';
import BiasTemplate from "../../../../reusable/BiasTemplate";

function DistanceBias(props) {
    const { poiList, register } = props;

    return (
        <React.Fragment>
            <BiasTemplate
                id={'distance'}
                biasTitle={'Distance Bias'}
                detailedIdData={
                    Object.keys(poiList)
                        .filter(key => poiList[key].status === 'Active')
                        .map((key) => 'distanceBias.distanceBiasMap.'+key)
                }
                detailedLabelData={
                    Object.values(poiList)
                    .filter(poi => poi.status === 'Active')
                    .map(label => label.address)
                }
                nonDetailedIdData={'distanceBias.all'}
                nonDetailedLabelData={'Applicable to all PoI'}
                multiplicandText={'DISTANCE'}
                register={register}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        poiList: state.user.poiList
    }
}

export default connect(mapStateToProps)(DistanceBias);
