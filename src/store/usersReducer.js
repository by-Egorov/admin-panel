const CURRENT_USER = 'CURRENT_USER'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'

const initialState = {
  currentUser: [],
  getUsers: [],
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        getUsers: action.payload,
      }
    }
    case CURRENT_USER: {
      return {
        ...state,
        currentUser: [...state.currentUser, action.payload],
      }
    }
    case UPDATE_USER: {
      const updatedUser = action.payload
      if (!updatedUser || !updatedUser.userId) {
        console.error('Ошибка: обновление данных без id')
        return state // Не обновляем состояние, если нет id
      }

      return {
        ...state,
        currentUser: state.currentUser.map(user =>
          user._id === updatedUser.userId ? { ...user, ...updatedUser } : user,
        ),
        getUsers: state.getUsers.map(user =>
          user._id === updatedUser.userId ? { ...user, ...updatedUser } : user,
        ),
      }
    }
    case REMOVE_USER: {
      return {
        ...state,
        getUsers: state.getUsers.filter(user => user.id !== action.payload)
      }
    }
    default:
      return state
  }
}
