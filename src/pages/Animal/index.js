import { getAnimal, getAnimals } from 'api/animal'
import React, { useEffect, useState } from 'react'
import SingleAnimalDetailView from './SingleAnimalDetailView'
import { Button, Empty, Spin, Table } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const columns = [
  {
    title: 'Tesy nro',
    dataIndex: 'animalId',
    key: 'animalId',
  },
  {
    title: 'Laji',
    dataIndex: ['species', 'name'],
    key: 'species.name',
  },
  {
    title: 'Nimi',
    dataIndex: 'callingNameOfTheAnimal',
    key: 'callingNameOfTheAnimal',
  },
  {
    title: 'Väri',
    dataIndex: 'animalColor',
    key: 'animalColor',
  },
  {
    title: 'Mistä',
    dataIndex: 'fromWhere',
    key: 'fromWhere',
  },
]

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Animal = (props) => {
  const [animals, setAnimals] = useState([])
  const [animal, setAnimal] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [visible, setVisible] = useState(false)

  const getSingleAnimal = (id) => {
    getAnimal(id).then((res) => setAnimal(res.data))
    setVisible(true)
  }

  useEffect(() => {
    getAnimals()
      .then((res) => {
        //console.log(res.data)
        setAnimals(res.data)
      })
      .then(() => setFetching(false))
  }, [])

  const renderAnimals = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />
    }
    if (animals.length <= 0) {
      return <Empty />
    }

    return (
      <>
        <Table
          onRow={(record) => {
            return {
              onClick: () => {
                console.log(record)
                getSingleAnimal(record.animalId)
              },
            }
          }}
          dataSource={animals}
          columns={columns}
          bordered
          title={() => (
            <>
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="small"
              >
                Lisää uusi eläin
              </Button>
            </>
          )}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
          rowKey="animalId"
        />
      </>
    )
  }

  return (
    <>
      {visible ? (
        <SingleAnimalDetailView
          animal={animal}
          visible={visible}
          setVisible={setVisible}
          setAnimal={setAnimal}
        />
      ) : (
        renderAnimals()
      )}
    </>
  )
}

export default Animal
