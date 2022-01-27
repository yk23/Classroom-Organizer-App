import React from "react";
import {useSelector} from "react-redux";

import {selectClassroom} from "../../states/Classroom";
import StudentBox from "./StudentBox";
import {useDrop} from "react-dnd";
import {DraggableItemTypes} from "./Draggables";

import "./Unassigned.css"


export default function UnassignedStudents() {
    const classroom = useSelector(selectClassroom)

    // This element is a drop target for StudentBox.
    const [, dropRef] = useDrop(() => ({
        accept: DraggableItemTypes.STUDENT,
        drop: () => ({ action: 'unassign', seatId: null }),
        // collect: (monitor) => ({
        // }),
    }))

    // Render all students not currently assigned to desks.
    let student_elements = []
    for (let studentId in classroom.students) {
        let seat = classroom.studentToSeat[studentId]
        if (seat == null) {
            student_elements.push(
                <StudentBox key={studentId} studentId={studentId} draggable={true}/>
            )
        }
    }
    return (
        <div className={"classroom-app-unassigned"} ref={dropRef}>
            <span className={"unassigned-section-title"}>Unassigned Students (click and drag):</span>
            <div className={"unassigned-section-main"}>
                {student_elements}
            </div>
        </div>
    )
}
