import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { addRole, updateRole } from "api/role"
import { assignRightsToRole } from "api/right"
import { Form, Input, Button, Modal, Select, Spin, notification } from 'antd'
import {LoadingOutlined} from "@ant-design/icons"

const {Option} = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const RoleView = ({ role, roleId, roles, rights, isNew, visible, setVisible }) => {
    const [submitting, setSubmitting] = useState(false)
    const userRights = useSelector((state) => state.login)
    
    const onFinish = role => {
        /*
        Creating a role / updating a role works in two step:
        1) Create/update the role (api/role)
        2) Assign rights to the role (api/role/id/right)
        */
        console.log(JSON.stringify(role, null, 2))
        let rightIds = []
        for (let i = 0; i < role.rights.length; i++){
            rightIds.push({
                rightId: role.rights[i]
            })            
        }
        //console.log("rightIds: ", JSON.stringify(rightIds, null, 2))
        delete role.rights
        if (isNew){
            const rolename = role.roleName
            if (roles.find(role => role.roleName === rolename)){
                Modal.error({title: "Role name is already taken"})
                return
            }
            setSubmitting(true)
            let id = 0
            addRole(role)
                .then((res) => {
                    console.log("role added")
                    id = res.data.roleId
                })
                .catch(error => {
                    console.log(error)
                    notification['error']({
                        message: 'Role could not be added'
                    })
               })
                .finally(() => {
                    assignRightsToRole(id, rightIds)
                    .then(() => {
                        console.log("rights assigned to new role")
                        setVisible(false)
                        notification['success']({
                            message: 'Role added'
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
            updateRole(roleId, role)
                .then(() => {
                    console.log("role updated")
                }).catch(error => {
                    console.log(error)
                    notification['error']({
                        message: 'Role could not be updated'
                    })
                }).finally(() => {
                assignRightsToRole(roleId, rightIds)
                .then(() => {
                    console.log("rights assigned to updated role")
                    setVisible(false)
                    notification['success']({
                        message: 'Role updated'
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

    if (!isNew && !role) {
        return <Spin indicator={antIcon}/>
    }

    let data = null
    if (!isNew){
        const roleRights = role.assignedRight.map(right => right.rightId)
        data = {
            "roleName": role.roleName,
            "rights": roleRights
        }
    }

    return (
        <>
            <Modal
                centered
                title={isNew ? "Add a new role" : `Role: ${role.roleName}`}
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
                        name="roleName"
                        label="Name of role"
                        rules={[{required: true, message: 'Please enter a name'}]}
                    >
                        <Input placeholder="Please enter a name" disabled={!(userRights.find(right => right.authority === "People:Write"))}/>
                    </Form.Item>
                    <Form.Item
                        name="rights"
                        label="Assigned rights"
                        rules={[{required: true, message: 'Please select at least one right'}]}
                    >
                        <Select placeholder="Select rights" mode="multiple" disabled={!(userRights.find(right => right.authority === "People:Write"))}>
                            {rights.map(right => <Option value={right.rightId}>{right.rightName}</Option>)}
                        </Select>
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

export default RoleView
