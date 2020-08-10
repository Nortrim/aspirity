import React, {Fragment} from "react";
import {AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer} from "recharts";
import {useSelector} from "react-redux";
import moment from 'moment'
import {State, Training} from "../types";


const Chart = () => {
    let data: Training[] = Object.assign([], useSelector((state: State): Training[] => state.trainingsReducer.data));
    data.sort((a,b)=> a.date > b.date ? 1 : a.date < b.date ? -1 : 0);

    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            id: i,
            date: data[i] && moment(+data[i].date).format('ll'),
            distance: +data[i]?.distance || 0
        };
        for (let j = i + 1; j < data.length; j++) {
            if (+data[i]?.date === +data[j]?.date) {
                item.distance = item.distance + +data[j].distance;
                delete data[j]
            }
        }
        item.date && formattedData.push(item)
    }

    return (
        <Fragment>
            {formattedData.length > 1 &&
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={formattedData}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='distance' stroke='#8884d8' fill='#8884d8'/>
                </AreaChart>
            </ResponsiveContainer>
            }
        </Fragment>
    )
};

export default Chart