import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loadClassroom} from "../../states/Classroom";
import './Toolbar.css';
import SaveIcon from "./icons/save.png";


export default function LoadTool() {
    const [state, setState] = useState({
        popupOpen: false,
        targetFile: null
    })
    const dispatch = useDispatch();

    function openMenu() {
        setState({popupOpen: true, targetFile: state.targetFile})
    }

    function closeMenu() {
        setState({popupOpen: false, targetFile: state.targetFile})
    }

    function handleFileChange(file) {
        setState({popupOpen: state.popupOpen, targetFile: file})
    }

    function handleSubmit() {
        if (state.targetFile == null) {
            return
        }

        let handleFile = (e) => {
            const content = JSON.parse(e.target.result);
            dispatch(loadClassroom({
                newClassroom: content.classroom
            }))
        }

        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(state.targetFile);
        closeMenu()
    }

    const toggleFn = state.popupOpen ? closeMenu : openMenu
    const popupClass = state.popupOpen ? "popup-opened" : "popup-closed"

    return (
        <div className={"toolbar-item-basic"}>
            <div className={"toolbar-icon-container"} onClick={toggleFn}>
                <img id={"load-tool-icon"} className={"tool-icon"} src={SaveIcon} alt={"Load"}/>
                <br/>
                Load
            </div>
            <div className={`toolbar-item-popup ${popupClass}`}>
                <div>
                    <button
                        style={{
                            position: "relative",
                            float: "right",
                            // top: ".3em",
                            // right: ".5em",
                            // height: "1em",
                            // width: "1em",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                        onClick={closeMenu}
                    >
                        &#10006;
                    </button>
                </div>
                <div>
                    <div style={{textAlign: 'left', paddingLeft: '1em'}}>
                        <input
                            type={"file"}
                            id={"ClassroomFile"}
                            accept={"application/json"}
                            onChange={
                                (e) => handleFileChange(e.target.files[0])
                            }
                        />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <button onClick={handleSubmit}>Load</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
