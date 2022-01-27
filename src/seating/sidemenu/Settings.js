import React, {useState} from "react";
import {getSettings, setSettings} from "../../states/Settings"
import {useDispatch, useSelector} from "react-redux";

export default function Settings() {
    const settings = useSelector(getSettings)
    const dispatch = useDispatch()
    const [tempState, setTempState] = useState({
        snapToGrid: settings.snapToGrid,
        gridSizePctX: settings.gridSizePctX,
        gridSizePctY: settings.gridSizePctY,
        showGrid: settings.showGrid,
        flipOrientation: settings.flipOrientation
    })

    function handleSubmit(e) {
        dispatch(setSettings({settings: tempState}))
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
        <table className={"sidemenu-settings"}><tbody>
            <tr>
                <th><span id={"settings-flipOrientation-label"}>Flip Orientation:</span></th>
                <td>
                    <input
                        type={"checkbox"} value={"flipOrientation"} name={"flipOrientation"}
                        checked={tempState.flipOrientation}
                        aria-labelledby="settings-flipOrientation-label"
                        onChange={
                            (e) => {
                                const copy = {}
                                Object.assign(copy, tempState)
                                copy.flipOrientation = e.currentTarget.checked
                                setTempState(copy)
                            }
                        }
                    />
                </td>
            </tr>
            <tr>
                <th><span id={"settings-snaptogrid-label"}>Snap to grid:<br/>(Lower left corner of seats)</span></th>
                <td>
                    <input
                        type={"checkbox"} value={"snapToGrid"} name={"snapToGrid"}
                        checked={tempState.snapToGrid}
                        aria-labelledby="settings-snaptogrid-label"
                        onChange={
                            (e) => {
                                const copy = {}
                                Object.assign(copy, tempState)
                                copy.snapToGrid = e.currentTarget.checked
                                setTempState(copy)
                            }
                        }
                    />
                </td>
            </tr>
            <tr>
                <th><span id={"settings-showgrid-label"}>Show grid:</span></th>
                <td>
                    <input
                        type={"checkbox"} value={"showGrid"} name={"showGrid"}
                        checked={tempState.showGrid}
                        aria-labelledby="settings-showgrid-label"
                        onChange={
                            (e) => {
                                const copy = {}
                                Object.assign(copy, tempState)
                                copy.showGrid = e.currentTarget.checked
                                setTempState(copy)
                            }
                        }
                    />
                </td>
            </tr>
            <tr>
                <th><span id={"settings-gridsize-label"}>Grid size<br/>(% of Width/Height):</span></th>
                <td>
                    <table><tbody>
                        <tr>
                            <td><span id={"settings-gridsize-labelX"}>X:</span></td>
                            <td>
                                <input
                                    type={"text"}
                                    name={"gridSizePctX"}
                                    value={tempState.gridSizePctX}
                                    aria-labelledby="settings-gridsize-label settings-gridsize-labelX"
                                    onInput={
                                        (e) => {
                                            const copy = {}
                                            Object.assign(copy, tempState)
                                            copy.gridSizePctX = e.target.value
                                            setTempState(copy)
                                        }
                                    }
                                />
                                %
                            </td>
                        </tr>
                        <tr>
                            <td><span id={"settings-gridsize-labelY"}>Y:</span></td>
                            <td>
                                <input
                                    type={"text"}
                                    name={"gridSizePctY"}
                                    value={tempState.gridSizePctY}
                                    aria-labelledby="settings-gridsize-label settings-gridsize-labelY"
                                    onInput={
                                        (e) => {
                                            const copy = {}
                                            Object.assign(copy, tempState)
                                            copy.gridSizePctY = e.target.value
                                            setTempState(copy)
                                        }
                                    }
                                />
                                %
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td colSpan={2} style={{textAlign: "center"}}>
                    <input type={"submit"} value={"Apply Settings"}/>
                </td>
            </tr>
        </tbody></table>
        </form>
    )
}