import React, { useState } from 'react'
import { Form, Button, InputGroup, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksName } from '../actions/booksAction'

function SearchBox() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [keyword, setkeyword] = useState('')

    const bookNames = useSelector((state) => state.bookNames);

    const { names } = bookNames;

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${ keyword }`)
            setkeyword('')
        }


    }

    const onChangeHandler = (text) => {
        if (text.length > 0) {
            dispatch(getBooksName(text))
        }
        setkeyword(text)
    }

    const MatchClickHandler = (text) => {

        navigate(`/?keyword=${ text }`)
        setkeyword(text)
        setkeyword('')

    }

    return (
        <Form onSubmit={submitHandler}>
            <InputGroup size='sm'>
                <Form.Control
                    type='text'
                    id='input-addon2'
                    name='q'
                    placeholder="search...."
                    value={keyword}
                    onChange={(e) => onChangeHandler(e.target.value)}
                    autoComplete='off'

                />

                <Button id="button-addon2"
                    type='submit' >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>

            </InputGroup>
            <NavDropdown id='search-dropdown' show={keyword.length > 0 && names.length > 0} >
                {names.map((name) => (
                    <NavDropdown.Item onClick={() => MatchClickHandler(name.name)} className='text-wrap' >{name.name}</NavDropdown.Item>
                ))}

            </NavDropdown>
        </Form>
    )
}

export default SearchBox