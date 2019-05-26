import React from 'react'
import axiosMock from 'axios'
import {renderWithRouter, fireEvent, generate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

// add a beforeEach for cleaning up state and intitializing the API
beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})
test('login as an existing user', async () => {
  // 🐨 render the app with the router provider and custom history
  const {
    getByTestId,
    getByText,
    finishLoading,
    getByLabelText,
  } = renderWithRouter(<App />)

  // 🐨 wait for the app to finish loading the mocked requests
  await finishLoading()
  //
  // 🐨 navigate to login by clicking login-link
  // 💰 the link has text that matches /login/i
  const loginLink = getByText(/login/i)
  // 💰 when you fireEvent.click on the login link, react-router will ignore
  // the click unless it's a "left click" which is based on the `button`
  // property. So as a second argument to `fireEvent.click`, pass `{button: 0}`
  fireEvent.click(loginLink, {button: 0})

  // 🐨 assert that window.location.href contains 'login'
  expect(window.location.href).toContain('login')

  // 🐨 fill out the form
  const fakeUser = generate.loginForm()
  // 💰 get the username and password fields and set their values
  const usernameNode = getByLabelText('Username')
  const passwordNode = getByLabelText('Password')

  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // Now we need to prepare our axios mock to handle the form submission properly:
  // use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // 💰 you may want to look at the final version for this one...
  const {post} = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  // 🐨 submit form by clicking on the submit button
  const submitButtonNode = getByText('Submit')
  fireEvent.click(submitButtonNode)

  // 🐨 wait for the mocked requests to finish
  await finishLoading()

  // 🐨 now make some assertions:
  // assert post was called correctly
  expect(post).toHaveBeenCalledTimes(1)
  expect(post).toHaveBeenCalledWith('/auth/login', fakeUser)
  // assert localStorage is correct
  expect(localStorage.getItem('token')).toBe(token)
  // assert the user was redirected (window.location.href)
  expect(window.location.href).not.toContain(/login/i)
  // assert the username display is the fake user's username
  expect(getByTestId('username-display').textContent).toBe(fakeUser.username)
  // assert the logout button exists
  expect(getByText('Logout')).toBeTruthy()
})
