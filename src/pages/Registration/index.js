import React, { useEffect, useState } from "react"
import PersonView from './PersonView'
import { getPerson, deletePerson, getPeople } from "api/people"
import { getRoles } from "api/role"
import { Button, Empty, Spin, Table, Modal, notification } from "antd"
import {
    LoadingOutlined, PlusOutlined, EditOutlined, CloseOutlined
} from '@ant-design/icons'


const Registration = (props) => {

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
                        <CloseOutlined
                            style={{marginLeft: 8}}
                            onClick={() => removePerson(record.peopleId)} 
                        /> 
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
    const [isNew, setIsNew] = useState(false)
    const [personId, setPersonId] = useState(0)

    const getSinglePerson = (id) => {
        setPerson(null)
        setPersonId(id)
        setIsNew(false)
        getPerson(id)
        .then(person => {
            console.log(person.data)
            setPerson(person.data)
        })
        setVisible(true)
    }

    const addNewPerson = () => {
        setPerson(null)
        setIsNew(true)
        setVisible(true)
    }

    const removePerson = (id) => {
        setPersonId(id)
        Modal.confirm({
            title: "Remove this user?",
            onOk: () => {
                deletePerson(personId)
                .then(() => {
                    console.log("person deleted")
                    notification['success']("User removed")
                }).catch(error => {
                    console.log(error)
                })
            }
        })
    }

    const getSinglePersonDescription = () => getSinglePerson

    useEffect(() => {
        getSinglePersonDescription()
    }, [visible])

    useEffect(() => {
        console.log("useEffect called")
        getPeople().then(res => setPeople(res.data))
            .then(() => setFetching(false))
        getRoles().then(res => {
            setRoles(res.data)
        })
        .then(() => setFetching(false))
    }, [visible])

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
                        <Button
                            onClick={() => addNewPerson()}
                            type="primary" shape="round"
                            icon={<PlusOutlined />} size="small">
                            Add new user
                        </Button>
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
                id={personId}
                visible={visible}
                setVisible={setVisible} /> :
            renderPeople()}
    </>

}

export default Registration

