import React from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { Row, Col, Input, Form } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { addCam } from '../Redux/actions/camActions'
import Spinner from '../Components/Spinner'


function AddCam() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.AlertReducer)


    function onFinish(values) {
        console.log(values)
        values.bookedTimeSlots = []
        dispatch(addCam(values))

    }
    return (
        <DefaultLayout>

            {loading && <Spinner />}


            <Row justify={'center'}>

                <Col lg={12} sm={24}>
                    <Form className='bs-1 p-2' layout='vertical' onFinish={onFinish}>

                        <h2>Add New Cam</h2>

                        <FormItem name='name' label='Cam-name' rules={[{ required: true }]}>

                            <Input />

                        </FormItem>

                        <FormItem name='model' label='Cam Model' rules={[{ required: true }]}>

                            <Input />

                        </FormItem>
                        <FormItem name='rentPerHour' label='Rent Per Hour' rules={[{ required: true }]}>

                            <Input />

                        </FormItem>
                        <FormItem name='image' label='Image-Url' rules={[{ required: true }]}>

                            <Input />

                        </FormItem>
                        <div style={{ textAlign: 'right', marginRight: '50px' }}>
                            <button className='button1'>Add Cam</button>

                        </div>


                    </Form>
                </Col>

            </Row>




        </DefaultLayout>
    )
}

export default AddCam