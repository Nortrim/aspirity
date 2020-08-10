import React, {Fragment} from "react";
import {BoxShadowed, Icon} from "../../styles/common";
import {icons} from "../../images/icons";
import styled from "styled-components";
import moment from 'moment'
import {useDispatch} from "react-redux";
import {actionDelete} from "../../redux/actions/trainingsApiActions";
import Form from "../Form";

type FlexProps = {
    justifyContent?: string,
    width?: string,
    padding?: string
};

const Flex = styled.div`
  display: flex;
  justify-content: ${({justifyContent}: FlexProps) => justifyContent ? justifyContent : ''}; 
  width: ${({width}: FlexProps) => width ? width : '100%'}; 
  padding: ${({padding}: FlexProps) => padding ? padding : '0'};
`;

const InlineBlock = styled.div`
  display: inline-block;
  margin: 5px 10px 0;
`;

const Date = styled.div`
  position: absolute;
  right: 15px;
  bottom: 10px;
  color: grey;
`;

export const TrainingItem = (
    {
        _id,
        name,
        distance,
        date,
        type,
        comment,
        isEdit,
        setEdit
    }: {
        _id?: string,
        name: string,
        distance: number,
        date: string,
        type: string,
        comment?: string
        isEdit?: boolean
        setEdit: Function
    }
) => {
    const formattedDate = moment(+date).format('ll');
    const dispatch = useDispatch();

    let formattedDistance: string = distance + 'm';
    if (distance > 1000) {
        formattedDistance = `${Math.floor(+distance / 1000)}km ${+distance % 1000}m`
    }

    return (
        <BoxShadowed height={isEdit ? '246px' : '106px'} onClick={() => !isEdit && setEdit(true)}>
            {isEdit ?
                <Form _id={_id} edit close={() => setEdit(false)}/>
                :
                <Fragment>
                    <Flex justifyContent='space-between'>
                        <h2>
                            {name}
                        </h2>
                        <Icon
                            pointer
                            size='20px'
                            src={icons.close}
                            alt=''
                            onClick={(e) => {
                                e.stopPropagation();
                                _id && dispatch(actionDelete(_id))
                            }}
                        />
                    </Flex>
                    <Flex>
                        <Flex width='40%' justifyContent='flex-start'>
                            <Icon size='40px' src={icons[type]} alt=''/>
                            <InlineBlock>
                                {formattedDistance}
                            </InlineBlock>
                            {comment && <InlineBlock>
                                {comment}
                            </InlineBlock>}
                        </Flex>
                        <Flex width='100%' justifyContent='flex-end'>
                            <Date>
                                {formattedDate}
                            </Date>
                        </Flex>
                    </Flex>
                </Fragment>
            }

        </BoxShadowed>
    )
};