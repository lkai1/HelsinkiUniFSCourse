import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('title and author rendered but not likes or url', () => {
  const blog = {
    title: 'hi there',
    author: 'kai',
    url: '.com',
    likes: 3
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent('hi there kaiview')
})
test('title, author, likes and url rendered when clicked view', () => {
  const blog = {
    title: 'hi there',
    author: 'kai',
    url: '.com',
    likes: 3
  }

  const component = render(
    <Blog blog={blog}
    />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('hi there kai.comlikes 3likehide')

})
test('if like button pressed twice component handler function is called twice', () => {
  const blog = {
    title: 'hi there',
    author: 'kai',
    url: '.com',
    likes: 3
  }

  const component = render(
    <Blog blog={blog}
    />
  )

  const button2 = component.getByText('view')
  fireEvent.click(button2)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(blog.likes).toEqual(5)
})
