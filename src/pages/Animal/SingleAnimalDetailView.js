import { Descriptions, Modal } from 'antd';
import React from 'react';

const SingleAnimalDetailView = ({ animal, visible, setVisible }) => {


    if (!animal) {
        return 'Ladataan...'
    }

    return (
        <>
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
            </Modal>
        </>
    );
};

export default SingleAnimalDetailView
