import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../redux/actions/trainingsApiActions";
import {TrainingItem} from "./training";
import {setEdit} from "../../redux/actions/trainingsStoreActions";
import {State, Training} from "../../types";


const StyledTrainingList = styled.div`
    display: flex;
    flex-direction: column;
`;

const TrainingList = () => {
    const dispatch = useDispatch();
    const trainings = useSelector((state: State): Training[] => state.trainingsReducer.data);

    useEffect(() => { dispatch(fetchData()) }, [dispatch]);

    return (
        <StyledTrainingList>
            {trainings.map((item: Training, key: number) =>
                <TrainingItem
                    _id={item._id}
                    key={key}
                    name={item.name}
                    distance={+item.distance}
                    date={item.date}
                    type={item.type}
                    comment={item.comment}
                    isEdit={item.isEdit}
                    setEdit={(state: boolean) => dispatch(setEdit({_id: item._id, state}))}
                />
            )}
        </StyledTrainingList>
    )
};

export default TrainingList