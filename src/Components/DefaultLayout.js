import React from 'react'
import { Button, Dropdown, Row, Col } from 'antd';
import { Link } from 'react-router-dom'



function DefaultLayout(props) {

    const user = JSON.parse(localStorage.getItem("user"))


    const items = [
        {
            key: '1',
            label: (
                <a href="/home">
                    Home
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a href="userbookings">
                    Booking
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a href="/admin">
                    ADMIN
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <li onClick={() => {
                    localStorage.removeItem('user')
                    window.location.href = '/'
                }}>Logout</li>
            ),
        },
    ];


    return (
        <div>
            <div className='hrader bs-1'>
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>

                    </Col>
                </Row>
                <div className='d-flex justify-content-between'>
                    <h1 ><b><Link to='/' style={{ color: 'orangered', textDecoration: 'none' }}>  CAM WORLD</Link></b></h1>

                    <div style={{ position: 'fixed', right: 0, top: 0, marginTop: 35, marginRight: 30 }}>
                        <Dropdown menu={{ items }} placement="bottomRight">
                            <Button>{user.UserName}</Button>
                        </Dropdown>
                    </div>


                </div>
            </div>
            <div className='content'>
                {props.children}
            </div>

        </div>
    )
}

export default DefaultLayout