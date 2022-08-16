import { getAnimal } from "api/animal"
import React, { useEffect, useState } from "react"
import {  Descriptions } from "antd"

const Animal = (props) => {
    const [animal, setAnimal] = useState(null)
    useEffect(() => {
        getAnimal(1).then(_ => setAnimal(_))
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
                    lg:2
                }}>
                    <Descriptions.Item label='Tesy tunnus'> {animal.tesyID}</Descriptions.Item>
                    <Descriptions.Item label="Laji">{animal.species}</Descriptions.Item>
                    <Descriptions.Item label='Napattu'> {animal.inDate}</Descriptions.Item>
                    <Descriptions.Item label="Saapunut Tesylle">{animal.inTesyDate}</Descriptions.Item>
                    <Descriptions.Item label="Poistunut Tesyltä">{animal.outOfTesyDate}</Descriptions.Item>
                    <Descriptions.Item label="Mistä">{animal.fromWhere}</Descriptions.Item>
                    <Descriptions.Item label="populaatio">{animal.fromWhere}</Descriptions.Item>
                    <Descriptions.Item label="syy">{animal.reason}</Descriptions.Item>
                    <Descriptions.Item label="Nimi">{animal.callingNameOfTheAnimal}</Descriptions.Item>
                    <Descriptions.Item label="Mikrosiru numero">{animal.microchipNumber}</Descriptions.Item>
                    <Descriptions.Item label="Ikä ryhmä">{animal.animalAge}</Descriptions.Item>
                    <Descriptions.Item label="Rotu">{animal.breedAnimal}</Descriptions.Item>
                    <Descriptions.Item label="Väri">{animal.animalColor}</Descriptions.Item>
                    <Descriptions.Item label="Syy eutanasialle">{animal.euthanizedReasons}</Descriptions.Item>
                    <Descriptions.Item label="Sey tilasto">{animal.seyStatistics}</Descriptions.Item>
                    <Descriptions.Item label="Muuta huomautettavaa">{animal.extraNotes}</Descriptions.Item>
                    <Descriptions.Item label="Annetut hoidot">{animal.treatmentList}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default Animal
