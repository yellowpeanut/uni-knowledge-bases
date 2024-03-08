import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';

import "./unclear-info.css"

export function UnclearInfo () {

    function consumption_small(G:number){
        let res = Math.pow(Math.exp(-0.2* Math.log(10*Math.abs(G-75.1))), 2)
        if (Number.isNaN(res)) res = Math.pow(1e-1, pres)
        return Number(res.toPrecision(pres))
    }
    function consumption_avg(G:number){
        let res = Math.pow(Math.exp(-0.2* Math.log(10*Math.abs(G-85.1))), 2)
        if (Number.isNaN(res)) res = Math.pow(1e-1, pres)
        return Number(res.toPrecision(pres))
    }
    function consumption_big(G:number){
        let res = Math.pow(Math.exp(-0.2* Math.log(10*Math.abs(G-100.1))), 2)
        if (Number.isNaN(res)) res = Math.pow(1e-1, pres)
        return Number(res.toPrecision(pres))
    }

    function pressure_small(P:number){
        let res = Math.abs(1/(1+0.5*P))
        if (res === Infinity) res = Math.pow(1e-1, pres)
        return Number(res.toPrecision(pres))
    }
    function pressure_avg(P:number){
        let res = Math.abs(1/(1+0.5*Math.abs(P-25)))
        if (res === Infinity) res = Math.pow(1e-1, pres)
        return Number(res.toPrecision(pres))
    }
    function pressure_big(P:number){
        let res = Math.abs(1/(1+0.5*Math.abs(P-50)))
        if (res === Infinity) res = Math.pow(1e-1, pres)
        return Number(res.toPrecision(pres))
    }

    function changeConsumption(e: React.ChangeEvent<HTMLInputElement>){
        setConsumption(Number(e.currentTarget.value))
    }
    function changePressure(e: React.ChangeEvent<HTMLInputElement>){
        setPressure(Number(e.currentTarget.value))
    }

    function calculate(){
        let G = Number((document.getElementById("consumption-out") as HTMLOutputElement).value)
        let P = Number((document.getElementById("pressure-out") as HTMLOutputElement).value)

        let [c_big, c_avg, c_small] = [consumption_big(G), consumption_avg(G), consumption_small(G)]
        let [p_big, p_avg, p_small] = [pressure_big(P), pressure_avg(P), pressure_small(P)]

        let cnsts = [
            [c_small, p_small, c_small, p_avg, c_avg, p_small],
            [c_small, p_big, c_avg, p_avg, c_big, p_small],
            [c_avg, p_big, c_big, p_avg, c_big, p_big],
            [Number(
                Math.sqrt(Math.abs(1-c_avg))
                .toPrecision(pres)), p_small, p_avg, p_small]
        ]

        let mxs = [
            Math.max(cnsts[0][0]+cnsts[0][1], cnsts[0][2]+cnsts[0][3], cnsts[0][4]+cnsts[0][5]),
            Math.max(cnsts[1][0]+cnsts[1][1], cnsts[1][2]+cnsts[1][3], cnsts[1][4]+cnsts[1][5]),
            Math.max(cnsts[2][0]+cnsts[2][1], cnsts[2][2]+cnsts[2][3], cnsts[2][4]+cnsts[2][5]),
            Math.max(cnsts[3][0]+cnsts[3][1], cnsts[3][2], cnsts[0][3])
        ]
        let mx = Math.max(...mxs)

        setConstructions(cnsts)
        setMaxs(mxs)
        setMax(mx)
    }

    const pres = 4
    const consumption_bounds = [70, 110]
    const pressure_bounds = [0, 50]

    let cxChart:number[] = []
    let cy_small_Chart:number[] = []
    let cy_avg_Chart:number[] = []
    let cy_big_Chart:number[] = []

    let pxChart:number[] = []
    let py_small_Chart:number[] = []
    let py_avg_Chart:number[] = []
    let py_big_Chart:number[] = []

    for(let i=consumption_bounds[0]; i<=consumption_bounds[1]; i++){
        cxChart.push(i)
        cy_small_Chart.push(consumption_small(i))
        cy_avg_Chart.push(consumption_avg(i))
        cy_big_Chart.push(consumption_big(i))
    }
    for(let i=pressure_bounds[0]; i<=pressure_bounds[1]; i++){
        pxChart.push(i)
        py_small_Chart.push(pressure_small(i))
        py_avg_Chart.push(pressure_avg(i))
        py_big_Chart.push(pressure_big(i))
    }

    const [consumption_value, setConsumption] = useState<number>(consumption_bounds[0])
    const [pressure_value, setPressure] = useState<number>(pressure_bounds[1])

    const [constructions, setConstructions] = useState<number[][]>([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0]
    ])
    const [maxs, setMaxs] = useState<number[]>([0, 0, 0, 0])
    const [max, setMax] = useState<number>(0)

    return (
    <>
    <div id="project-2" className="project">
        <div className="main-info">
            <div className="input-fields">
                <div className="input-field">
                    <p>Расход сырья: <output id="consumption-out">{consumption_value}</output></p>
                    <input id="consumption-in" type="range" min="70" max="110" step="0.5" onInput={changeConsumption}/>
                </div>
                <div className="input-field">
                    <p>Давление: <output id="pressure-out">{pressure_value}</output></p>
                    <input id="pressure-in" type="range" min="0" max="50" step="0.5" onInput={changePressure}/>
                </div>
            </div>
            <div className="charts">
                <LineChart
                    xAxis={[{data:cxChart,
                        label: "Расход сырья"}]}
                    series={[
                        {data:cy_small_Chart,
                        showMark: false,
                        label: "Малый",
                        color: "green"},

                        {data:cy_avg_Chart,
                        showMark: false,
                        label: "Средний",
                        color: "orange"},

                        {data:cy_big_Chart,
                        showMark: false,
                        label: "Большой",
                        color: "red"}
                    ]}
                    width={800}
                    height={400}
                 />
                <LineChart
                    xAxis={[{data:pxChart,
                        label: "Давление"}]}
                    series={[
                        {data:py_small_Chart,
                        showMark: false,
                        label: "Малое",
                        color: "green"},

                        {data:py_avg_Chart,
                        showMark: false,
                        label: "Среднее",
                        color: "orange"},

                        {data:py_big_Chart,
                        showMark: false,
                        label: "Большое",
                        color: "red"}
                    ]}
                    width={800}
                    height={400}
                 />
            </div>
        </div>
        <div className="construction-cards">
            <div className="construction-card">
                <h4>Конструкция 1</h4>
                <p>Расход сырья = малый ({constructions[0][0]}) | Давление = малое ({constructions[0][1]}) | {constructions[0][0]+constructions[0][1]}</p>
                <p>Расход сырья = малый ({constructions[0][2]}) | Давление = среднее ({constructions[0][3]}) | {constructions[0][2]+constructions[0][3]}</p>
                <p>Расход сырья = средний ({constructions[0][4]}) | Давление = малое ({constructions[0][5]}) | {constructions[0][4]+constructions[0][5]}</p>
                <h5>Максимальное: {maxs[0]}</h5>
            </div>
            <div className="construction-card">
                <h4>Конструкция 2</h4>
                <p>Расход сырья = малый ({constructions[1][0]}) | Давление = большое ({constructions[1][1]}) | {constructions[1][0]+constructions[1][1]}</p>
                <p>Расход сырья = средний ({constructions[1][2]}) | Давление = среднее ({constructions[1][3]}) | {constructions[1][2]+constructions[1][3]}</p>
                <p>Расход сырья = большой ({constructions[1][4]}) | Давление = малое ({constructions[1][5]}) | {constructions[1][4]+constructions[1][5]}</p>
                <h5>Максимальное: {maxs[1]}</h5>
            </div>
            <div className="construction-card">
                <h4>Конструкция 3</h4>
                <p>Расход сырья = средний ({constructions[2][0]}) | Давление = большое ({constructions[2][1]}) | {constructions[2][0]+constructions[2][1]}</p>
                <p>Расход сырья = большой ({constructions[2][2]}) | Давление = среднее ({constructions[2][3]}) | {constructions[2][2]+constructions[2][3]}</p>
                <p>Расход сырья = большой ({constructions[2][4]}) | Давление = большое ({constructions[2][5]}) | {constructions[2][4]+constructions[2][5]}</p>
                <h5>Максимальное: {maxs[2]}</h5>
            </div>
            <div className="construction-card">
                <h4>Конструкция 4</h4>
                <p>Расход сырья = слегка не средний ({constructions[3][0]}) | Давление = малое ({constructions[3][1]}) | {constructions[3][0]+constructions[3][1]}</p>
                <p>Давление = среднее ({constructions[3][2]})</p>
                <p>Давление = большое ({constructions[3][3]})</p>
                <h5>Максимальное: {maxs[3]}</h5>
            </div>
        </div>
        {(max !== 0)?(
                <div className="result">
                    Рекомендуется использовать конструкцию №{maxs.indexOf(max)+1} (Вероятность: {max}) 
                </div>
            ):(<></>)}
        <div className="get-results">
            <button onClick={calculate}>Рассчитать</button>
        </div>
    </div>
    </>
    )
}