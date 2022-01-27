import { createSlice } from '@reduxjs/toolkit';

export const focusedStudent = createSlice({
    name: 'editMode',
    initialState: { studentId: null },
    reducers: {
        focusStudent: (state, action) => {
            state.studentId = action.payload.studentId
        }
    }
})

export const { focusStudent } = focusedStudent.actions
export const getFocusedStudent = state => state.focusedStudent.studentId
export default focusedStudent.reducer;
