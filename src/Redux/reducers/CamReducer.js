
const initialData = {
    cam: [],
}

export const CamReducer = (state = initialData, action) => {

    switch (action.type) {

        case 'GET_ALL_CAM': {
            return {
                ...state,
                cam: action.payload
            }
        }
        default: return state
    }
}