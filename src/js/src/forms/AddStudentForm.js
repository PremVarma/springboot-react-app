import React from 'react'
import { Formik } from 'formik'
import { Button, Input, Tag } from 'antd';
import { addStudent } from '../client';

const InputBottomMargin = {marginBottom:'10px'};

const StyledTag = (props) => <Tag style={{backgroundColor:'#f50',color:'#fff',...InputBottomMargin}}>{props.children}</Tag>

export const AddStudentForm = (props) => {
    return (
        <div><Formik
            initialValues={{ firstName: '', lastName:'',gender: '',email:'' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Email Nahi Doge??';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if(!values.firstName){
                    errors.firstName='First Name Chahiye Bhai'
                }
                if(!values.lastName){
                    errors.lastName='Last Name Bhi Chahiye Bhai'
                }
                if(!values.gender){
                    errors.gender='Gender Nahi Bataoge?? (:'
                }else if(!['male','female'].includes(values.gender.toLocaleLowerCase())){
                    errors.gender ="Bhai Ye Portal Sirf Male Female Ke liye hai.."
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
               
                    addStudent(values).then(()=>{
                        alert("Success");
                    }).catch(err=>{
                        props.onFailure(err);
                    }).finally(()=>{
                        setSubmitting(false);
                        props.closeModal();
                    });
              
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                isValid
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <Input
                        style={InputBottomMargin}
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName && <StyledTag>{errors.firstName}</StyledTag>}
                    <Input
                        style={InputBottomMargin}
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        placeholder="Last Name.."
                    />
                    {errors.lastName && touched.lastName && <StyledTag>{errors.lastName}</StyledTag>}
                    <Input
                        style={InputBottomMargin}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Email.."
                    />
                    {errors.email && touched.email && <StyledTag>{errors.email}</StyledTag>}
                    <Input
                        style={InputBottomMargin}
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                        placeholder="Gender.."
                    />
                    {errors.gender && touched.gender && <StyledTag>{errors.gender}</StyledTag>}
                    <Button onClick={()=>submitForm()} type="submit" disabled={isSubmitting || (touched && !isValid)}>
                        Submit
                    </Button>
                </form>
            )}
        </Formik></div>
    )
}
