import { createSlice } from '@reduxjs/toolkit';
import undoable, {includeAction} from "redux-undo";

// Helpers
function _seatMapping(state, student, seat) {
    /* A primitive for all the other operations. Not guaranteed to result in a 1-1 mapping afterwards! */
    if (seat != null) {
        state.seatsToStudent[seat] = student
    }
    if (student != null) {
        state.studentToSeat[student] = seat
    }
}

function _assignSeat(state, studentId, targetSeatId) {
    /* Handles assignments by swapping the seats of whomever is sitting at the target seat. */
    if (studentId == null) {
        throw Error("studentId cannot be null.")
    }
    if (targetSeatId == null) {
        throw Error("targetSeatId cannot be null.")
    }
    let student1 = studentId
    let seat1 = state.studentToSeat[student1]
    let seat2 = targetSeatId
    let student2 = state.seatsToStudent[seat2]

    _seatMapping(state, student2, seat1)
    _seatMapping(state, student1, seat2)
}

function _removeStudentFromSeat(state, student) {
    if (student == null) {
        throw Error("Student must not be null.")
    }
    _seatMapping(state, null, state.studentToSeat[student])
    _seatMapping(state, student, null)
}

const test_classroom = {
    name: "TestClassroom",
    width: 1000,
    height: 550,
    deskWidth: 120,
    deskHeight: 65,
    seats: {
        0: {x: 0, y: 0},
        1: {x: 10, y: 10},
        2: {x: 50, y: 50}
    },
    nextSeatId: 3,
    students: {
        0: {'firstName': 'Alexander', 'lastName': 'Hamilton', 'photo': '', 'notes': ''},
        1: {'firstName': 'George', 'lastName': 'Washington',
            'photo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/1200px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
            'notes': 'Don\'t put near Alex H.'},
        2: {'firstName': 'John', 'lastName': 'Locke', 'photo': '', 'notes': ''},
        3: {'firstName': 'ddd', 'lastName': 'DDD', 'photo': '', 'notes': ''},
        4: {'firstName': 'eeeeeee', 'lastName': 'EEE', 'photo': '', 'notes': ''},
        5: {'firstName': 'fffffff', 'lastName': 'FFF', 'photo': '', 'notes': ''},
        6: {'firstName': 'ggggggg', 'lastName': 'GGG', 'photo': '', 'notes': ''},
        7: {'firstName': 'hhhhhhh', 'lastName': 'HHH', 'photo': '', 'notes': ''},
        8: {'firstName': 'iiiiiii', 'lastName': 'III', 'photo': '', 'notes': ''},
        9: {'firstName': 'jjjjjjj', 'lastName': 'JJJ', 'photo': '', 'notes': ''},
        10: {'firstName': 'kkkkkkk', 'lastName': 'KKK', 'photo': '', 'notes': ''},
        11: {'firstName': 'lllllll', 'lastName': 'LLL', 'photo': '', 'notes': ''},
        12: {'firstName': 'mmmmmmm123', 'lastName': 'MMM', 'photo': '', 'notes': ''},
        13: {'firstName': 'nnnnnnn', 'lastName': 'NNN', 'photo': '', 'notes': ''},
        14: {'firstName': 'ooooooo', 'lastName': 'OOO', 'photo': '', 'notes': ''},
    },
    nextStudentId: 15,
    seatsToStudent: {
    },
    studentToSeat: {
    }
}

const empty_classroom = {
    name: "New classroom",
    width: 1000,
    height: 550,
    deskWidth: 120,
    deskHeight: 65,
    seats: {
        "0": {
            "x": 7.5,
            "y": 8
        },
        "1": {
            "x": 22.5,
            "y": 8
        },
        "2": {
            "x": 37.5,
            "y": 8
        },
        "3": {
            "x": 52.5,
            "y": 8
        },
        "4": {
            "x": 67.5,
            "y": 8
        },
        "5": {
            "x": 82.5,
            "y": 8
        },
        "6": {
            "x": 82.5,
            "y": 24
        },
        "7": {
            "x": 82.5,
            "y": 40
        },
        "8": {
            "x": 82.5,
            "y": 56
        },
        "9": {
            "x": 82.5,
            "y": 72
        },
        "10": {
            "x": 67.5,
            "y": 24
        },
        "11": {
            "x": 67.5,
            "y": 40
        },
        "12": {
            "x": 67.5,
            "y": 56
        },
        "13": {
            "x": 67.5,
            "y": 72
        },
        "14": {
            "x": 52.5,
            "y": 72
        },
        "15": {
            "x": 52.5,
            "y": 56
        },
        "16": {
            "x": 52.5,
            "y": 40
        },
        "17": {
            "x": 52.5,
            "y": 24
        },
        "18": {
            "x": 37.5,
            "y": 24
        },
        "19": {
            "x": 22.5,
            "y": 24
        },
        "20": {
            "x": 7.5,
            "y": 24
        },
        "21": {
            "x": 7.5,
            "y": 40
        },
        "22": {
            "x": 22.5,
            "y": 40
        },
        "23": {
            "x": 37.5,
            "y": 40
        },
        "24": {
            "x": 37.5,
            "y": 56
        },
        "25": {
            "x": 22.5,
            "y": 56
        },
        "26": {
            "x": 7.5,
            "y": 56
        },
        "27": {
            "x": 7.5,
            "y": 72
        },
        "28": {
            "x": 22.5,
            "y": 72
        },
        "29": {
            "x": 37.5,
            "y": 72
        }
    },
    nextSeatId: 30,
    students: {},
    nextStudentId: 0,
    seatsToStudent: {},
    studentToSeat: {}
}

