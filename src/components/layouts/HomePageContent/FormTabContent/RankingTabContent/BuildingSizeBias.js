import React from "react";
import BiasTemplate from "../../../../reusable/BiasTemplate";

export default function BuildingSizeBias(props) {
    const { register } = props;

    return (
        <React.Fragment>
            <BiasTemplate
                biasTitle={'Building Size Bias'}
                detailedIdData={['buildingSizeBias.na', 'buildingSizeBias.size']}
                detailedLabelData={['N/A', '<size> SF']}
                nonDetailedIdData={'buildingSizeBias.all'}
                nonDetailedLabelData={'Applicable universally'}
                multiplicandText={'BUILDING SIZE'}
                register={register}
            />
        </React.Fragment>
    )
}
