import React from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../Redux/actions/BookingAction'
import { Row, Col } from 'antd'
import Spinner from '../Components/Spinner'

function UserBookings() {



    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.BookingsReducer)
    const { loading } = useSelector((state) => state.AlertReducer)
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        dispatch(getAllBookings())

    }, [])


    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <h3>My Bookings</h3>

            <Row justify={'center'} gutter={16}>
                <Col lg={16} sm={24}>

                    {bookings.filter(o => o.user === user._id).map((booking) => {

                        return <Row className='bs-1 mt-2 '>

                            <Col lg={7} sm={24}><p><b>{booking.cam.name}</b></p>
                                <p>Total Hours : <b>{booking.totalHours}</b></p>
                                <p>Rent Per Hour : <b>{booking.cam.rentPerHour}</b></p>
                                <p>Total Amount : <b>{booking.totalAmount}</b></p>
                                <p>Model : <b>{booking.cam.model}</b></p>
                            </Col>
                            <Col lg={10} sm={24}>
                                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                                <p>From : <b>{booking.bookedTimeSlots.from}</b></p>
                                <p>To : <b>{booking.bookedTimeSlots.to}</b></p>


                            </Col>
                            <Col lg={7} sm={24}>
                                <img src={booking.cam.image} height='170' />
                            </Col>
                        </Row>

                    })}

                </Col>
            </Row>

        </DefaultLayout>
    )
}

export default UserBookings