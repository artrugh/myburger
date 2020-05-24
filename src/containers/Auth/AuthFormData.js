export const authFormData = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your email',
            autoComplete: 'email'
        },
        value: '',
        validation: {
            required: true,
            email: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Your password',
            autoComplete: 'current-password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
}