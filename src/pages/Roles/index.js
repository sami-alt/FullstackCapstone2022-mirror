import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import RoleView from './RoleView'
import { getRole, deleteRole, getRoles } from "api/role"
import { getRights, assignRightsToRole } from "api/right"
import { Button, Spin, Table, Modal, notification } from "antd"
import {
    LoadingOutlined, PlusOutlined, EditOutlined, CloseOutlined
} from '@ant-design/icons'


const Rights = () => {

    const userRights = useSelector((state) => state.login)
    
    const columns = [
        {
            title: 'Tehtävän nimi',
            dataIndex: 'roleName',
            key: 'roleName'
        },
        {
            title: 'Valitse oikeudet',
            dataIndex: 'assignedRight',
            key: 'assignedRight',
            render: (record) => {
                return (
                    <>
                        {record.map(right => <>{right.rightName}<br></br></>)}
                    </>
                )
            }
        },
        { 
            key: 'action', 
            title: '', 
            render: (record) => { 
                return ( 
                    <> 
                        <EditOutlined
                            onClick={() => getSingleRole(record.roleId)} 
                        /> 
                        {(userRights.find(right => right.authority === "People:Write")) && 
                            <CloseOutlined
                                style={{marginLeft: 8}}
                                onClick={() => removeRole(record.roleId, record.roleName, record.assignedRight)} 
                            /> 
                        }
                    </> 
                )
            },
        },
    ]

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    const [roles, setRoles] = useState([])
    const [role, setRole] = useState(null)
    const [rights, setRights] = useState([])
    const [fetching, setFetching] = useState(true)
    const [visible, setVisible] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [roleId, setRoleId] = useState(0)

    const getSingleRole = (id) => {
        setRole(null)
        setRoleId(id)
        setIsNew(false)
        getRole(id)
        .then(role => {
            //console.log(role.data)
            setRole(role.data)
        })
        setVisible(true)
    }

    const addNewRole = () => {
        setRole(null)
        setIsNew(true)
        setVisible(true)
    }

    const removeRole = (id, name, rights) => {
        Modal.confirm({
            title: `Poista tehtävä ${name}?`,
            onOk: () => {
                assignRightsToRole(id, [])
                .then(() => {
                    //console.log("rights stripped from role")
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    deleteRole(id)
                    .then(() => {
                        //console.log("role deleted")
                        notification['success']({
                            message: 'Role removed'
                        })
                        setUpdated(!updated)
                    })
                    .catch(error => {
                        console.log(error)
                        notification['error']({
                            message: 'Role could not be removed'
                        })
                        let rightIds = []
                        for (let i = 0; i < rights.length; i++){
                            rightIds.push({
                                rightId: rights[i].rightId
                            })            
                            assignRightsToRole(id, rightIds)
                            .then(() => {
                                //console.log("rights added back to role")
                                setUpdated(!updated)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                          }
                    })
                })
        }
        })
    }

    const getSingleRoleDescription = () => getSingleRole

    useEffect(() => {
        getSingleRoleDescription()
    }, [visible])

    useEffect(() => {
        //console.log("useEffect called")
        getRoles().then(res => setRoles(res.data))
            .then(() => setFetching(false))
        getRights().then(res => {
            setRights(res.data)
        })
        .then(() => setFetching(false))
    }, [visible, updated])

    const renderRoles = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }

        return <>
            <Table
                dataSource={roles}
                columns={columns}
                bordered
                title={() =>
                    <>
                        {userRights.find(right => right.authority === "People:Write") &&                        
                            <Button
                                onClick={() => addNewRole()}
                                type="primary" shape="round"
                                icon={<PlusOutlined />} size="small">
                                Lisää tehtävä
                            </Button>
                        }
                    </>}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 240 }}
                rowKey={roles.roleId}

            />

        </>
    }

    return <>
        {visible ?
            <RoleView
                role={role}
                roles={roles}
                rights={rights}
                isNew={isNew}
                roleId={roleId}
                visible={visible}
                setVisible={setVisible} /> :
            renderRoles()}
    </>

}

export default Rights

