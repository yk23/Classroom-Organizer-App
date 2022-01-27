import { createSlice } from '@reduxjs/toolkit';

export const EditModeOptions = {
    STUDENT_MOVE: 0,
    DESK_MOVE: 1,
    DESK_CREATE: 2,
    DESK_DELETE: 3
}

export const editMode = createSlice({
    name: 'editMode',
    initialState: { mode: EditModeOptions.STUDENT_MOVE },
    reducers: {
        setEditMode: (state, action) => {
            state.mode = action.payload.choice
        }
    }
})

export const { setEditMode } = editMode.actions
export const getCurrentEditMode = state => state.editMode.mode
export default editMode.reducer;
