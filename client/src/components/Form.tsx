import {Button, ButtonGroup, Col, Container, FormFeedback, Input, InputGroup, InputGroupAddon, Row} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {Icon} from "../styles/common";
import {icons} from "../images/icons";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {actionCreate, actionEdit} from "../redux/actions/trainingsApiActions";
import styled from "styled-components";
import {State, Training} from "../types";

const types = [
    'running',
    'bicycle',
    'ski',
    'walking'
];

type FormData = {
    name: string,
    distance: number,
    type: string,
    distanceType: string,
    comment: string,
    date: string
};

const StyledRow = styled(Row)`
  margin: 10px 0;
`;

const StyledCol = styled(Col)`
  padding: 0;
  
  &:last-child {
   margin-left: 10px;
  }
  
  &:first-child {
   margin-right: 10px;
  }
`;

const Form = ({edit, _id, close}: { edit?: boolean, _id?: string, close?: Function }) => {
    const dispatch = useDispatch();
    const {control, reset, watch, setValue, register, errors, handleSubmit} = useForm<FormData>({
        mode: "onBlur",
    });

    const initialState = useSelector((state: State): Training | undefined => state.trainingsReducer.data && state.trainingsReducer.data.find((item: Training) => item._id === _id));
    const activeType = watch('type', (edit && initialState?.type) ? initialState.type : 'running');
    const activeDistanceType = watch('distanceType', 'm');

    const onSubmit = (data: any): void => {
        const body: Training = {
            _id: _id || '',
            date: moment(data.date).format('x'),
            type: data.type,
            comment: data.comment,
            name: data.name,
            distance: data.distanceType === 'm' ? data.distance : data.distance * 1000
        };
        reset({
            date: moment().format('yyyy-MM-DD')
        });
        if (edit) {
            dispatch(actionEdit(body));
            close && close()
        } else {
            dispatch(actionCreate(body))
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container style={{maxWidth: 1250}}>
                <StyledRow>
                    <Controller
                        name="type"
                        as={ButtonGroup}
                        control={control}
                        defaultValue={(edit && initialState?.type) ? initialState.type : 'running'}
                    >
                        {types.map(type =>
                            <Button color="warning" active={activeType === type} onClick={() => setValue('type', type)}>
                                <Icon pointer size='20px' src={icons[type]}/>
                            </Button>
                        )}
                    </Controller>
                    <StyledCol ms={6}>
                        <Input defaultValue={(edit && initialState?.name) ? initialState.name : ''} placeholder='Name'
                               name="name" innerRef={register({
                            required: true,
                        })}/>
                    </StyledCol>
                </StyledRow>
                <StyledRow>
                    <StyledCol ms={6}>
                        <Input
                            type="date"
                            name="date"
                            placeholder="Date"
                            innerRef={register}
                            defaultValue={(edit && initialState?.date) ? moment(+initialState.date).format('yyyy-MM-DD') : moment().format('yyyy-MM-DD')}
                        />
                    </StyledCol>
                    <StyledCol ms={6}>
                        <InputGroup>
                            <Input
                                type="number"
                                placeholder='Distance'
                                invalid={errors.distance && errors.distance.type === 'pattern'}
                                name='distance'
                                defaultValue={(edit && initialState?.distance) ? initialState.distance : ''}
                                innerRef={register({
                                    required: true,
                                    pattern: /^\d+$/
                                })}
                            />
                            <Controller
                                name='distanceType'
                                as={InputGroupAddon}
                                control={control}
                                defaultValue='m'
                                addonType="append"
                            >
                                <Button color="warning" active={activeDistanceType === 'm'}
                                        onClick={() => setValue('distanceType', 'm')}>m</Button>
                                <Button color="warning" active={activeDistanceType === 'km'}
                                        onClick={() => setValue('distanceType', 'km')}>km</Button>
                            </Controller>
                            <FormFeedback>
                                {(errors.distance && errors.distance.type === 'pattern') ? 'Only numbers' : ''}
                            </FormFeedback>
                        </InputGroup>
                    </StyledCol>
                </StyledRow>
                <StyledRow>
                    <Input defaultValue={(edit && initialState?.comment) ? initialState.comment : ''}
                           placeholder='Comment' type="textarea" name="comment" innerRef={register}/>
                </StyledRow>
                <StyledRow>
                    <Button type='submit' color="warning">
                        {edit ? 'Edit' : 'Create'}
                    </Button>
                    {edit &&
                    <Button style={{margin: '0 0 0 10px'}} outline color="secondary" onClick={() => close && close()}>
                        Close
                    </Button>
                    }
                </StyledRow>
            </Container>
        </form>
    )
};

export default Form
