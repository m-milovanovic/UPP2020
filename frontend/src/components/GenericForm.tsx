import React, { useEffect, useState } from 'react'
import axios from 'axios'

type GenericFormProps = {
    processKey: string
}

const GenericForm: React.FC<GenericFormProps> = ({processKey}) => {

    const [formVariables, setFormVariables] = useState<string[]>([])

    useEffect(() => {
        const getFormVariables = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/${processKey}/form-variables`)
            setFormVariables(Object.keys(response.data))
        }
        getFormVariables()
    }, [processKey])

    return (
        <div>
            {formVariables.map((formVariable, i: number) => <div key={i}>{formVariable}</div>)}
        </div>
    )

}

export default GenericForm;