import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import {Filter} from '../../Filter/FilterView.js'
import {  ShowFilterModal,CloseModal } from '../modules/modal'

const MODAL_COMPONENTS = {
  'FILTER_MODAL': Filter,
}

const ModalsContainer = ({modalType, modalProps, ...rest}) => {
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType]
  return (
      <Modal
        show={!!modalType}
        onHide={rest.CloseModal}
        container={this}
      >
        <SpecificModal {...modalProps} {...rest} />
      </Modal>
  )
}

function mapStateToProps (state, ownProps){
  console.log(state);
  return {
    modalType: state.search.modal ? state.search.modal.modalType : null,
    modalProps: state.search.modal ? state.search.modal.modalProps : {}
  }
}

export default connect(
  mapStateToProps,
  {
    ShowFilterModal,
    CloseModal
  }
)(ModalsContainer)
