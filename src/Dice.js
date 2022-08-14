import React from "react"
import "./App"


export default function Dice(props){

    // stores an object to be used to determine background color
    const bgColor = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };

    return (
        // Pass callback function into eventhandler(onClick)
        // callback will call a function you passed through props
        // this also allows us to pass in an argument into function
        // otherwise without callback it would just call the function at all times.
        <div className="dice" onClick={() => props.handler(props.id)} style={bgColor}>
            <h2 className="dice-number">{props.value}</h2>
        </div>
    )
};