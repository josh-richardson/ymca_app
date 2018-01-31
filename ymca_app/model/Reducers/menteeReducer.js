import { ADD_MENTEE, REMOVE_MENTEE, SET_MENTEES } from '../Actions/menteeActions'

export default function mentees(state = [], action) {
  switch(action.type) {

    case ADD_MENTEE:
      return [...state, action.menteeObject]

    case REMOVE_MENTEE:
      return state.filter(mentee => !action.id.isEqualTo(mentee.id))

    case SET_MENTEES:
      return action.menteeObjects
  }

  return state

}
