import React from "react";
import {getFocusedStudent, focusStudent} from "../../states/FocusedStudent";
import {modifyStudent} from "../../states/Classroom";

import {useDispatch, useSelector} from "react-redux";
import StudentForm from "./StudentForm";
import './StudentPane.css'


export default function StudentPane() {
    const studentId = useSelector(getFocusedStudent)
    const dispatch = useDispatch();

    function handle_close() {
        dispatch(focusStudent({studentId: null}))
    }

    function handle_submit(values) {
        dispatch(modifyStudent({
            studentId: studentId,
            studentObj: values
        }))
    }

    if (studentId == null) {
        return <div id={"student-pane"}>Click on a student to edit.</div>
    } else {
        return (
            <div id={"student-pane"}>
                <div style={{textAlign: "right"}}>
                    <span style={{fontWeight: "bold"}}>
                        <button onClick={handle_close}>
                            &#10006;
                        </button>
                    </span>
                </div>
                <div id={"student-pane-header"}>
                    <span style={{fontWeight: "bold"}}>Edit Student</span>
                </div>
                <StudentForm studentId={studentId} onSubmit={handle_submit}/>
            </div>
        )
    }
}
