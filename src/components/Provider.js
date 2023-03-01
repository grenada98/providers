import React, { useEffect, useState } from "react";
import { Option } from "./Option";

export const Provider = (props) => {
    return(
        <div className='provider__item'>
            <div className='provider__data'>
                <div className='provider__name'>{props.item.name}</div>
                <div className='provider__parameter-wrapper'>
                        <div className='provider__option-wrapper'>
                            {
                                props.item['transfer-option']?.map((option, i) => (
                                <Option key={i} checked={i} option={option} 
                                index={props.index} item={props.item}
                                setOption2={props.setOption2} secondChange={props.secondChange}
                                setOption3={props.setOption3} thirdChange={props.thirdChange}/>
                            ))
                            }
                        </div>
                </div>
            </div>
            <div className='provider__img'>
                <img src={props.item.img} alt="provider"/>
            </div>
        </div>
    )
}