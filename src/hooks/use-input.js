import {useCallback, useState} from 'react';

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [existed, setExisted] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = useCallback((event) => {
        setEnteredValue(event.target.value);
    },[]);

    const inputBlurHandler = useCallback((event) => {
        setIsTouched(true);
        setExisted(false);
    },[]);

    const reset = useCallback(() => {
        setEnteredValue('');
        setIsTouched(false);
        setExisted(false);
    },[]);

    return {
        value: enteredValue,
        isValid: valueIsValid,
        existed,
        setExisted,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };

};

export default useInput;