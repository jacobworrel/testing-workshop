import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'
// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // 🐨 create a fake object to hold the form field values (username and password)
  // 🐨 create a jest.fn() for your submit handler
  // 🐨 render the Login component to a div
  // 💰 const div = document.createElement('div')

  const fakeCredentials = {
    username: 'username',
    password: 'password',
  }

  const onSubmit = jest.fn()
  const container = document.createElement('div')

  ReactDOM.render(<Login onSubmit={onSubmit} />, container)

  //
  // 🐨 get the field nodes
  // 💰 const inputs = div.querySelectorAll('input')
  // 💰 const form = div.querySelector('form')
  // 🐨 fill in the field values
  //

  const inputs = container.querySelectorAll('input')
  const form = container.querySelector('form')
  inputs[0].value = fakeCredentials.username
  inputs[1].value = fakeCredentials.password

  // Act
  // 🐨 submit the form:
  // 💰 formNode.dispatchEvent(new window.Event('submit'))
  //

  form.dispatchEvent(new window.Event('submit'))
  // Assert
  // 🐨 ensure your submit handler was called properly

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith(fakeCredentials)
})
