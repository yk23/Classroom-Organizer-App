import { createSlice } from '@reduxjs/toolkit';

export const settings = createSlice({
    name: 'settings',
    initialState: {
        snapToGrid: true,
        gridSizePctX: 7.5,  // percent, e.g. 5 means 5%
        gridSizePctY: 8.0,
        showGrid: false,
        flipOrientation: false,
    },
    reducers: {
        setSnapToGrid: (state, action) => {
            state.snapToGrid = action.payload
        },
        setGridSizeX: (state, action) => {
            state.gridSizePctX = action.payload
        },
        setGridSizeY: (state, action) => {
            state.gridSizePctY = action.payload
        },
        setShowGrid: (state, action) => {
            state.showGrid = action.payload
        },
        setFlipOrientation: (state, action) => {
            state.flipOrientation = action.payload
        },
        setSettings: (state, action) => {
            state.snapToGrid = action.payload.settings.snapToGrid
            state.gridSizePctX = Number(action.payload.settings.gridSizePctX)
            state.gridSizePctY = Number(action.payload.settings.gridSizePctY)
            state.showGrid = action.payload.settings.showGrid
            state.flipOrientation = action.payload.settings.flipOrientation
        },
    }
})

export const {setSnapToGrid, setGridSizeX, setGridSizeY, setShowGrid, setSettings} = settings.actions
export const getSettings = state => state.settings
export default settings.reducer;
