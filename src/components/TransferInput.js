import React from 'react';
import InputRange from 'react-input-range';
import { useState } from 'react';
import 'react-input-range/lib/css/index.css';

export const TransferInput = (props) => {
    return(
        <div className='input__wrapper'>
            <div className='input__name-wrapper'>
                <div className='input__name'>Transfer:</div>
                <div className='input__count'>{props.transferCount} GB</div>
            </div>
            <InputRange
                maxValue={1000}
                minValue={0}
                value={props.transferCount}
                onChange={e=>{props.setTransferCount(e); props.firstChange(); props.secondChange(); props.thirdChange(); props.fourthChange()}}/>
        </div>
    )
}