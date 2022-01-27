import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import ClassroomRender from './content/ClassroomRender';
import SideMenu from './sidemenu/SideMenu'
import Toolbar from './toolbar/Toolbar'
import StudentPane from './student_pane/StudentPane'
import {CustomDragLayer} from "./content/CustomDragLayer";

import './SeatingAssignmentApp.css';

export function SeatingAssignmentApp() {
    return (
        <DndProvider debugMode={true} backend={HTML5Backend}>
            {/*<EditModeMenu/>*/}
            <div id={"seating-app-body"}>
                <Toolbar/>
                <ClassroomRender/>
                <StudentPane/>
                <CustomDragLayer/>
            </div>
            <SideMenu/>
        </DndProvider>
    )
}
