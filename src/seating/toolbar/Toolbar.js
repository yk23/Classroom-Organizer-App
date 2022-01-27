import React from "react";
import './Toolbar.css';

import SaveTool from "./SaveTool";
import LoadTool from "./LoadTool";
import StudentMoveTool from "./StudentMoveTool";
import DeskMoveTool from "./DeskMoveTool";
import DeskCreateTool from './DeskCreateTool'
import {EditModeOptions, getCurrentEditMode} from "../../states/EditMode";
import {useSelector} from "react-redux";
import DeskDeleteTool from "./DeskDeleteTool";
import UndoTool from "./UndoTool";
import RedoTool from "./RedoTool";
import StudentCreateTool from "./StudentCreateTool";


export default function Toolbar() {
    const editMode = useSelector(getCurrentEditMode);

    return (
        <div id={"toolbar-main"}>
            <SaveTool/>
            <LoadTool/>
            <UndoTool/>
            <RedoTool/>
            <StudentMoveTool active={editMode === EditModeOptions.STUDENT_MOVE}/>
            <DeskMoveTool active={editMode === EditModeOptions.DESK_MOVE}/>
            <DeskCreateTool active={editMode === EditModeOptions.DESK_CREATE}/>
            <DeskDeleteTool active={editMode === EditModeOptions.DESK_DELETE}/>
            <StudentCreateTool/>
        </div>
    )
}
