import UnassignedStudents from "./Unassigned";
import React from "react";
import SeatingLayout from "./SeatLayout";
import {useSelector} from "react-redux";
import {selectClassroom} from "../../states/Classroom";
import ClassroomName from "./ClassroomName";

export default function ClassroomRender() {
    const classroom = useSelector(selectClassroom);

    return (
        <div
            style={{
                width: classroom.width + 'px',
                marginLeft: '1em',
                marginRight: '1em',
                textAlign: 'center'
            }}
        >
            <ClassroomName value={classroom.name}/>
            <SeatingLayout/>
            <UnassignedStudents/>
        </div>
    )
}
