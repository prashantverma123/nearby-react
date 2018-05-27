// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const FILTER_MODAL = 'FILTER_MODAL'
// ------------------------------------
// Actions
// ------------------------------------

export function CloseModal() {
  return {
    type: HIDE_MODAL
  }
}
export function ShowFilterModal() {
  console.log('ShowFilterModal')
  return {
    type: SHOW_MODAL,
    modalType: 'FILTER_MODAL'
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  modalType: null,
  modalProps: {}
}

export default function ModalReducer (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      console.log(action.type,'djeknk');
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      }

    case 'HIDE_MODAL':
      return initialState
      break;

    default:
    console.log(action.type,'djeknk');
      return state
  }
}
