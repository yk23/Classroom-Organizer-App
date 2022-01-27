import React from "react";
import "./ClassroomName.css"
import {useDispatch} from "react-redux";
import {setClassroomName} from "../../states/Classroom";


export default function ClassroomName(props) {
    const classroomName = props.value
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setClassroomName({newName: e.target.value}))
    }

    return (
        <div id={"classroom-title"}>
            <form onSubmit={(e) => e.preventDefault()}>
                <span>CLASS NAME:</span>
                <input
                    id={"classroom-title-input"}
                    type={"text"}
                    value={classroomName}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}
