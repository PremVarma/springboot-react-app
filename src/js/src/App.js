import { useEffect, useState } from 'react';
import './App.css';
import { getAllStudent } from './client';
import { Avatar, Empty, Modal, Spin, Table } from 'antd';
import Container from './Container';
import { LoadingOutlined } from '@ant-design/icons';
import { Footer } from './Footer';
import { AddStudentForm } from './forms/AddStudentForm';
import { ErrorNotification } from './Notification';

function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAddStudentModalVisible, setIsStudentModalVisible] = useState(false)


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    setIsLoading(true);
    getAllStudent().then(res => res.json().then(
      students => {
        setIsLoading(false);
        setStudents(students)
      }
    )).catch(error => {
      const message = error.error.message;
      const description = error.error.httpStatus
      ErrorNotification(message, description)
      setIsLoading(false)
    })
  }

  const columns = [
    {
      title: '',
      key: 'avatar',
      render: (text, student) => (
        <Avatar size='large'>
          {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
        </Avatar>
      )
    },
    {
      title: "StudentId",
      dataIndex: "studentId",
      key: "StudentId"
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    }, {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    }
  ]

  const getIndicatorIcon = <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />


  const commonFooter = () => <>
    <Modal title="Add New Student" visible={isAddStudentModalVisible}
      onOk={() => {
        setIsStudentModalVisible(false);
      }}
      onCancel={() => {
        setIsStudentModalVisible(false);
      }}
      width={1000}>
      <AddStudentForm closeModal={() => {
        setIsStudentModalVisible(false)
        fetchData();
      }}
      onFailure={(err)=>{
        const message = err.error.message;
        const description = err.error.httpStatus;
        ErrorNotification(message,description)
      }} />
    </Modal>
    <Footer numberOfStudents={students.length} onOpenModal={() => setIsStudentModalVisible(true)} />
  </>

  return (
    <Container>
      {isLoading ? <Spin indicator={getIndicatorIcon} />
        :
        students.length > 0 &&
        <>
          <h2>Student Portal</h2>
          <Table dataSource={students} columns={columns} rowKey='studentId' pagination={false} />
          {commonFooter()}
        </>
      }
      {students.length === 0 && <Container>
        <Empty description={<h1>No Student Found</h1>} />
        {commonFooter()}
      </Container>}
    </Container>
  );
}

export default App;