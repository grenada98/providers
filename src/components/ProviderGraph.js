import React, { useEffect, useState } from 'react';
import { Provider } from './Provider';
import {StorageInput} from './StorageInput';
import {TransferInput} from './TransferInput';

export const ProviderGraph = (props) => {
    const [firstCount, setFirstCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
    const [thirdCount, setThirdCount] = useState(0);
    const [fourthCount, setFourthCount] = useState(0);
    const [storageCount, setStorageCount] = useState(0);
    const [transferCount, setTransferCount] = useState(0);
    const [styleBlock, setStyleBlock] = useState("width");

    const [option2, setOption2] = useState(null);
    const [option3, setOption3] = useState(null);

    useEffect(()=>{
        firstChange();
        secondChange();
        thirdChange();
        fourthChange();
    },[option2, option3])

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 600) {
            setStyleBlock("height");
          } else {
            setStyleBlock("width");
          }
        }
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const data = [
        {
            name: "backblaze.com",
            storage: 0.005,
            transfer: 0.01,
            min: 7,
            img: process.env.PUBLIC_URL + "/img/backblaze.png"
        },
        {
            name: "bunny.net",
            'storage-option': [
                {
                    option: "HDD",
                    price: 0.01
                },
                { 
                    option: "SSD",
                    price: 0.02
                }
            ],
            'transfer-option': [
                { 
                    option: "HDD",
                    price: 0.01
                },
                {   
                    option: "SSD",
                    price: 0.01
                },
            ],
            max: 10,
            img: process.env.PUBLIC_URL + "/img/bunnynet.svg"
        },
        {
            name: "scaleway.com",
            'storage-option': [
                    {   option: "Multi",
                        free: 75,
                        price: 0.06
                    },
                    {   option: "Single",
                        free: 75,
                        price: 0.03
                    }
            ],
            'transfer-option': [
                    {   option: "Multi",
                        free: 75,
                        price: 0.02
                    },
                    {   option: "Single",
                        free: 75,
                        price: 0.02
                    }
            ],
            img: process.env.PUBLIC_URL + "/img/scaleway.svg"
        },
        {
            name: "vultr.com",
            min: 5,
            storage: 0.01,
            transfer: 0.01,
            img: process.env.PUBLIC_URL + "/img/vultr.svg"
        }
    ]
    function firstChange(){
        let i = storageCount * data[0].storage + transferCount * data[0].transfer;
        if(i<data[0].min){
            setFirstCount(data[0].min)
        }
        else{
            setFirstCount(i)
        }
      }
    function secondChange(){
        if(option2){
        const resultStorage = data[1]['storage-option'].find((item) => item.option === option2);
        const priceStorage = resultStorage?.price;
        const resultTransfer = data[1]['transfer-option'].find((item) => item.option === option2);
        const priceTransfer = resultTransfer?.price;
        let i = storageCount * priceStorage + transferCount*priceTransfer;
        if(i > data[1].max){
            setSecondCount(data[1].max)
        }
        else{
            setSecondCount(i)
        }
        }
        else{
            setSecondCount(0)
        }
    }
    function thirdChange(){
        if(option3){
        const resultStorage = data[2]['storage-option'].find((item) => item.option === option3);
        const priceStorage = resultStorage?.price;
        const resultTransfer = data[2]['transfer-option'].find((item) => item.option === option3);
        const priceTransfer = resultTransfer?.price;
        let i = (storageCount - resultStorage.free) * priceStorage + (transferCount - resultTransfer.free) * priceTransfer;
        if(i < 0){
            setThirdCount(0);
        }
        else{
            setThirdCount(i);
        }}
        else{
            setThirdCount(0);
        }
    }
    function fourthChange(){
        let i = storageCount * data[3].storage + transferCount * data[3].transfer;
        if(i<data[3].min){
            setFourthCount(data[3].min)
        }
        else{
            setFourthCount(i)
        }
    }
    return(
        <div>
            <div className='calculator-form'>
                <StorageInput 
                storageCount={storageCount} 
                setStorageCount={setStorageCount} 
                transferCount={transferCount} 
                firstChange={firstChange}
                secondChange={secondChange}
                thirdChange={thirdChange}
                fourthChange={fourthChange}/>
                <TransferInput 
                storageCount={storageCount} 
                transferCount={transferCount} 
                setTransferCount={setTransferCount} 
                firstChange={firstChange}
                secondChange={secondChange}
                thirdChange={thirdChange}
                fourthChange={fourthChange}/>
            </div>
            <div className='provider-graph__wrapper'>
                <div className='provider__wrapper'>
                    {data.map((item, index) =>(
                        <Provider key={index} index={index} item={item} secondChange={secondChange} thirdChange={thirdChange} fourthChange={fourthChange} setOption2={setOption2} setOption3={setOption3}/>
                    ))}
                </div>
                <div className="graph">
                    <div className="blue" style={{[styleBlock]:firstCount}}><div className='count'>{firstCount.toFixed(2)}$</div></div>
                    <div className="green" style={{[styleBlock]:secondCount}}><div className='count'>{secondCount.toFixed(2)}$</div></div>
                    <div className="yellow" style={{[styleBlock]:thirdCount}}><div className='count'>{thirdCount.toFixed(2)}$</div></div>
                    <div className="orange" style={{[styleBlock]:fourthCount}}><div className='count'>{fourthCount.toFixed(2)}$</div></div>
                </div>
            </div>
        </div>
    )
}