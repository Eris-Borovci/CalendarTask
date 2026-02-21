import reducer, { clearUser, setUser } from '~/store/userSlice'

describe('userSlice', () => {
  it('sets user', () => {
    const user = {
      id: 'user-1',
      email: 'user@test.com',
      token: 'token-123',
    }

    const state = reducer(undefined, setUser(user))

    expect(state.user).toEqual(user)
  })

  it('clears user', () => {
    const user = {
      id: 'user-1',
      email: 'user@test.com',
      token: 'token-123',
    }

    let state = reducer(undefined, setUser(user))
    state = reducer(state, clearUser())

    expect(state.user).toBeUndefined()
  })
})
