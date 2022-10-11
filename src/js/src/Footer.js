import { Avatar, Button } from 'antd';
import React from 'react'
import {Container} from './Container';
import './Footer.css';

export const Footer = (props) => {
  return (
    <div className='footer'>
        <Container>
           {props.numberOfStudents!==undefined && <Avatar style={{backgroundColor:"#f56a00",marginRight:'5px'}} size='large'>{props.numberOfStudents}</Avatar>}
            <Button type='primary' onClick={props.onOpenModal}>Add New Student +</Button>
        </Container>
    </div>
  )
}
