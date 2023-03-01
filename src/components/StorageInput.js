import React from 'react';
import InputRange from 'react-input-range';
import { useState } from 'react';

export const StorageInput = (props) => {
    return(
        <div className='input__wrapper'>
            <div className='input__name-wrapper'>
                <div className='input__name'>Storage:</div>
                <div className='input__count'>{props.storageCount} GB</div>
            </div>
            <InputRange
                maxValue={1000}
                minValue={0}
                value={props.storageCount}
                onChange={e=>{props.setStorageCount(e)}}/>
        </div>
    )
}