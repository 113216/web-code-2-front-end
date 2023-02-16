import React from 'react'
import { Row, Col, Input, Form } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userReg } from '../Redux/actions/UserAction'

function Reg() {
    const dispatch = useDispatch()

    function onFinish(values) {
        dispatch(userReg(values))
        console.log(values)
    }
    return (
        <div className='login'>

            <Row gutter={16}>

                <Col lg={16}>
                    <img className='login-wallpaper' src="https://c4.wallpaperflare.com/wallpaper/764/665/82/camera-digital-dslr-body-wallpaper-preview.jpg" />

                    <h1 className='logo'>CAM WORLD</h1>
                </Col>

                <Col lg={8} className='text '>
                    <Form layout='vertical' className='login-form' onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr />
                        <Form.Item name='UserName' label='Username' rules={[
                            {
                                required: true,
                            },
                        ]}>
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="Confirm Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <button className='button1'>Register</button>
                        <br />

                        <Link to='/login'>Click Here to Login</Link>
                    </Form>
                </Col>

            </Row>


        </div>
    )
}

export default Reg