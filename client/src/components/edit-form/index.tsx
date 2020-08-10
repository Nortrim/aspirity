import React from 'react'
import {BoxShadowed} from "../../styles/common";
import Form from "../Form";
import Chart from "../Chart";

const EditForm = () => {

    return (
        <BoxShadowed borderRadius='0 0 10px 10px' margin='0 10px 10px'>
            <Chart />
            <Form />
        </BoxShadowed>
    )
};

export default EditForm