import React from 'react';

// HANDLER ERROR CUSTOM HOOK
import useHttpErrorHandler from '../../hooks/httpErrorHandler'

// UI COMPONENT
import Modal from '../../components/UI/Modal/Modal'

// WRAPPER COMPONENT
export default function withErrorHandler(WrappedComponent, axios) {
    return props => {
        // HOOK RUTURNS ERRORS PASSING  AXIOS-INSTANCE
        const [error, cleanError] = useHttpErrorHandler(axios)
        return (
            <>
                <Modal
                    modalClosed={cleanError}
                    show={error}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}
