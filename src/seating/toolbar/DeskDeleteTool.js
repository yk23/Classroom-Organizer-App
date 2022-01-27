import React from "react";
import './Toolbar.css';
import {useDispatch} from "react-redux";
import {EditModeOptions, setEditMode} from "../../states/EditMode";


export default function DeskDeleteTool(params) {
    const isActive = params.active
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setEditMode({choice: EditModeOptions.DESK_DELETE}))
    }

    const className = isActive ? "toolbar-item-active" : "toolbar-item-inactive"
    return (
        <div
            className={`toolbar-item-basic ${className}`}
            onClick={handleClick}
        >
            Delete Desk
        </div>
    )
}
