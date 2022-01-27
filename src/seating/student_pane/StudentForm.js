import React from "react";
import {connect, useDispatch} from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {deleteStudent, studentGetter} from "../../states/Classroom"
import {getFocusedStudent, focusStudent} from "../../states/FocusedStudent";
import {useSelector} from "react-redux";
import './StudentForm.css';


function StudentPhoto(props) {
    if (props.url === '' || props.url == null) {
        return <div className={"photo"}>
            <span className={"missing-photo"}>No Photo found.</span>
        </div>
    } else {
        return <div className={"photo"}>
            <img
                className={"photo-preview"}
                src={props.url}
                alt={"Student"}
            />
        </div>
    }
}


function StudentForm(props) {
    // const { handleSubmit, pristine, reset, submitting } = props;
    const handleSubmit = props.handleSubmit
    const pristine = props.pristine
    const submitting = props.submitting
    const currentPhotoUrl = props.photoUrl
    const studentId = useSelector(getFocusedStudent)
    const student = useSelector(studentGetter(studentId));

    const dispatch = useDispatch();
    let handleDelete = (e) => {
        dispatch(focusStudent({studentId: null}))
        dispatch(deleteStudent({studentId: studentId}))
        e.preventDefault()
    }

    /* IDEA: have the "new student" button create a student with empty fields. Dedicate this to editing existing students. */
    return (
        <form onSubmit={handleSubmit}>
        <table id={"student-form"}>
            <tbody>
            <tr>
                <th>Last Name:</th>
                <td>
                    <Field type={"text"} name={"lastName"} component={"input"} placeholder={"Last Name"}/>
                </td>
            </tr>
            <tr>
                <th>First Name:</th>
                <td>
                    <Field type={"text"} name={"firstName"} component={"input"} placeholder={"First Name"}/>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <StudentPhoto url={currentPhotoUrl}/>
                </td>
            </tr>
            <tr>
                <th>Photo:</th>
                <td>
                    <Field
                        type={"text"}
                        name={"photo"}
                        component={"input"}
                        placeholder={"https://example.com"}
                        value={student['photo']}
                        size={20}
                    />
                </td>
            </tr>
            <tr>
                <th colSpan={2}>Notes:</th>
            </tr>
            <tr>
                <td colSpan={2}>
                    <Field component={"textarea"} name={"notes"}
                           cols={38} rows={7}
                           placeholder={"Student-specific notes"}/>
                </td>
            </tr>
            <tr>
                <td align={"left"}>
                    <button type={"submit"} disabled={pristine || submitting}>Save Student Info</button>
                </td>
                <td align={"right"}>
                    <button
                        className="delete-student"
                        onClick={handleDelete}
                    >
                        Delete Student
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
        </form>
    )
}

// eslint-disable-next-line no-func-assign
StudentForm = reduxForm({
    form: 'focusedStudent',   /* Name of the form */
    enableReinitialize : true
})(StudentForm)

// enable form value updating via selectors
const selector = formValueSelector('focusedStudent') // <-- same as form name
export default connect(
    state => ({
        initialValues: state.classroom.present.students[state.focusedStudent.studentId],
        photoUrl: selector(state, 'photo')
    })
)(StudentForm)
