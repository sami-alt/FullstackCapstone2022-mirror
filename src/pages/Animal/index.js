import { getAnimal } from "api/animal"
import React, { useEffect, useState } from "react"
import {  Descriptions } from "antd"

const Animal = (props) => {
  const [animal, setAnimal] = useState(null)
  useEffect(() => {
    getAnimal(1).then((_) => setAnimal(_))
  }, [])

  console.log(animal)

  if (!animal) {
    return 'Ladataan...'
  }

  return (
    <div>
      <Descriptions
        title="Eläimen tiedot"
        bordered
        column={{
          lg: 2,
        }}
      >
        <Descriptions.Item label="Tesy tunnus">
          {' '}
          {animal.tesyID}
        </Descriptions.Item>
        <Descriptions.Item label="Laji">{animal.species}</Descriptions.Item>
        <Descriptions.Item label="Napattu"> {animal.inDate}</Descriptions.Item>
        <Descriptions.Item label="Saapunut Tesylle">
          {animal.inTesyDate}
        </Descriptions.Item>
        <Descriptions.Item label="Poistunut Tesyltä">
          {animal.outOfTesyDate}
        </Descriptions.Item>
        <Descriptions.Item label="Mistä">{animal.fromWhere}</Descriptions.Item>
        <Descriptions.Item label="populaatio">
          {animal.fromWhere}
        </Descriptions.Item>
        <Descriptions.Item label="syy">{animal.reason}</Descriptions.Item>
        <Descriptions.Item label="Nimi">
          {animal.callingNameOfTheAnimal}
        </Descriptions.Item>
        <Descriptions.Item label="Mikrosiru numero">
          {animal.microchipNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Ikä ryhmä">
          {animal.animalAge}
        </Descriptions.Item>
        <Descriptions.Item label="Rotu">{animal.breedAnimal}</Descriptions.Item>
        <Descriptions.Item label="Väri">{animal.animalColor}</Descriptions.Item>
        <Descriptions.Item label="Syy eutanasialle">
          {animal.euthanizedReasons}
        </Descriptions.Item>
        <Descriptions.Item label="Sey tilasto">
          {animal.seyStatistics}
        </Descriptions.Item>
        <Descriptions.Item label="Muuta huomautettavaa">
          {animal.extraNotes}
        </Descriptions.Item>
        <Descriptions.Item label="Annetut hoidot">
          {animal.treatmentList}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
=======
import { getAnimal, getAnimals } from "api/animal"
import React, { useEffect, useState } from "react"
import SingleAnimalDetailView from './SingleAnimalDetailView'
import { Button, Empty, Spin, Table } from "antd"
import {
    LoadingOutlined, PlusOutlined,
} from '@ant-design/icons';



const columns = [
    {
        title: 'Tesy nro',
        dataIndex: 'tesyID',
        key: 'tesyID'
    },
    {
        title: 'Laji',
        dataIndex: 'species',
        key: 'species'
    },
    {
        title: 'Nimi',
        dataIndex: 'callingNameOfTheAnimal',
        key: 'callingNameOfTheAnimal'
    },
    {
        title: 'Väri',
        dataIndex: 'animalColor',
        key: 'animalColor'
    },
    {
        title: 'Mistä',
        dataIndex: 'fromWhere',
        key: 'fromWhere'
    },
]

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Animal = (props) => {
    const [animals, setAnimals] = useState([])
    const [animal, setAnimal] = useState(null)
    const [fetching, setFetching] = useState(true);
    const [visible, setVisible] = useState(false);

    const getSingleAnimal = (id) => {
        getAnimal(id).then(_ => setAnimal(_))
        setVisible(true)
    }

    const getSingleAnimalDescription = () => getSingleAnimal

    useEffect(() => {
        getSingleAnimalDescription()
    }, [visible])

    useEffect(() => {
        getAnimals().then(res => setAnimals(res))
            .then(() => setFetching(false))
    }, [])

    const renderAnimals = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }
        if (animals.length <= 0) {
            return <Empty />;
        }

        return <>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            getSingleAnimal(record.id)
                        }
                    }
                }
                }
                dataSource={animals}
                columns={columns}
                bordered
                title={() =>
                    <>
                        <Button
                            type="primary" shape="round"
                            icon={<PlusOutlined />} size="small">
                            Lisää uusi eläin
                        </Button>
                    </>}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
                rowKey={(animals) => animals.id}

            />

        </>
    }

    return <>
        {visible ?
            <SingleAnimalDetailView
                animal={animal}
                visible={visible}
                setVisible={setVisible} /> :
            renderAnimals()}
    </>

>>>>>>> 3e124e23ad04ffe231fcfe075d9affe19800b730
}

export default Animal

