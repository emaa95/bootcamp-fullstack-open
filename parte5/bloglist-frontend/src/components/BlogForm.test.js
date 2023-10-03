import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm component test', () => {
    
    test('form calls event handler with the right details when a new blog is created', () =>{

    const addBlogHandlerMock = jest.fn()

    const view = render(
        <BlogForm createBlog = {addBlogHandlerMock}></BlogForm>
    )

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const titleInput = view.container.querySelector('#title')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const authorInput = view.container.querySelector('#author')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const urlInput =  view.container.querySelector('#url')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const likesInput = view.container.querySelector('#likes')

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const form = view.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'Test blog' } })
    fireEvent.change(authorInput, { target: { value: 'Test author' } })
    fireEvent.change(urlInput, { target: { value: 'Test url' } })
    fireEvent.change(likesInput, { target: { value: 'Test likes' } })
    fireEvent.submit(form)
    
    //muestra el título del primer argumento de la primera llamada a una función llamada addBlogHandlerMock
    console.log(addBlogHandlerMock.mock.calls[0][0].title)

    expect(addBlogHandlerMock.mock.calls).toHaveLength(1)
    expect(addBlogHandlerMock.mock.calls[0][0]).toEqual({
        title: 'Test blog',
        author: 'Test author',
        url: 'Test url',
        likes: 'Test likes'
    })
    })
});

