import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentEditMode, setEditMode, EditModeOptions} from "../../states/EditMode"
import './EditMenu.css';


export default function EditModeMenu() {
    let activeChoice = useSelector(getCurrentEditMode);

    return (
        <div id={"editmode-menu"}>
            <ul>
                <li>Edit Mode:</li>
                <li><EditModeMenuItem itemValue={EditModeOptions.STUDENT_MOVE} activeChoice={activeChoice}/></li>
                <li><EditModeMenuItem itemValue={EditModeOptions.DESK_MOVE} activeChoice={activeChoice}/></li>
            </ul>
        </div>
    )
}


function EditModeMenuItem({itemValue, activeChoice}) {
    const dispatch = useDispatch();
    const isActive = (itemValue === activeChoice);

    const handleClick = () => {
        dispatch(setEditMode({choice: itemValue}))
    }

    let textBody;
    if (itemValue === EditModeOptions.STUDENT_MOVE) {
        textBody = "Seat Assignment"
    } else if (itemValue === EditModeOptions.DESK_MOVE) {
        textBody = "Class Layout"
    }

    return (
        <button
            onClick={handleClick}
            className={isActive ? "editmenu-item-active" : "editmenu-item-inactive"}
        >
            {textBody}
        </button>
    )
}