import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useDrop} from "react-dnd";

import {selectClassroom, selectDeskDims} from "../../states/Classroom";
import Seat from "./Seat";
import {DraggableItemTypes} from "./Draggables";
import './SeatLayout.css';
import {EditModeOptions, getCurrentEditMode} from "../../states/EditMode";
import {getSettings} from "../../states/Settings";
import SeatCoordinateManager from "../util/SeatCoordinateManager";

export default function SeatingLayout() {
    const classroom = useSelector(selectClassroom);
    const { deskWidth, deskHeight } = useSelector(selectDeskDims)
    const dispatch = useDispatch();
    const currentEditMode = useSelector(getCurrentEditMode);
    const deskCreatable = (currentEditMode === EditModeOptions.DESK_CREATE);
    const settings = useSelector(getSettings)

    const coordManager = new SeatCoordinateManager(settings, dispatch, deskWidth, deskHeight, classroom.width, classroom.height)

    const [state, setState] = useState({
        lastX: null,
        lastY: null,
        stackSz: 1
    })

    // This element is a drop target for Seat (to move seats around the classroom).
    const [, dropRef] = useDrop(() => ({
        accept: DraggableItemTypes.SEAT,
        drop: (item, monitor) => {
            let {seatId, xDisp, yDisp, coordManager} = item

            let dx = monitor.getDifferenceFromInitialOffset().x
            let dy = monitor.getDifferenceFromInitialOffset().y
            let newXDisp = xDisp + (100 * dx / coordManager.classWidth)
            let newYDisp = yDisp - (100 * dy / coordManager.classHeight)

            coordManager.setSeatCoordFromDisplayCoord(seatId, newXDisp, newYDisp)
        },
    }))

    let handleClick;
    if (deskCreatable) {
        handleClick = (e) => {
            let rect = e.currentTarget.getBoundingClientRect()
            let xDisp = e.pageX - rect.left
            let yDisp = rect.height - (e.pageY - rect.top)
            xDisp = 100 * (xDisp / classroom.width)
            yDisp = 100 * (yDisp / classroom.height)

            const addToStack = (state.lastX === xDisp && state.lastY === yDisp)
            const stackSz = addToStack ? state.stackSz : 0
            const stackScale = 1

            coordManager.addDeskFromDisplayCoord(xDisp + (stackScale * stackSz), yDisp + (stackScale * stackSz))
            setState({
                lastX: xDisp, lastY: yDisp,
                stackSz: addToStack ? state.stackSz + 1 : 1
            })
        }
    } else {
        handleClick = () => {}
    }

    let gridXs = [];
    let gridYs = [];
    if (settings.showGrid) {
        gridXs = coordManager.getGridXs();
        gridYs = coordManager.getGridYs();
    }

    let frontStyle = {
        height: "20px",
        border: "2px solid black",
    }
    if (!settings.flipOrientation) {
        frontStyle.WebkitTransform = "translate(-2px, 1px)"
        frontStyle.transform = "translate(-2px, 1px)"
    } else {
        frontStyle.WebkitTransform = `translate(-2px, -${classroom.height+25}px)`
        frontStyle.transform = `translate(-2px, -${classroom.height+25}px)`
    }

    return (
        <div
            id={"classroom-main-container"}
            style={{
                width: classroom.width + 'px',
                height: classroom.height + 'px'
            }}
        >
            <div className={"classroom-layout"}
                 ref={dropRef}
                 style={{
                     width: classroom.width + 'px',
                     height: classroom.height + 'px'
                 }}
                 onClick={handleClick}
            >
                {/*Note: the classroom-layout canvas is a div inside a div, so that the clickable region's
                       dimensions don't include the border.*/}
                {
                    Object.entries(classroom.seats).map(
                        ([seatId, _]) => {
                            return <Seat key={seatId} seatId={seatId}/>
                        }
                    )
                }
                {
                    gridYs.map(
                        (y, i) => {
                            return <hr key={i} style={{bottom: y + "%"}} className={"horizontal gridline"}/>
                        }
                    )
                }
                {
                    gridXs.map(
                        (x, i) => {
                            return <hr key={i} style={{left: x + "%"}} className={"gridline vertical"}/>
                        }
                    )
                }
            </div>
            <div className={"classroom-front"} style={frontStyle}>FRONT</div>
        </div>
    )
}
