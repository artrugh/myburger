export const updatedObj = (oldObj, updatedProps) => ({
    ...oldObj,
    ...updatedProps
})


export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    return isValid
}