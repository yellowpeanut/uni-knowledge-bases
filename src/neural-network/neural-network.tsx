import { LineChart, LineSeriesType } from '@mui/x-charts';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';
import "./neural-network.css"
import img_variant from "./img-variant.jpg"


export function NeuralNetwork () {

    function change_x_value(e: React.ChangeEvent<HTMLInputElement>){
        let ind = Number(e.currentTarget.id[1])
        let new_array = [...x_values]
        new_array[ind] = Number(e.currentTarget.value)
        set_x_values([...new_array])
    }

    function init_model(model: tf.Sequential){
        model.add(tf.layers.dense({units: num_neurons, activation: "sigmoid", inputShape: [train_data[0].shape[1]]}))
        model.add(tf.layers.dense({units: 1, activation: "sigmoid", inputShape: [num_neurons]}))
    
        model.compile({loss: 'meanSquaredError', optimizer: 'adam'})
        
        set_model(model)
    }

    function reset_model(){
        // while(model.layers.length > 0){
        //     model.pop()
        // }

        // model.add(tf.layers.dense({units: num_neurons, activation: "sigmoid", inputShape: [train_data[0].shape[1]]}))
        // model.add(tf.layers.dense({units: 1, activation: "sigmoid", inputShape: [num_neurons]}))
    
        // model.compile({loss: 'meanSquaredError', optimizer: 'adam'})

        init_model(tf.sequential())

        set_epochs_and_losses(undefined)
        set_weights(undefined)
        set_graph_data(undefined)
        // set_epochs_passed(0)
    }

    async function train_model(num_epochs: number){
        let _epochs_and_losses: number[][] = [[], []]
        let _weights: number[][][] = []

        model.fit(train_data[0], train_data[1], {
            epochs: num_epochs,
            
            callbacks:{
                onTrainBegin(){
                    _weights.push(model.layers[0].getWeights(true)[0]
                    .transpose().as2D(num_neurons, x_values.length).arraySync())
                },
                onEpochEnd(epoch, logs) {
                    if(logs){
                        //_epochs_and_losses[0].push(epoch + epochs_passed)
                        _epochs_and_losses[0].push(epoch)
                        _epochs_and_losses[1].push(Number(logs.loss))
                        _weights.push(model.layers[0].getWeights(true)[0]
                        .transpose().as2D(num_neurons, x_values.length).arraySync())
                    }
                },
                onTrainEnd(){
                    // if(epochs_and_losses !== undefined && weights !== undefined){
                    //     set_epochs_and_losses([
                    //         epochs_and_losses[0].concat(_epochs_and_losses[0]),
                    //         epochs_and_losses[1].concat(_epochs_and_losses[1])
                    //             ])
                    //     set_weights(weights.concat(_weights))
                    // }
                    // else{
                    //     set_epochs_and_losses(_epochs_and_losses)
                    //     set_weights(_weights)
                    // }
                    set_epochs_and_losses(_epochs_and_losses)
                    set_weights(_weights)
                    // set_epochs_passed(epochs_passed + num_epochs)
                    let _graph_data: number[][][] = []
                    for (let i = 0; i < num_neurons; i++) {
                        let _temp_data: number[][] = []
                        for (let j = 0; j < x_values.length; j++) {
                            _temp_data.push(
                                (_weights.map(w => w[i][j]))
                            )
                        }
                        _graph_data.push(_temp_data)
                    }
                    set_graph_data(_graph_data)
                }
            }
        })
    }

    function predict_value(){
        let res = model.predict(tf.tensor2d(x_values, [1, x_values.length])) as tf.Tensor
        set_prediction(res.flatten().arraySync()[0])
    }

    const num_neurons = 3
    const num_epochs = 5000
    const colours = ["red", "orange", "green", "blue", "black"]

    const train_data = [
        // x
        tf.tensor2d([
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 1, 0,
            1, 0, 0, 1, 1,
            1, 0, 1, 0, 0,
            1, 0, 1, 0, 1,
            1, 0, 1, 1, 0,
            1, 0, 1, 1, 1,
            1, 1, 0, 0, 0,
            1, 1, 0, 0, 1,
            1, 1, 0, 1, 0,
            1, 1, 0, 1, 1,
            1, 1, 1, 0, 0,
            1, 1, 1, 0, 1,
            1, 1, 1, 1, 0,
            1, 1, 1, 1, 1
        ], [16, 5]),
        // y
        tf.tensor2d([1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [16, 1])
    ]

    const [model, set_model] = useState<tf.Sequential>(tf.sequential())
    useEffect(() => {    
        init_model(model)
        }, []);

    const [epochs_and_losses, set_epochs_and_losses] = useState<number[][]>()
    // const [epochs_passed, set_epochs_passed] = useState<number>(0)
    const [weights, set_weights] = useState<number[][][]>()
    const [x_values, set_x_values] = useState<number[]>([1, 1, 1, 1, 1])
    const [prediction, set_prediction] = useState<number>()

    const [graph_data, set_graph_data] = useState<number[][][]>()

    return (
    <>
    <div id="project-3" className="project">

        {/* images of network */}
        <div className="images">
            <img src={img_variant} width={800}/>
        </div>
        {/* reset and train buttons */}
        <div className="setup-buttons">
            <button onClick={reset_model}>Пересоздать модель</button>
            <button id="train-btn" onClick={() => train_model(num_epochs)}>Тренировать</button>
        </div>
        {/* graphs */}
        {(epochs_and_losses !== undefined)?(
            <div className="charts">
                <div className="chart">
                <LineChart
                    xAxis={[{data:epochs_and_losses[0],
                        label: "Этап тренировки"}]}
                    series={[
                        {data:epochs_and_losses[1],
                        showMark: false,
                        label: "Потери точности модели",
                        color: "red"},
                    ]}
                    width={800}
                    height={400}
                 />
                 </div>
                 {(weights !== undefined && graph_data !== undefined)?(
                    weights[0].map((neuron, ind) => 
                    <div className='chart' key={ind}>
                    <div className="chart-graph">
                        <LineChart
                            xAxis={[{data: ([-1].concat(epochs_and_losses[0])),
                                label: "Этап тренировки"}]}
                            series={
                                neuron.map<LineSeriesType>((_, index) =>
                                ({data: graph_data[ind][index],
                                showMark: false,
                                label: "x" + index.toString(),
                                color: colours[index]}) as LineSeriesType
                                )
                            }
                            width={800}
                            height={400}
                        />
                    </div>
                    <div className="chart-info">
                        <h5>Нейрон {ind+1}</h5>
                        <p>Начальные х: [ {(weights[0][ind]).map(w => w.toPrecision(4).toString() + " ")}]</p>
                        <p>Конечные х: [ {(weights[num_epochs][ind]).map(w => w.toPrecision(4).toString() + " ")}]</p>
                    </div>
                    </div>)
                 ): (<></>)}
            </div>
        ) : (<></>)}


        {/* test inputs */}

        <div className="input-fields">
            <div className="input-field">
                <p> x1: <output id="x1-out">{x_values[1]}</output></p>
                <input id="x1-in" type="range" min="0" max="1" step="0.0005" onInput={change_x_value}/>
            </div>
            <div className="input-field">
                <p> x2: <output id="x2-out">{x_values[2]}</output></p>
                <input id="x2-in" type="range" min="0" max="1" step="0.0005" onInput={change_x_value}/>
            </div>
            <div className="input-field">
                <p> x3: <output id="x3-out">{x_values[3]}</output></p>
                <input id="x3-in" type="range" min="0" max="1" step="0.0005" onInput={change_x_value}/>
            </div>
            <div className="input-field">
                <p> x4: <output id="x4-out">{x_values[4]}</output></p>
                <input id="x4-in" type="range" min="0" max="1" step="0.0005" onInput={change_x_value}/>
            </div>
        </div>

        {/* results */}

        {(prediction !== undefined) ? (
            <div className="result">
                Предполагаемое значение выхода: {prediction}
            </div>
        ) : (<></>)}
        
        <div className="get-results">
            <button onClick={predict_value}>Получить выход</button>
        </div>

    </div>
    </>
    )
}