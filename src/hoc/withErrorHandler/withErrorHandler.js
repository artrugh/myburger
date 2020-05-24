import React from 'react';

import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/httpErrorHandler'

export default function withErrorHandler(WrappedComponent, axios) {
    return props => {
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
