import React, { useState, useEffect } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { Row, Col, Input, Form } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { editCam, getAllCam } from '../Redux/actions/camActions'
import Spinner from '../Components/Spinner'
import { useParams } from 'react-router-dom'



function EditCam(match) {
    const params = useParams()
    const { cam } = useSelector(state => state.CamReducer)
    const dispatch = useDispatch()
    const [cams, setCams] = useState()
    const { loading } = useSelector(state => state.AlertReducer)
    const formRef = React.useRef(null);

    useEffect(() => {


        if (cam.length == 0) {
            dispatch(getAllCam());

        }
        else {
            setCams(cam.find(o => o._id === params.camid))

        }

    }, [cams])

    formRef.current?.setFieldsValue({ name: cams.name, model: cams.model, rentPerHour: cams.rentPerHour, image: cams.image })

    function onFinish(values) {
        console.log(values)
        values._id = cams._id
        dispatch(editCam(values))

    }
    return (
        <DefaultLayout>

            {loading && <Spinner />}


            <Row justify={'center'}>

                <Col lg={12} sm={24}>
                    <Form ref={formRef}
                        name="control-ref" className='bs-1 p-2' layout='vertical' onFinish={onFinish}>

                        <h2>Edit Cam</h2>

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
                            <button className='button1'>Edit Cam</button>

                        </div>


                    </Form>
                </Col>

            </Row>




        </DefaultLayout>
    )
}

export default EditCam