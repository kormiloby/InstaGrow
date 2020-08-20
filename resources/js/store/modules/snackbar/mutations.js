import * as types from  '../../mutation-types'

export default {
  [ types.SET_SNACKBAR_SHOW ] (state, show) {
    state.show = show
  },
  [ types.SET_SNACKBAR_COLOR ] (state, color) {
    state.color = color
  },
  [ types.SET_SNACKBAR_TEXT ] (state, text) {
    state.text = text
  },
  [ types.SET_SNACKBAR_SUBTEXT ] (state, subtext) {
    state.subtext = subtext
  },
  [ types.SET_SNACKBAR_TIMEOUT ] (state, timeout) {
    state.timeout = timeout
  }
}
