import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { addPerson, updatePerson } from "api/people"
import { assignRolesToPerson } from "api/role"
import { Form, Input, Button, Modal, Select, Spin, notification } from 'antd'
import {LoadingOutlined} from "@ant-design/icons"

const {Option} = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const PersonView = ({ person, personId, people, roles, isNew, visible, setVisible }) => {
    const [submitting, setSubmitting] = useState(false)
    const userRights = useSelector((state) => state.login)

    const onFinish = person => {
        //console.log(JSON.stringify(person, null, 2))
        /*
        Creating a person / updating a person works in two step:
        1) Create/update the person (api/people)
        2) Assign roles to the person (api/people/id/role)
        */
        let roleIds = []
        for (let i = 0; i < person.roles.length; i++){
            roleIds.push({
                roleId: person.roles[i]
            })            
        }
        //console.log("roleIds: ", JSON.stringify(roleIds, null, 2))
        delete person.roles
        if (isNew){
            const username = person.username
            if (people.find(person => person.username === username)){
                Modal.error({title: "Käyttäjä nimi varattu."})
                return
            }
            setSubmitting(true)
            let id = 0
            addPerson(person)
                .then((res) => {
                    //console.log("person added")
                    id = res.data.peopleId
                })
                .catch(error => {
                    console.log(error)
                    notification['error']({
                        message: 'User could not be added'
                    })
                })
                .finally(() => {
                    assignRolesToPerson(id, roleIds)
                    .then(() => {
                        //console.log("roles assigned to new person")
                        setVisible(false)
                        notification['success']({
                            message: 'User added'
                        })
                        })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
                })
        }
        else {
            setSubmitting(true)
            updatePerson(personId, person)
                .then(() => {
                    //console.log("person updated")
                }).catch(error => {
                    console.log(error)
                    notification['error']({
                        message: 'User could not be updated'
                    })
                }).finally(() => {
                assignRolesToPerson(personId, roleIds)
                .then(() => {
                    //console.log("roles assigned to updated person")
                    setVisible(false)
                    notification['success']({
                        message: 'User updated'
                    })
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setSubmitting(false)
                })
        })
        }
    }

    const onFinishFailed = errorInfo => {
        //alert(JSON.stringify(errorInfo, null, 2))
    }

    if (!isNew && !person) {
        return <Spin indicator={antIcon}/>
    }

    let data = null
    if (!isNew){
        const personRoles = person.assignedRole.map(role => role.roleId)
        data = {
            "realName": person.realName,
            "roles": personRoles,
            "username": person.username,
            "passwd": person.passwd
        }
    }

    return (
        <>
            <Modal
                centered
                title={isNew ? "Lisää uusi käyttäjä" : 
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
                    initialValues={data}
                    onFinishFailed={onFinishFailed}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="realName"
                        label="Nimi"
                        rules={[{required: true, message: 'Lisää nimi'}]}
                    >
                        <Input placeholder="Lisää nimi" disabled={!(userRights.find(right => right.authority === "People:Write"))} />
                    </Form.Item>
                    <Form.Item
                        name="roles"
                        label="Tehtävät"
                        rules={[{required: true, message: 'Valitse vähintään yksi tehtävä'}]}
                    >
                        <Select placeholder="Valitse tehtävä" mode="multiple" disabled={!(userRights.find(right => right.authority === "People:Write"))}>
                            {roles.map(role => <Option value={role.roleId}>{role.roleName}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Käyttäjänimi"
                        rules={[{required: true, pattern: /^[a-z0-9]*$/, message: 'Käyttäjänimi voi sisältää vain pieniäkirjaimia ja numeroita'}]}
                    >
                        <Input placeholder="Please enter a username" disabled={!(userRights.find(right => right.authority === "People:Write"))}/>
                    </Form.Item>
                    <Form.Item
                        hidden={!isNew}
                        name="passwd"
                        label="Salasana"
                        rules={[{required: isNew, message: 'Lisää salasana'}]}
                    >
                        <Input placeholder="Lisää salasana" disabled={!(userRights.find(right => right.authority === "People:Write"))}/>
                    </Form.Item>
                    <Form.Item>
                        {!submitting ?
                            <Button type="primary" htmlType="submit" disabled={!(userRights.find(right => right.authority === "People:Write"))}>
                                {isNew ? "Save" : "Update"}
                            </Button> :
                            <Spin indicator={antIcon}/>}
                   </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PersonView
