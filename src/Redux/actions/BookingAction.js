import axios from 'axios';
import { message } from 'antd';



export const bookCam = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('https://web-code-back-end.onrender.com/api/bookings/bookcam', reqObj)


        dispatch({ type: 'LOADING', payload: false })
        message.success('Your Cam Booked Successfully')
        setTimeout(() => {
            window.location.href = "/userbookings"
        }, 500);

    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
        message.error('Somthing Went Wrong , Please Try later')
    }

}

export const getAllBookings = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const responce = await axios.get('https://web-code-back-end.onrender.com/api/bookings/getallbookings')

        dispatch({ type: 'GET_ALL_BOOKINGS', payload: responce.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}









