import React, { useEffect, useState } from "react";

export const Option = (props) => {
    function calculatePrice(){
        props.secondChange(props.option.option); 
        if(props.index==1){
            props.setOption2(props.option.option)
        }
        if(props.index==2){
            props.setOption3(props.option.option)
        }
    }
    return(
        <label className='provider__label' onClick={calculatePrice}>
            <input name={props.item.name} type="radio"></input>
            <div className='provider__option-name'>{props.option.option}</div>
        </label>
    )
}