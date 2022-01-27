import {configureStore} from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form'
import classroomReducer from "./Classroom";
import settingsReducer from "./Settings"
import editModeReducer from "./EditMode";
import focusedStudentReducer from "./FocusedStudent"


export function configureAllStates() {
    return configureStore({
        reducer: {
            classroom: classroomReducer,
            editMode: editModeReducer,
            settings: settingsReducer,
            focusedStudent: focusedStudentReducer,
            form: formReducer
        },
    });
}
