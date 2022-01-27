import React from "react";
import './Toolbar.css';
import { useDispatch } from "react-redux";
import { ActionCreators } from 'redux-undo';
import UndoIcon from "./icons/undo.png";


export default function Redotool() {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(ActionCreators.redo())
    }

    return (
        <div
            className={"toolbar-item-basic"}
            onClick={handleClick}
        >
            <div className={"toolbar-icon-container"}>
                <img id={"redo-tool-icon"} className={"tool-icon"} src={UndoIcon} alt={"Save"}/>
                <br/>
                Redo
            </div>
        </div>
    )
}
