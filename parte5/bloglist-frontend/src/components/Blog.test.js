import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component test', () => {
    let blog = {
        title: "test1",
        author: "root",
        url: "www.test1.com",
        likes: 5
    }    

test('renders title and author', () => {
    const view = render(
        <Blog blog={blog}></Blog>
    )
    expect(view.container).toHaveTextContent(
        'test1 - root'
    )
})

test ('click the view button displays url and number of likes', () => {
    const view = render(
        <Blog blog= {blog}></Blog>
    )

    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(view.container).toHaveTextContent(
        'www.test1.com'
    )

    expect(view.container).toHaveTextContent(
        '5'
    )
})
});
