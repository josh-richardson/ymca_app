import { SET_INFO } from '../Actions/mentorInfoActions'

export default function mentorInfo(state = {}, action) {
  switch(action.type) {
    case SET_INFO:
      state = action.info
  }

  return state
}
