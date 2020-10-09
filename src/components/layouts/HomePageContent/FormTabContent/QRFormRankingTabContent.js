import React from "react";
import styled from "styled-components";
import {BuildingClassBias, BuildingSizeBias, DistanceBias, LotSizeBias, PriceBias} from "./RankingTabContent";
import {useForm} from "react-hook-form";
import {Button} from "@material-ui/core";
import {updateQueryRanking} from "../../../../store/actions/userTempDataActions";
import { connect } from "react-redux";

const RankingFlowchartContainer = styled.form`
    height: 100%;
    background-color: #2e2e31;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    position: relative;
`

const BiasContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`

const StyledSubmitButton = styled(Button)`
    &.MuiButton-root {
        position: absolute;
        top: -60px; // Fix this abomination in the future
        left: 200px;
    }
`

 function QRFormRankingTabContent(props) {
    const { register, handleSubmit } = useForm();
    const { updateQueryRanking } = props;

     const onSubmit = values => {
         updateQueryRanking(values);
     }

     return (
        <React.Fragment>
            <RankingFlowchartContainer onSubmit={handleSubmit(onSubmit)}>
                <BiasContainer>
                    <DistanceBias register={register}/>
                </BiasContainer>
                <BiasContainer>
                    <PriceBias register={register}/>
                </BiasContainer>
                <BiasContainer>
                    <BuildingClassBias register={register}/>
                </BiasContainer>
                <BiasContainer>
                    <BuildingSizeBias register={register}/>
                </BiasContainer>
                <BiasContainer>
                    <LotSizeBias register={register}/>
                </BiasContainer>
                <StyledSubmitButton variant={"contained"} color={"secondary"} type={'submit'}>
                    Store preferences
                </StyledSubmitButton>
            </RankingFlowchartContainer>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQueryRanking: (queryBias) => dispatch(updateQueryRanking(queryBias))
    }
}

export default connect(null, mapDispatchToProps)(React.memo(QRFormRankingTabContent));
