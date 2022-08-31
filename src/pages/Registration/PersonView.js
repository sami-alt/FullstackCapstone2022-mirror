import { Form, Input, Button, Modal, Select, Spin, notification } from 'antd'
import React, {useState} from 'react'
import { addPerson, updatePerson, getPeople } from "api/people"
import { addRoleToPerson } from "api/role"
import {LoadingOutlined} from "@ant-design/icons"

const {Option} = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const PersonView = ({ person, people, roles, id, isNew, visible, setVisible }) => {
    const [submitting, setSubmitting] = useState(false);

    const onFinish = person => {
        console.log(JSON.stringify(person, null, 2))
        const roleId = person.role
        delete person.role
        if (isNew){
            const username = person.username
            if (people.find(person => person.username === username)){
                Modal.error({title: "Username is already taken"})
                return
            }
            setSubmitting(true)
            addPerson(person)
                .then(() => {
                    console.log("person added")
                    //getPeople()
                    setVisible(false)
                    notification['success']("User added")
                })
                .catch(error => {
                    console.log(error)
                })
                .finally( () => {
                    /*
                    addRoleToPerson(id, roleId)
                    .then(() => {
                        console.log("person added")
                        getPeople()
                        setVisible(false)
                        notification['success']("User added")
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally( () => {
                        //setSubmitting(false)
                    })
                    */
                    setSubmitting(false)
                })
        }
        else {
            setSubmitting(true)
            updatePerson(id, person)
                .then(() => {
                    console.log("person updated")
                    //getPeople()
                    setVisible(false)
                    notification['success']("User data updated")
                }).catch(error => {
                console.log(error)
            }).finally( () => {
                setSubmitting(false)
            })
        }
    }

    const onFinishFailed = errorInfo => {
        //alert(JSON.stringify(errorInfo, null, 2))
    }

    if (!isNew && !person) {
        return <Spin indicator={antIcon}/>
    }

    return (
        <>
            <Modal
                centered
                title={isNew ? "Add a new user" : 
                    <>
                        <>{person.realName} </><>{person.assignedRole.map(role => <>[{role.roleName}]</>)}</>
                    </>
                }
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={800}
            >
                <Form layout="vertical"
                    initialValues={person}
                    onFinishFailed={onFinishFailed}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="realName"
                        label="Name"
                        rules={[{required: true, message: 'Please enter a name'}]}
                    >
                        <Input placeholder="Please enter a name"/>
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{required: true, message: 'Please select a role'}]}
                    >
                        <Select placeholder="Select role">
                            {roles.map(role => <Option value={role.roleId}>{role.roleName}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{required: true, pattern: /^[a-z0-9]*$/, message: 'Username can contain only small letters and numbers'}]}
                    >
                        <Input placeholder="Please enter a username"/>
                    </Form.Item>
                    <Form.Item
                        hidden={!isNew}
                        name="passwd"
                        label="Password"
                        rules={[{required: isNew, message: 'Please enter a password'}]}
                    >
                        <Input placeholder="Please enter a password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isNew ? "Save" : "Update"}
                        </Button>
                    </Form.Item>
                    {submitting && <Spin indicator={antIcon}/>}
                </Form>
            </Modal>
        </>
    )
}

export default PersonView
