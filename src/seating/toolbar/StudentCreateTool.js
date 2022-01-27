import React from "react";
import './Toolbar.css';
import {useDispatch} from "react-redux";
import {addStudent} from "../../states/Classroom";


export default function StudentCreateTool() {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(addStudent({}))
    }

    return (
        <div
            className={`toolbar-item-basic`}
            onClick={handleClick}
        >
            New Student
        </div>
    )
}
