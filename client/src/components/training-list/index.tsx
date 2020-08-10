import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../redux/actions/trainingsApiActions";
import {TrainingItem} from "./training";
import {filterByType, setEdit, sortBy} from "../../redux/actions/trainingsStoreActions";
import {Training} from "../../types";
import {getFilters, getTrainings} from "../../redux/reducers/trainingsReducer";
import {BoxShadowed, Icon} from "../../styles/common";
import {Button, ButtonGroup} from "reactstrap";
import {icons} from "../../images/icons";
import {types} from "../Form";


const StyledTrainingList = styled.div`
    display: flex;
    flex-direction: column;
`;

const TrainingList = () => {
    const dispatch = useDispatch();
    const trainings = useSelector(getTrainings);
    const filters = useSelector(getFilters);

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch]);

    return (
        <StyledTrainingList>
            <BoxShadowed style={{display: 'flex', justifyContent: 'space-between'}} height='60px'>
                <ButtonGroup>
                    {types.map(type =>
                        <Button outline color="warning" active={filters.filterByType === type}
                                onClick={() => dispatch(filterByType(filters.filterByType === type ? null : type))}>
                            <Icon pointer size='20px' src={icons[type]}/>
                        </Button>
                    )}
                </ButtonGroup>
                <ButtonGroup>
                    <Button outline color="warning" active={filters.sortBy === 'date'} onClick={() => dispatch(sortBy('date'))}>
                        Date
                    </Button>
                    <Button outline color="warning" active={filters.sortBy === 'distance'}
                            onClick={() => dispatch(sortBy('distance'))}>
                        Distance
                    </Button>
                </ButtonGroup>
            </BoxShadowed>
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