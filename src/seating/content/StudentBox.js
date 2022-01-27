import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useDrag } from 'react-dnd'

import { DraggableItemTypes } from "./Draggables"
import {
    studentGetter,
    assignStudentToSeat,
    removeStudentFromSeat,
    selectDeskDims,
} from "../../states/Classroom"
import {EditModeOptions, getCurrentEditMode} from "../../states/EditMode";
import {focusStudent} from "../../states/FocusedStudent";
import {getEmptyImage} from "react-dnd-html5-backend";

import person from './images/person-outline.png'


export default function StudentBox(props) {
    const { deskWidth, deskHeight } = useSelector(selectDeskDims)
    const student = useSelector(studentGetter(props.studentId))
    const dispatch = useDispatch();
    const currentEditMode = useSelector(getCurrentEditMode)
    const draggable = (currentEditMode === EditModeOptions.STUDENT_MOVE) && (props.draggable)

    function handle_click() {
        dispatch(focusStudent({studentId: props.studentId}))
    }

    const [{ isDragging }, dragRef, dragPreview] = useDrag({
        type: DraggableItemTypes.STUDENT,
        item: () => {
            return { studentId: props.studentId }
        },
        canDrag: () => { return draggable },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (dropResult == null || item == null) {
                return
            }

            if (dropResult.action === 'assign') {
                dispatch(assignStudentToSeat({studentId: props.studentId, seatId: dropResult.seatId}))
            } else if (dropResult.action === 'unassign') {
                dispatch(removeStudentFromSeat({studentId: props.studentId}))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    // Disable native drag-preview (positioning is off. will draw manually using CustomDragLayer)
    // Example from https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_js/02-drag-around/custom-drag-layer
    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
    });

    /* Mode-specific settings. */
    let cursor = "default"
    if (currentEditMode === EditModeOptions.STUDENT_MOVE) {
        cursor = "move"
    }

    let opacity = isDragging ? 0.4 : 1.0
    let background = person
    let backgroundAlpha = 0.70
    if (student.photo != null && student.photo !== '') {
        background = student.photo
        backgroundAlpha = 0.35
    }
    return (
        <div
            ref={dragRef}
            className={'student-box classroom-item'}
            style={{
                cursor: cursor,
                width: `${deskWidth}px`,
                height: `${deskHeight}px`,
                opacity: opacity,
                backgroundImage: `linear-gradient(rgba(255,255,255,${backgroundAlpha}), rgba(255,255,255,${backgroundAlpha})), url(${background})`
            }}
            onClick={handle_click}
        >
            <span>{student.lastName},<br/>{student.firstName}</span>
        </div>
    )
}
