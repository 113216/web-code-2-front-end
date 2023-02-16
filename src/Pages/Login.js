import React from 'react'
import { Row, Col, Input, Form, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin } from '../Redux/actions/UserAction'


function Login() {
    const dispatch = useDispatch()
    const formRef = React.useRef(null);

    function onFinish(values) {
        dispatch(userLogin(values))
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
                    <Form ref={formRef}
                        name="control-ref" layout='vertical' className='login-form' onFinish={onFinish}>

                        <h1>Login</h1>
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
                        <button className='button1'>Login</button>




                        <button className='button1' style={{ marginLeft: "5px" }} onClick={() => { formRef.current?.setFieldsValue({ UserName: 'Dwarakesh', Password: 1234567 }) }}>
                            Guest User
                        </button>


                        <br />

                        <Link to='/reg'>Click Here to Register</Link>
                    </Form>
                </Col>

            </Row>


        </div >
    )
}

export default Login
