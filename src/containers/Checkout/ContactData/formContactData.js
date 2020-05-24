const completeForm = (elementType, type, placeholder) => {
    return {
        elementType: elementType,
        elementConfig: {
            type: type,
            placeholder: placeholder
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
        },
        valid: false,
        touched: false
    }
}

export const formContactData = {
    name: completeForm('input', 'text', 'Your name'),
    email: completeForm('input', 'email', 'Your email'),
    street: completeForm('input', 'text', 'street'),
    zipCode: completeForm('input', 'text', 'ZIP Code'),
    country: completeForm('input', 'text', 'Your country'),
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }
            ],
        },
        value: 'fastest',
        validation: {},
        valid: true
    }
}