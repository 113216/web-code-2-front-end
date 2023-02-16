import React from 'react'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../Components/DefaultLayout'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCam } from '../Redux/actions/camActions'
import Spinner from '../Components/Spinner'
import { Row, Col, Divider, DatePicker, Modal } from 'antd';
import moment from 'moment'
import { bookCam } from '../Redux/actions/BookingAction'
import StripeCheckout from 'react-stripe-checkout';

const { RangePicker } = DatePicker



function Bookingcam() {
    const { cam } = useSelector(state => state.CamReducer)
    const { loading } = useSelector(state => state.AlertReducer)
    const dispatch = useDispatch()
    const [cams, setCam] = useState({})
    const params = useParams()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {





        if (cam.length == 0) {
            dispatch(getAllCam());
        }
        else {
            setCam(cam.find(o => o._id === params.camid))
        }
    }, [cam])

    useEffect(() => {
        setTotalAmount((totalHours * cams.rentPerHour))
    }, [totalHours])

    function selectTimeSlots(values) {

        setFrom(moment(values[0].$d).format('MMM DD YYYY HH:mm'))
        setTo(moment(values[1].$d).format('MMM DD YYYY HH:mm'))

        setTotalHours((values[1]).diff(values[0], 'hours'))
    }
    // console.log(from, to)

    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            cam: cams._id,
            totalHours,
            totalAmount,
            bookedTimeSlots: {
                from,
                to
            },


        }
        dispatch(bookCam(reqObj))
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row className='d-flex align-item-center'>
                <Col lg={10} sm={24} xs={24}>
                    <img src={cams.image} className="camimg2 bs-1 w-100 m-2" />
                </Col>
                <Col lg={10} sm={24} xs={24}>
                    <Divider type='horizontal' plain style={{ marginLeft: "100px" }}>Cam Info</Divider>
                    <div style={{ marginLeft: "200px" }}>
                        <p>Brand :  {cams.name}</p>
                        <p>Model : {cams.model}</p>
                        <p>RentPerHour : {cams.
                            rentPerHour}</p>
                    </div>
                    <Divider type='horizontal' plain style={{ marginLeft: "100px", marginTop: "50px" }}>Select Time Slots</Divider>
                    <RangePicker style={{ marginLeft: "200px" }} from='MMM DD YYYY HH:mm' showTime={{ format: 'HH:mm' }} onChange={selectTimeSlots} />

                    <button className='button1' onClick={() => { setShowModal(true) }} style={{ marginTop: '10px', marginLeft: '200px' }}>See Booked Slots</button>


                    {from && to && (
                        <>
                            <div style={{ marginLeft: "200px" }}>
                                <p>Total Hours  : <b>{totalHours}</b></p>
                                <p>Rent Per Hour  : <b>{cams.rentPerHour}</b></p>
                            </div>
                            <div style={{ marginLeft: "200px" }}>
                                <h2>Total Amount = {totalAmount}</h2>

                                <StripeCheckout
                                    shippingAddress
                                    token={onToken}
                                    currency="inr"
                                    amount={totalAmount * 100}
                                    stripeKey='pk_test_51MaVj0SFvXd0rfvLT9KHVsqa6uRT6eTx6yNRqj1y3MgXGlFBHvrCNHYsJMgSJFjmAf0w1A64SUZsBYG0Udd6TfD800i9nqJkWv'
                                >
                                    <button className='button1'>Book Now</button>
                                </StripeCheckout>


                            </div>
                        </>)}

                </Col>
                {cams.name &&
                    <Modal open={showModal} closable={false} footer={false} title='Booked Time Slots'>

                        <div>

                            {cams.bookedTimeSlots.map(slot => {
                                return <button className='button1'>{slot.from}-{slot.to}</button>
                            })}
                        </div>

                        <div>
                            <button className='button1' onClick={() => { setShowModal(false) }}>Close</button>
                        </div>
                    </Modal>
                }

            </Row>

        </DefaultLayout>

    )
}

export default Bookingcam