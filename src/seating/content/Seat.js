import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

import StudentBox from "./StudentBox";
import {studentInSeatGetter, seatGetter, selectDeskDims, selectClassroomDims, removeDesk} from "../../states/Classroom";
import {getCurrentEditMode, EditModeOptions} from "../../states/EditMode";
import {DraggableItemTypes} from "./Draggables";

import wood from './images/desk-wood.jpg'
import {getSettings} from "../../states/Settings";
import SeatCoordinateManager from "../util/SeatCoordinateManager";


export default function Seat(props) {
    const settings = useSelector(getSettings)
    const dispatch = useDispatch();
    const { classroomWidth, classroomHeight } = useSelector(selectClassroomDims)
    const { deskWidth, deskHeight } = useSelector(selectDeskDims)
    const currentEditMode = useSelector(getCurrentEditMode)
    const draggable = (currentEditMode === EditModeOptions.DESK_MOVE);

    const seatId = props.seatId;
    const studentIdInSeat = useSelector(studentInSeatGetter(seatId))
    const seatObj = useSelector(seatGetter(seatId))

    const coordManager = new SeatCoordinateManager(settings, dispatch, deskWidth, deskHeight, classroomWidth, classroomHeight)
    const [xDisp, yDisp] = coordManager.getDisplaySeatCoord(seatObj)

    // This element is a drop target for StudentBox.
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: DraggableItemTypes.STUDENT,
        drop: () => ({ action: 'assign', seatId: seatId }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    }))

    // this element can be dragged in LAYOUT_EDIT mode.
    const [, dragRef, dragPreview] = useDrag({
        type: DraggableItemTypes.SEAT,
        item: () => {return {
            seatId: seatId,
            xDisp: xDisp, yDisp: yDisp,
            coordManager: coordManager
        }},
        canDrag: () => { return draggable }
    })

    // Disable native drag-preview (positioning is off. will draw manually using CustomDragLayer)
    // Example from https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_js/02-drag-around/custom-drag-layer
    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
    });

    /* Mode-specific settings. */
    let activeRef = null;
    let handleClick = () => {};
    let cursor = "default"
    if (currentEditMode === EditModeOptions.DESK_MOVE) {
        activeRef = dragRef
        cursor = "move"
    } else if (currentEditMode === EditModeOptions.STUDENT_MOVE) {
        activeRef = dropRef
        cursor = "default"
    } else if (currentEditMode === EditModeOptions.DESK_DELETE) {
        handleClick = () => {
            dispatch(removeDesk({seatId: seatId}))
        }
        cursor = "not-allowed"
    }

    /* ======================== RENDER CODE ===================== */
    // If a student is sitting in this seat, render it.
    let seat_label, isOpen;
    if (studentIdInSeat == null) {
        seat_label = null
        isOpen = true
    } else {
        seat_label = <StudentBox studentId={studentIdInSeat} draggable={true}/>
        isOpen = false
    }

    // Handle active dragging events.
    let classname = 'classroom-seat classroom-item'
    if (canDrop) {  // is a studentbox being dragged? if it is, then render with additional classes.
        if (isOpen) {
            if (isOver) {
                classname = `${classname} seat-active`
            } else {
                classname = `${classname} seat-open`
            }
        } else {
            if (isOver) {
                classname = `${classname} seat-active`
            } else {
                classname = `${classname} seat-taken`
            }
        }
    }

    let style = {
        cursor: cursor,
        width: `${deskWidth}px`,
        height: `${deskHeight}px`,
        backgroundImage: `url(${wood})`,
        left: `${xDisp}%`,
        bottom: `${yDisp}%`
    }
    if (settings.flipOrientation) {
        style.WebkitTransform = "translate(-100%, +100%)";
        style.transform = "translate(-100%, +100%)";
    }

    return (
        <div
            className={classname}
            ref={activeRef}
            style={style}
            onClick={handleClick}
        >
            {seat_label}
        </div>
    )
}
