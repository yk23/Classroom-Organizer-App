import React from "react";
import './Toolbar.css';
import { useDispatch } from "react-redux";
import { ActionCreators } from 'redux-undo';
import UndoIcon from "./icons/undo.png";


export default function UndoTool() {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(ActionCreators.undo())
    }

    return (
        <div
            className={`toolbar-item-basic`}
            onClick={handleClick}
        >
            <div className={"toolbar-icon-container"}>
                <img id={"undo-tool-icon"} className={"tool-icon"} src={UndoIcon} alt={"Save"}/>
                <br/>
                Undo
            </div>
        </div>
    )
}
