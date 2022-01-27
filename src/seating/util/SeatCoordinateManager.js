import {setSeatCoord, addDesk} from "../../states/Classroom";


function getXCoordMapping(flip) {
    if (flip) {
        return (x) => 100 - x
    } else {
        return (x) => x
    }
}


function getYCoordMapping(flip) {
    if (flip) {
        return (y) => 100 - y
    } else {
        return (y) => y
    }
}


function roundToNearest(x, y, meshSizeX, meshSizeY) {
    const snappedX = Math.round(x / meshSizeX) * meshSizeX
    const snappedY = Math.round(y / meshSizeY) * meshSizeY
    return [snappedX, snappedY]
}


export default class SeatCoordinateManager {
    constructor(settings, dispatchFn, deskWidth, deskHeight, classWidth, classHeight) {
        this.settings = settings;
        this.dispatchFn = dispatchFn;
        this.xmap = getXCoordMapping(settings.flipOrientation);
        this.ymap = getYCoordMapping(settings.flipOrientation);
        this.inverse_xmap = this.xmap;
        this.inverse_ymap = this.ymap;

        this.deskWidth = deskWidth;
        this.deskHeight = deskHeight;
        this.classWidth = classWidth;
        this.classHeight = classHeight;
        this.maxX = 100 * (1 - (deskWidth / classWidth));
        this.maxY = 100 * (1 - (deskHeight / classHeight));
        this.minX = 0;
        this.minY = 0;
    }

    getDisplaySeatCoord(seat) {
        return [this.xmap(seat.x), this.ymap(seat.y)]
    }

    snapToGrid(xDisplay, yDisplay) {
        let x = this.inverse_xmap(xDisplay)
        let y = this.inverse_ymap(yDisplay)
        let [x2, y2] = roundToNearest(x, y, this.settings.gridSizePctX, this.settings.gridSizePctY)
        return [this.xmap(x2), this.xmap(y2)]
    }

    getGridXs() {
        const gridXs = []
        for (let x = 0; x < 100; x += this.settings.gridSizePctX) {
            gridXs.push(this.xmap(x))
        }
        return gridXs
    }

    getGridYs() {
        const gridYs = []
        for (let y = 0; y < 100; y += this.settings.gridSizePctY) {
            gridYs.push(this.ymap(y))
        }
        return gridYs
    }

    setSeatCoordFromDisplayCoord(seatId, xDisplay, yDisplay) {
        if (this.settings.snapToGrid) {
            [xDisplay, yDisplay] = this.snapToGrid(xDisplay, yDisplay)
        }
        let x = this.inverse_xmap(xDisplay)
        let y = this.inverse_ymap(yDisplay)

        if (x == null || y == null || x > this.maxX || y > this.maxY || x < this.minX || y < this.minY) {
            return
        }

        this.dispatchFn(setSeatCoord({
            seatId: seatId, newX: x, newY: y
        }))
    }

    addDeskFromDisplayCoord(xDisplay, yDisplay) {
        if (this.settings.snapToGrid) {
            [xDisplay, yDisplay] = this.snapToGrid(xDisplay, yDisplay)
        }
        let x = this.inverse_xmap(xDisplay)
        let y = this.inverse_ymap(yDisplay)

        // console.log(`disp coord = ${xDisplay}, ${yDisplay}`)
        // console.log(`max: ${this.maxX}, ${this.maxY}`)
        // console.log(`coord: ${x}, ${y}`)

        if (x == null || y == null || x > this.maxX || y > this.maxY || x < this.minX || y < this.minY) {
            return
        }

        this.dispatchFn(addDesk({x: x, y: y}))
    }
}
