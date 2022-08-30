import { Descriptions, Modal } from 'antd';
import React from 'react';

const LabelOrInput = (props) => {
    const {field, commonProps: {animal, setPatch}} = props

    const value = animal[field]

    const onChange = (event) => {
        const newValue = event.target.value
        console.log({newValue})

        setPatch(oldAnimalPatch => ({
            ...oldAnimalPatch,
            [field]: newValue,
        }))
    }

    return <input className="viewable" type="text" value={value} onChange={onChange} />
}


const SingleAnimalDetailView = ({ animal: savedAnimal, visible, setVisible, setAnimal, editAnimal}) => {
    const [patch, setPatch] = setState({})
    

    if (!savedAnimal) {
        return 'Ladataan...'
    }

    const animal = {
        ...savedAnimal,
        ...patch,
    }


    const editAnimalInfo = () => {
        editAnimal(animal.id, patch).then((_) => setAnimal(_))
    }

    const commonProps = {
        animal, setAnimal, setPatch, editingField, setEditingField
    }
    return (
        <>
            <button onClick={editAnimalInfo}>Tallenna muutokset</button>
            <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1300}
            >
                <Descriptions
                    title="Eläimen tiedot"
                    bordered
                    column={{
                        lg: 2
                    }}>
                    <Descriptions.Item label='Tesy tunnus'> <LabelOrInput commonProps={commonProps} field="tesyID"/></Descriptions.Item>
                    <Descriptions.Item label="Laji"><LabelOrInput commonProps={commonProps} field="species"/></Descriptions.Item>
                    <Descriptions.Item label='Napattu'><LabelOrInput commonProps={commonProps} field="inDate"/></Descriptions.Item>
                    <Descriptions.Item label="Saapunut Tesylle"><LabelOrInpu commonProps={commonProps} field="inTesyDate"/></Descriptions.Item>
                    <Descriptions.Item label="Poistunut Tesyltä"><LabelOrInput commonProps={commonProps} field="outOfTesyDate"/></Descriptions.Item>
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
