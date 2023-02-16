import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../Components/DefaultLayout'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


import { Row, Col, Divider, DatePicker, message, Popconfirm } from 'antd';
import Spinner from '../Components/Spinner'

import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteCam, getAllCam } from '../Redux/actions/camActions';
import moment from 'moment';

const { RangePicker } = DatePicker


function AdminHome() {
    const { cam } = useSelector(state => state.CamReducer)
    const { loading } = useSelector(state => state.AlertReducer)
    const [totalCams, setTotalCams] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getAllCam())
    }, [])

    useEffect(() => {

        setTotalCams(cam)
    }, [cam])


    function setFilter(values) {

        var selectedForm = moment(values[0].$d, 'MMM DD YYYY HH:mm')
        var selectedTo = moment(values[1].$d, 'MMM DD YYYY HH:mm')

        var temp = []

        for (var cams of cam) {
            if (cams.bookedTimeSlots.length == 0) {
                temp.push(cams)
            }
            else {

                for (var booking of cams.bookedTimeSlots) {

                    if (selectedForm.isBetween(booking.form, booking.to) ||

                        selectedTo.isBetween(booking.form, booking.to) ||
                        moment(booking.form).isBetween(selectedForm, selectedTo) ||
                        moment(booking.to).isBetween(selectedForm, selectedTo)
                    ) {

                    }
                    else {
                        temp.push(cams)
                    }

                }
            }
        }

        setTotalCams(temp)

    }











    return (
        <div>

            <DefaultLayout>


                {loading === true && (<Spinner />)}

                <Row>
                    <Col lg={20} sm={24}>
                        <div style={{ paddingLeft: '900px' }}>
                            <button className='button1'> <a href="/addcam">Add Cam</a> </button>

                        </div>
                    </Col>
                </Row>


                <Row className='Entire' justify='center ' gutter={16}>

                    {totalCams.map(cam => {

                        return <Col key={cam._id} lg={5} sm={24} xs={24}>
                            <div className='cam p2 bs-1 '>
                                <img src={cam.image} className="carimg" />
                                <div className='cam-content d-flex'>
                                    <div>
                                        <p>{cam.name}</p>
                                        <p>{cam.model}</p>
                                        <p>{cam.rentPerHour} Rent Per Hour /.</p>
                                        <div style={{ marginRight: '10px' }}>
                                            <Link to={`/editcam/${cam._id}`}> <EditOutlined style={{ marginRight: '10px', color: 'skyblue', cursor: 'pointer' }} /></Link>
                                            <Popconfirm
                                                placement="top"
                                                title={'Are You Sure'}
                                                onConfirm={() => { dispatch(deleteCam({ camid: cam._id })) }}
                                                okText="Yes"
                                                cancelText="No">   <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} /></Popconfirm>


                                        </div>
                                    </div>

                                </div>

                            </div>


                        </Col>
                    })}

                </Row>

            </DefaultLayout>
        </div>
    )
}

export default AdminHome