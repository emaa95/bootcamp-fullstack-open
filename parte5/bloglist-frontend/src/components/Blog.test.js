import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
});
