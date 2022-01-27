import React from "react";
import {EditModeOptions, setEditMode} from "../../states/EditMode";
import './Toolbar.css';
import {useDispatch} from "react-redux";


export default function StudentMoveTool(params) {
    const isActive = params.active
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setEditMode({choice: EditModeOptions.STUDENT_MOVE}))
    }

    const className = isActive ? "toolbar-item-active" : "toolbar-item-inactive"
    return (
        <div
            className={`toolbar-item-basic ${className}`}
            onClick={handleClick}
        >
            Move Student
        </div>
    )
}
