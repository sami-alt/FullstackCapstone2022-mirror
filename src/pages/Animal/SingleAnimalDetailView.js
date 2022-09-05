import { Descriptions, Modal, DatePicker } from 'antd';
import React, {useState} from 'react';
import { editAnimal } from 'api/animal';
import moment from 'moment'
import 'pages/Animal/animal.scss'
import { useRightsCheck } from 'utils/access';

const parseValue = (rawValue, isDateField) => {
    if (!rawValue) {
        return ''
    }
    if (isDateField) {
        const momentValue =  moment(rawValue)
        if (momentValue.isValid()) {
            return momentValue
        }
    }
    return rawValue
}

const LabelOrInput = (props) => {
    const {field, commonProps: {animal, setPatch}} = props
    const hasWriteRight = useRightsCheck('Animal:Write')

    const rawValue = animal[field]
    const isDateField = field.endsWith('Date')
    const value = parseValue(rawValue, isDateField)

    const onChangeValue = (newValue) => {
        setPatch(oldAnimalPatch => ({
            ...oldAnimalPatch,
            [field]: newValue,
        }))
    }

    if (isDateField) {
        const onChange = (momentValue) => {
            const asText = momentValue?.format('YYYY-MM-DD') || null
            onChangeValue(asText)
        }

        return <DatePicker value={value} onChange={onChange} disabled={!hasWriteRight} />
    } else {
        const onChange = (event) => {
            onChangeValue(event.target.value)
        }

        return <input className="viewable" type="text" value={value || ''} onChange={onChange} disabled={!hasWriteRight} />
    }
}


const SingleAnimalDetailView = ({ animal: savedAnimal, visible, setVisible, onAnimalUpdated}) => {
    const [patch, setPatch] = useState({})
    const [editingField, setEditingField] = useState(null)

    if (!savedAnimal) {
        return 'Ladataan...'
    }

    const animal = {
        ...savedAnimal,
        ...patch,
    }


    const editAnimalInfo = () => {
        editAnimal(animal.animalId, animal).then((_) => {
            onAnimalUpdated(_.data)
            setVisible(false)
        })
    }

    const commonProps = {
        animal, setPatch, editingField, setEditingField
    }
    return (
        <>
            <Modal
                centered
                visible={visible}
                onOk={editAnimalInfo}
                onCancel={() => setVisible(false)}
                okText="Talenna muutokset"
                cancelText="Sulje"
                width={1300}
            >
                <Descriptions
                    title="Eläimen tiedot"
                    bordered
                    column={{
                        lg: 2
                    }}>
                    <Descriptions.Item label='Tesy tunnus'> <LabelOrInput commonProps={commonProps} field="tesyID"/></Descriptions.Item>
                    <Descriptions.Item label="Laji"><span>{animal.species?.name}</span></Descriptions.Item>
                    <Descriptions.Item label='Napattu'><LabelOrInput commonProps={commonProps} field="inDate"/></Descriptions.Item>
                    <Descriptions.Item label="Saapunut Tesylle"><LabelOrInput commonProps={commonProps} field="inTesyDate"/></Descriptions.Item>
                    <Descriptions.Item label="Poistunut Tesyltä"><LabelOrInput commonProps={commonProps} field="outTesyDate"/></Descriptions.Item>
                    <Descriptions.Item label="Mistä"><LabelOrInput commonProps={commonProps} field="fromWhere"/></Descriptions.Item>
                    <Descriptions.Item label="populaatio"><LabelOrInput commonProps={commonProps} field="population"/></Descriptions.Item>
                    <Descriptions.Item label="syy"><LabelOrInput commonProps={commonProps} field="reason"/></Descriptions.Item>
                    <Descriptions.Item label="Nimi"><LabelOrInput commonProps={commonProps} field="callingNameOfTheAnimal"/></Descriptions.Item>
                    <Descriptions.Item label="Mikrosiru numero"><LabelOrInput commonProps={commonProps} field="microchipNumber"/></Descriptions.Item>
                    <Descriptions.Item label="Ikä ryhmä"><LabelOrInput commonProps={commonProps} field="animalAge"/></Descriptions.Item>
                    <Descriptions.Item label="Rotu"><LabelOrInput commonProps={commonProps} field="breedAnimal"/></Descriptions.Item>
                    <Descriptions.Item label="Väri"><LabelOrInput commonProps={commonProps} field="animalColor"/></Descriptions.Item>
                    <Descriptions.Item label="Syy eutanasialle"><LabelOrInput commonProps={commonProps} field="euthanizedReasons"/></Descriptions.Item>
                    <Descriptions.Item label="Sey tilasto"><LabelOrInput commonProps={commonProps} field="seyStatistics"/></Descriptions.Item>
                    <Descriptions.Item label="Muuta huomautettavaa"><LabelOrInput commonProps={commonProps} field="extraNotes"/></Descriptions.Item>
                    <Descriptions.Item label="Annetut hoidot"><LabelOrInput commonProps={commonProps} field="treatmentList"/></Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default SingleAnimalDetailView
