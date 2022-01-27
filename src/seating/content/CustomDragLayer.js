import { useDragLayer } from 'react-dnd';
import { DraggableItemTypes } from "./Draggables";
import StudentBox from "./StudentBox"
import {useSelector} from "react-redux";
import {selectDeskDims} from "../../states/Classroom";

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

export const CustomDragLayer = () => {
    const { deskWidth, deskHeight } = useSelector(selectDeskDims)
    const { item, itemType, isDragging, initialOffset, currentOffset, } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));
    function renderItem() {
        switch (itemType) {
            case DraggableItemTypes.SEAT:
                return <div
                    className={"classroom-item classroom-seat"}
                    style={{
                        opacity: 0.5,
                        width: deskWidth,
                        height: deskHeight
                    }}
                >
                    &nbsp;
                </div>;
            case DraggableItemTypes.STUDENT:
                return <StudentBox draggable={false} studentId={item.studentId}/>
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (<div id={"custom-drag-layer"} style={layerStyles}>
        <div style={getItemStyles(initialOffset, currentOffset)}>
            {renderItem()}
        </div>
    </div>);
};