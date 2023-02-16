import { message } from 'antd';
import axios from 'axios';



export const getAllCam = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const responce = await axios.get('https://web-code-back-end.onrender.com/api/cam/getallcams')

        dispatch({ type: 'GET_ALL_CAM', payload: responce.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}



export const addCam = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('https://web-code-back-end.onrender.com/api/cam/addcam', reqObj)


        dispatch({ type: 'LOADING', payload: false })
        message.success('New Cam Added Successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const editCam = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('https://web-code-back-end.onrender.com/api/cam/edit', reqObj)


        dispatch({ type: 'LOADING', payload: false })
        message.success(' Cam edited Successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const deleteCam = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('https://web-code-back-end.onrender.com/api/cam/delete', reqObj)


        dispatch({ type: 'LOADING', payload: false })
        message.success(' Cam deleted Successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}



