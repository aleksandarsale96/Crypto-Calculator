import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.min.css";
import tsfPrice from ".././price";

export default function Inputs() {
    
      const [coinsPerMin, setCoinsPerMin] = React.useState(0);
      const [coinsPerHour, setCoinsPerHour] = React.useState(0); 
      const [coinsPerDay, setCoinsPerDay] = React.useState(0); 
      const [graficka, setGraficka] = React.useState(30);
      const [rewardPerMin, setRewardPerMin] = React.useState(0);
      const [rewardPerHour, setRewardPerHour] = React.useState(0);
      const [rewardPerDay, setRewardPerDay] = React.useState(0);
      const [rewardPerDayInDolars, setRewardPerDayInDolars] = React.useState(0);

      const [formData, setFormData] = React.useState({ 
        blockTime: 45, 
        netHashrate: 1, 
        coinPrice: tsfPrice, 
        blockReward: 2
      });

    

    const handleChange = (event) => { 
        const { name, value } = event.target; 
        setFormData((prevState) => { 
          return { 
            ...prevState, 
            [name]: value, 
          }; 
        }); 
      };

      
    React.useEffect(() => { 
        async function getHashrate() { 
            const response = await axios.get('https://explorer.tsf-platform.com/api/v1/network/stats');
            const data = await response.data[0].hashrate; 
            setFormData((prevState) => ({ 
                ...prevState, 
                netHashrate: parseInt(data)
              }));
        } 
        getHashrate(); 
    }, []);

    React.useEffect(() => { 
        async function coinsPerMin() {
            let minut = 60;
            let koiniPoMin = minut / formData.blockTime * 2;
            console.log(koiniPoMin);
            setCoinsPerMin(koiniPoMin.toFixed(2));
        }
        coinsPerMin();
    }, [formData.blockTime]);

    React.useEffect(() => { 
        async function coinsPerHour() {
            let hour = 60;
            let koiniPoSatu = coinsPerMin * hour;
            console.log(koiniPoSatu);
            await setCoinsPerHour(koiniPoSatu.toFixed(2));
        }
        coinsPerHour();
    }, [coinsPerMin]);

    React.useEffect(() => { 
        async function coinsPerDay() {
            let day = 24 * 60;
            let koiniPoDanu = coinsPerMin * day;
            console.log(koiniPoDanu);
            await setCoinsPerDay(koiniPoDanu.toFixed(2));
        }
        coinsPerDay();
    }, [coinsPerMin]);

    React.useEffect(() => { 
        async function rewardPerMinute() {
            let rewardInCoinsPerMin = coinsPerMin * graficka / formData.netHashrate / 1000;
            setRewardPerMin(rewardInCoinsPerMin.toFixed(5));

        }
        rewardPerMinute();
    }, [coinsPerMin, graficka, formData.netHashrate]);
    console.log(rewardPerMin);

    React.useEffect(() => { 
        async function rewardPerHour1() {
            let rewardInCoinsPerHour = rewardPerMin * 60;
            setRewardPerHour(rewardInCoinsPerHour.toFixed(2));

        }
        rewardPerHour1();
    }, [rewardPerMin]);
    console.log(rewardPerHour);
    
    React.useEffect(() => { 
        async function rewardPerDay1() {
            let rewardInCoinsPerDay = rewardPerMin * 60 * 24;
            setRewardPerDay(rewardInCoinsPerDay.toFixed(2));
            
        }
        rewardPerDay1();
    }, [rewardPerMin]);
    console.log(rewardPerDay);

    React.useEffect(() => { 
        async function rewardPerDayInDolars1() {
            let rewardDailyDolars = rewardPerDay * formData.coinPrice;
            setRewardPerDayInDolars(rewardDailyDolars.toFixed(2));

        }
        rewardPerDayInDolars1();
    }, [rewardPerDay, formData.coinPrice]);



   

    // const callRewardsInCoins = async () => {
    //     let gpuHashrate = await callGpuHashrate();
    //     let networkHashrate = await callNetworkHashrate();
    //     let networkHashrateMh = networkHashrate * 1000;
    //     let totalCoinsPerMinuteFormatted = await callTotalCoinsPerMinuteFormatted();
    //     let rewardInCoinsPerMinFormatted = rewardInCoinsPerMin.toFixed(8);
    //     $("#gpu_reward_min").val(rewardInCoinsPerMinFormatted);
    //     let rewardInCoinsPerHourFormatted = (rewardInCoinsPerMinFormatted * 60).toFixed(8);
    //     $("#gpu_reward_hour").val(rewardInCoinsPerHourFormatted);
    //     let rewardInCoinsPerDayFormatted = (rewardInCoinsPerHourFormatted * 24).toFixed(8);
    //     $("#gpu_reward_day").val(rewardInCoinsPerDayFormatted);
    //     let price = await callPrice();
    //     let rewardInUsdDaily = (rewardInCoinsPerDayFormatted * price).toFixed(8);
    //     $("#ethPrice5").val(rewardInUsdDaily);
    // }

    return (
        <div className="container">
            <div className="form-wrapper"> 
                <div className="input-group mt-3 blockTime"> 
                    <span className="input-group-text w100">Block Time</span> 
                    <input 
                    type="number" 
                    id="block" 
                    className="form-control" 
                    value={formData.blockTime} 
                    name="blockTime" 
                    onChange={handleChange} 
                    /> 
                </div> 
                <div className="input-group mt-3 net"> 
                    <span className="input-group-text w100">Network Hashrate</span> 
                    <input 
                    type="number" 
                    id="hash" 
                    className="form-control" 
                    value={formData.netHashrate} 
                    name="netHashrate" 
                    onChange={handleChange} 
                    /> 
                </div> 
                <div className="input-group mt-3 dolar"> 
                    <span className="input-group-text w100">Coin Price</span> 
                    <input 
                    type="number" 
                    id="coinPrice" 
                    className="form-control" 
                    value={formData.coinPrice} 
                    name="coinPrice" 
                    onChange={handleChange} 
                    /> 
                </div> 
                <div className="input-group mt-3 tsf"> 
                    <span className="input-group-text w100">Block Reward</span> 
                    <input 
                    type="number" 
                    id="blockReward" 
                    className="form-control" 
                    value={formData.blockReward} 
                    name="blockReward" 
                    onChange={handleChange} 
                    /> 
                </div> 
                
                <div className="input-group mt-3 tsf"> 
                    <span className="input-group-text w100">All coins per min</span> 
                    <input 
                    type="number" 
                    id="coinsPerMin" 
                    className="form-control" 
                    value={coinsPerMin} 
                    name="coinsPerMin" 
                    onChange={(e) => setCoinsPerMin(e.target.value)} 
                    /> 
                </div> 
                <div className="input-group mt-3 tsf"> 
                    <span className="input-group-text w100">All coins per hour</span> 
                    <input 
                    type="number" 
                    id="coinsPerHour" 
                    className="form-control" 
                    value={coinsPerHour} 
                    name="coinsPerHour" 
                    onChange={(e) => setCoinsPerHour(e.target.value)}
                    /> 
                </div> 
                <div className="input-group mt-3 tsf"> 
                    <span className="input-group-text w100">All coins per day</span> 
                    <input 
                    type="number" 
                    id="coinsPerDay" 
                    className="form-control" 
                    value={coinsPerDay} 
                    name="coinsPerDay" 
                    onChange={(e) => setCoinsPerDay(e.target.value)} 
                    /> 
                </div> 
                <div className="input-group mt-3 cpu"> 
                    <span className="input-group-text w100">Graphic card</span> 
                    <input 
                    type="number" 
                    id="graficka" 
                    className="form-control" 
                    value={graficka} 
                    name="graficka" 
                    onChange={(e) => setGraficka(e.target.value)}
                    /> 
                </div> 
                <div className="input-group mt-3 dolar"> 
                    <span className="input-group-text w100">My profit per min</span> 
                    <input 
                    type="number" 
                    id="rewardPerMin" 
                    className="form-control" 
                    value={rewardPerMin} 
                    name="rewardPerMin" 
                    onChange={(e) => setRewardPerMin(e.target.value)} 
                    /> 
                </div> 
                <div className="input-group mt-3 dolar"> 
                    <span className="input-group-text w100">My profit per hour</span> 
                    <input 
                    type="number" 
                    id="rewardPerHour" 
                    className="form-control" 
                    value={rewardPerHour} 
                    name="rewardPerHour" 
                    onChange={(e) => setRewardPerHour(e.target.value)} 
                    readonly
                    /> 
                </div> 
                <div className="input-group mt-3 tsf"> 
                    <span className="input-group-text w100">My profit per day</span> 
                    <input 
                    type="number" 
                    id="rewardPerDay" 
                    className="form-control" 
                    value={rewardPerDay} 
                    name="rewardPerDay" 
                    onChange={(e) => setRewardPerDay(e.target.value)} 
                    
                    /> 
                </div> 
                <div className="input-group mt-3 dolar"> 
                    <span className="input-group-text w100">Profit per day in dolars</span> 
                    <input 
                    type="text" 
                    id="rewardPerDayInDolars" 
                    className="form-control" 
                    value={rewardPerDayInDolars} 
                    name="rewardPerDayInDolars" 
                    onChange={(e) => setRewardPerDayInDolars(e.target.value)} 
                    /> 
                </div> 
            </div>
            {/* <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelHolder" id="labelHashrate">Network Hashrate:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control inputHolder" id="netHashrate" value={hashrate} onChange={handleHashrate}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelHolder" id="labelBlocktime">Blocktime:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control inputHolder" id="netBlocktime" value={blockTime}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelHolder" id="labelBlockReward">Block Reward:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control inputHolder" id="netBlockReward" value={blockReward}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelHolder" id="labelCoinPrice">Coin Price:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control inputHolder" id="netCoinPrice" value={price} onChange={handlePrice}></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelHolder" id="labelCoinPrice">Blocks per minute:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control inputHolder" id="netBlocksPerMin" value={min} onChange={handleChange}></input>
                </div>
            </div> */}
        </div>
        
    )
}
