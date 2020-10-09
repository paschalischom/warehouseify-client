import React from "react";
import BiasTemplate from "../../../../reusable/BiasTemplate";

export default function LotSizeBias(props) {
    const { register } = props;

    return (
        <React.Fragment>
            <BiasTemplate
                biasTitle={'Lot Size Bias'}
                detailedIdData={['lotSizeBias.na', 'lotSizeBias.size']}
                detailedLabelData={['N/A', '<size> SF']}
                nonDetailedIdData={'lotSizeBias.all'}
                nonDetailedLabelData={'Applicable universally'}
                multiplicandText={'LOT SIZE'}
                register={register}
            />
        </React.Fragment>
    )
}
