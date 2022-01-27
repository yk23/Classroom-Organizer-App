import React from "react";
import './Toolbar.css';
import SaveIcon from './icons/save.png'
import {useSelector} from "react-redux";
import {selectClassroom} from "../../states/Classroom";


export default function SaveTool() {
    const classroom = useSelector(selectClassroom)

    let json = JSON.stringify({
        classroom: classroom
    }, null, 2)

    function handleClick() {
        const blob = new Blob(
            [json],
            {type: 'application/json'}
        ); //pass data from localStorage API to blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${classroom.name}.json`;
        a.click();
    }

    return (
        <div className={"toolbar-item-basic"} onClick={handleClick}>
            <div className={"toolbar-icon-container"}>
                <img id={"save-tool-icon"} className={"tool-icon"} src={SaveIcon} alt={"Save"}/>
                <br/>
                Save
            </div>
        </div>
    )
}
