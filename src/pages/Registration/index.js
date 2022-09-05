import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import PersonView from './PersonView'
import { getPerson, deletePerson, getPeople } from "api/people"
import { getRoles, assignRolesToPerson } from "api/role"
import { Button, Spin, Table, Modal, notification } from "antd"
import {
    LoadingOutlined, PlusOutlined, EditOutlined, CloseOutlined
} from '@ant-design/icons'


const Registration = () => {

    const userRights = useSelector((state) => state.login)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'realName',
            key: 'realName'
        },
        {
            title: 'Role(s)',
            dataIndex: 'assignedRole',
            key: 'assignedRole',
            render: (record) => {
                return (
                    <>
                        {record.map(role => <>{role.roleName}<br></br></>)}
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
                            onClick={() => getSinglePerson(record.peopleId)} 
                        />
                        {(record.username !== "admin" && userRights.find(right => right.authority === "People:Write")) && 
                            <CloseOutlined
                                style={{marginLeft: 8}}
                                onClick={() => removePerson(record.peopleId, record.realName, record.assignedRole)} 
                            />
                        }
                    </> 
                )
            },
        },
    ]

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    const [people, setPeople] = useState([])
    const [person, setPerson] = useState(null)
    const [roles, setRoles] = useState([])
    const [fetching, setFetching] = useState(true)
    const [visible, setVisible] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [personId, setPersonId] = useState(0)

    const getSinglePerson = (id) => {
        setPerson(null)
        setPersonId(id)
        setIsNew(false)
        getPerson(id)
        .then(person => {
            //console.log(person.data)
            setPerson(person.data)
        })
        setVisible(true)
    }

    const addNewPerson = () => {
        setPerson(null)
        setIsNew(true)
        setVisible(true)
    }

    const removePerson = (id, name, roles) => {
        Modal.confirm({
            title: `Remove user ${name}?`,
            onOk: () => {
                //console.log("roles:", roles)
                assignRolesToPerson(id, [])
                .then(() => {
                    //console.log("roles stripped from person")
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    deletePerson(id)
                    .then(() => {
                        //console.log("person deleted")
                        notification['success']({
                            message: 'User removed'
                        })
                        setUpdated(!updated)
                    })
                    .catch(error => {
                        console.log(error)
                        notification['error']({
                            message: 'User could not be removed'
                        })
                        let roleIds = []
                        for (let i = 0; i < roles.length; i++){
                            roleIds.push({
                                roleId: roles[i].roleId
                            })            
                        }
                        assignRolesToPerson(id, roleIds)
                        .then(() => {
                            //console.log("roles added back to person")
                            setUpdated(!updated)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    })
                })

            }
        })
    }

    const getSinglePersonDescription = () => getSinglePerson

    useEffect(() => {
        getSinglePersonDescription()
    }, [visible])

    useEffect(() => {
        //console.log("useEffect called")
        getPeople().then(res => setPeople(res.data))
            .then(() => setFetching(false))
        getRoles().then(res => {
            setRoles(res.data)
        })
        .then(() => setFetching(false))
    }, [visible, updated])

    const renderPeople = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }

        return <>
            <Table
                dataSource={people}
                columns={columns}
                bordered
                title={() =>
                    <>
                        {userRights.find(right => right.authority === "People:Write") &&
                            <Button
                                onClick={() => addNewPerson()}
                                type="primary" shape="round"
                                icon={<PlusOutlined />} size="small">
                                Add new user
                            </Button>
                        }
                    </>}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 240 }}
                rowKey={(people) => people.peopleId}

            />

        </>
    }

    return <>
        {visible ?
            <PersonView
                person={person}
                people={people}
                roles={roles}
                isNew={isNew}
                personId={personId}
                visible={visible}
                setVisible={setVisible} /> :
            renderPeople()}
    </>

}

export default Registration

