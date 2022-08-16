import { getAnimal } from "api/animal"
import React, { useEffect, useState } from "react"

const Animal = (props) => {
    const [animal, setAnimal] = useState(null)
    useEffect(() => {
        getAnimal(1).then(_ => setAnimal(_.data))
    }, [])

    console.log(animal)

    if (!animal) {
        return 'Ladataan...'
    }

    return (
        <div>
            <p>Tesy tunnus: {animal.tesyID}</p>
        </div>
    )
}

export default Animal
