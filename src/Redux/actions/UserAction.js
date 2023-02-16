import axios from "axios";

import { message } from 'antd'


export const userLogin = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        console.log(reqObj)
        const responce = await axios.post('https://web-code-back-end.onrender.com/api/users/login', reqObj)
        localStorage.setItem("user", JSON.stringify(responce.data))
        message.success('login sucess')

        dispatch({ type: 'LOADING', payload: false })
        setTimeout(() => {
            window.location.href = "/home"
        }, 500);
    } catch (error) {
        console.log(error)
        message.error('Somthing Went Wrong')
        dispatch({ type: 'LOADING', payload: false })
    }

}

export const userReg = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        console.log(reqObj)

        const responce = await axios.post('https://web-code-back-end.onrender.com/api/users/reg', reqObj)
        message.success('your Registration is sucessfull')
        setTimeout(() => {
            window.location.href = "/"
        }, 500);



        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        message.error('Somthing Went Wrong')
        dispatch({ type: 'LOADING', payload: false })
    }

}