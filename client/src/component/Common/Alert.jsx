import React, { useState } from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Container } from "@chakra-ui/react";

function AlertComponent(props){
    const [OptionsState, setOptionsState] = useState({
        Show: false,
        ButtonClicked: false
    })
    if(OptionsState.ButtonClicked){
        setOptionsState({
            Show: false,
            ButtonClicked: false
        })
        return(<></>)
    }
    if(props.show != OptionsState.Show) {
        setOptionsState( {
            Show: props.show,
            ButtonClicked: OptionsState.ButtonClicked
        })
    }
    if(!props.show) return(<></>)

    return (
        <Alert 
            //alignItems="center"
            //justifyContent="center"
            //textAlign="center"
            status={props.status} 
        >
            <AlertIcon />
            <AlertTitle mr={2}>{props.title}</AlertTitle>
            <AlertDescription>{props.description}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" 
                onClick={()=>{
                    setOptionsState( {
                        Show: OptionsState.Show,
                        ButtonClicked: true
                    })
                }} />
        </Alert>
        
    )
}
export default AlertComponent