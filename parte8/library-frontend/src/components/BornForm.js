import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Select from 'react-select'

import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const BornForm = (props) => {
    const [nameOption, setNameOption] = useState(null)
    const [setBornTo , setBornYear] = useState('')

    
    
    const [changeBorn , result] = useMutation(EDIT_BORN, {
        refetchQueries: [ 
            { query: ALL_AUTHORS}
        ],
      }) 
    
    const data = useQuery(ALL_AUTHORS) 

    useEffect(() => {
        if (result.data && result.data.editBorn === null) {
            props.notify('Author not found')
        }
    }, [result.data]) //eslint-disable-line

    
    if (!props.show) {
        return null
    }

    const options = []

    data.data.allAuthors.map(author => options.push(
        {
            value: author.name,
            label: author.name
        }
    ) )
    
    const submit = async (event) => {
        event.preventDefault()

        const name = nameOption.value

        changeBorn({ variables: {name, setBornTo}})

        setNameOption('')
        setBornYear('')
    }

    return (
        <div>
            <h2>Change born</h2>

            <form onSubmit={submit}>
                <div>
                    <Select
                        value={nameOption}
                        onChange={setNameOption}
                        options={options}
                    />   
                </div>
                <div>
                    born <input
                        value={setBornTo}
                        onChange={({ target }) => setBornYear(parseInt(target.value))}
                    />
                </div>
                <button type='submit'> change born</button>
            </form>
        </div>
    )


}

export default BornForm