export const classroom = createSlice({
    name: 'classroom',
    initialState: empty_classroom,
    reducers: {
        /* Note: these reducers can contain mutating logic, since we are creating them through createSlice, which
        * invokes Immer. */
        setSeatCoord: (state, action) => {
            let {seatId, newX, newY} = action.payload
            /* Shallow copy, but change the inner "seats" reference (so newState.seats != oldState.seats) */
            state.seats[seatId] = {x: newX, y: newY}
        },

        loadClassroom: (state, action) => {
            let newClassroom = action.payload.newClassroom
            state.name = newClassroom.name
            state.seats = newClassroom.seats
            state.students = newClassroom.students
            state.seatsToStudent = newClassroom.seatsToStudent
            state.studentToSeat = newClassroom.studentToSeat
        },

        setClassroomName: (state, action) => {
            state.name = action.payload.newName
        },

        assignStudentToSeat: (state, action) => {
            _assignSeat(state, action.payload.studentId, action.payload.seatId)
        },

        removeStudentFromSeat: (state, action) => {
            _removeStudentFromSeat(state, action.payload.studentId)
        },

        clearAllSeats: (state) => {
            for (const [, student] of Object.entries(state.seatsToStudent)) {
                _removeStudentFromSeat(state, student)
            }
        },

        addStudent: (state) => {
            const studentId = state.nextStudentId
            state.students[studentId] = {
                'firstName': '',
                'lastName': '',
                'photo': '',
                'notes': ''
            }
            state.nextStudentId += state.nextStudentId + 1
        },

        deleteStudent: (state, action) => {
            const studentId = action.payload.studentId

            if (!(studentId in state.students)) {
                console.error("Got invalid student ID " + studentId)
            } else {
                _removeStudentFromSeat(state, studentId)
                let students_copy = {...state.students}
                delete students_copy[studentId]
                state.students = students_copy
            }
        },

        modifyStudent: (state, action) => {
            const studentId = action.payload.studentId

            if (!(studentId in state.students)) {
                console.error("Got invalid student ID " + studentId)
            } else {
                state.students[studentId] = action.payload.studentObj
            }
        },

        addDesk: (state, action) => {
            const x = action.payload.x
            const y = action.payload.y
            const seatId = state.nextSeatId
            state.seats[seatId] = {x: x, y: y}
            state.nextSeatId = state.nextSeatId + 1
        },

        removeDesk: (state, action) => {
            const seatId = action.payload.seatId
            const student = state.seatsToStudent[seatId]
            if (student != null) {
                state.studentToSeat[student] = null
            }
            delete state.seats[seatId]
            delete state.seatsToStudent[seatId]
        }
    }
})

export const {
    setSeatCoord,
    loadClassroom,
    setClassroomName,
    assignStudentToSeat,
    removeStudentFromSeat,
    clearAllSeats,
    addStudent,
    deleteStudent,
    modifyStudent,
    addDesk,
    removeDesk
} = classroom.actions

export const selectClassroom = state => state.classroom.present
export const selectClassroomSeats = state => selectClassroom(state).seats
export const studentGetter = studentId => (
    state => selectClassroom(state).students[studentId]
)
export const seatGetter = seatId => (
    state => selectClassroom(state).seats[seatId]
)
export const studentInSeatGetter = seatId => (
    state => selectClassroom(state).seatsToStudent[seatId]
)
export function selectDeskDims(state) {
    return {deskWidth: selectClassroom(state).deskWidth, deskHeight: selectClassroom(state).deskHeight}
}
export function selectClassroomDims(state) {
    return {classroomWidth: selectClassroom(state).width, classroomHeight: selectClassroom(state).height}
}

// const DEBUG_REDUCER = reducer => (state, action) => {
//     console.log("ACTION TYPE: " + action.type)
//     if (action.type.startsWith('editMode'))
//         console.log("ASDF")
//     return reducer(state, action)
// }

const classroomReducer = undoable(
    classroom.reducer,
    // DEBUG_REDUCER(classroom.reducer),
    {
        limit: 25,
        filter: includeAction([
            'classroom/setName',
            'classroom/assignStudentToSeat',
            'classroom/removeStudentFromSeat',
            'classroom/setSeatCoord',
            'classroom/addDesk',
            'classroom/removeDesk',
            'classroom/modifyStudent',
            'classroom/addStudent',
            'classroom/deleteStudent'
        ])
    },
);
export default classroomReducer;
