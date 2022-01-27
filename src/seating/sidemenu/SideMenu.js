import React from "react";
import './SideMenu.css';

import arrow from './images/arrow.png'
import Settings from "./Settings";


export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    handleArrowClick() {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        let visibility = this.state.visible ? "shown" : "hidden"

        return (
            <div id={"sidemenu-container"} className={visibility}>
                <div className={"sidemenu-tab"} onClick={() => this.handleArrowClick()}>
                    <img
                        id={"sidemenu-tab-arrow"}
                        className={visibility}
                        src={arrow}
                        alt={""}
                    />
                </div>

                <div className={"sidemenu-body"}>
                    <div className={"sidemenu-body-head"}>Settings</div>
                    <div className={"sidemenu-body-content"}>
                        <Settings/>
                    </div>
                </div>
            </div>
        )
    }
}
