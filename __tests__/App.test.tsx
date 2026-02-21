import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import App from '../App'

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
}))

jest.mock('~/store', () => ({
  store: {
    getState: () => ({}),
    subscribe: () => () => undefined,
    dispatch: () => undefined,
  },
}))

jest.mock('~/navigations/RootNavigation', () => {
  const React = require('react')
  const { View } = require('react-native')

  return function MockRootNavigation() {
    return <View />
  }
})

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />)
  })
})
