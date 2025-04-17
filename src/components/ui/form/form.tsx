import { forwardRef, ReactNode, FormEvent } from "react";
import styles from './form.module.scss';

// Define interface for input field configuration
export interface InputField {
    /** Type of the input field */
    type: 'text' | 'email' | 'password' | 'textarea' | 'date' | 'datetime-local' | string;
    /** Label for the input field */
    label?: string;
    /** Placeholder text for the input */
    // placeholder?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Size variant for the input field */
    size?: string;
    /** Minimum date for date input types */
    minDate?: string;
    /** Maximum date for date input types */
    maxDate?: string;
    /** Whether to hide this input field */
    hide?: boolean;
}

// Define interface for form inputs object
interface ListInputs {
    [key: string]: InputField;
}

// Define props interface for the Form component
interface FormProps {
    /** Configuration object for form inputs */
    listInput: ListInputs;
    /** Submit button element */
    submitButton?: ReactNode;
    /** Form submission handler */
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    /** Additional class name for the form */
    divClassName?: string;
}

const mapForObject = <T extends Record<string, any>>(
    obj: T, 
    func: (entry: [string, T[keyof T]], index: number) => any
): any[] => {
    //return array of return from func
    //func like map normal: value and index, attention that value is a array of
    //2 elements: key and value of each element of obj
    return Object.entries(obj).map(func);
}

const getInputElement = (key: string, value: InputField): JSX.Element => {
    const type = value.type;
    let inputNode: JSX.Element | undefined = undefined;
    
    switch (type) {
        case 'date':
        case 'datetime-local':
            inputNode = (                    
                <input 
                    id={key} 
                    type="datetime-local" 
                    name={key} 
                    className={styles.date}
                    min={value.minDate || "2015-01-01T00:00"} 
                    max={value.maxDate || "2035-12-31T23:59"}
                    required={value.required} 
                    placeholder=' '
                />
            );  
            break;
        case 'textarea':
            inputNode = (
                <textarea 
                    id={key} 
                    name={key} 
                    placeholder=' ' 
                    className='scroll text'
                    rows={20} 
                    cols={150} 
                    required={value.required}
                ></textarea>
            );
            break;
        default:
            inputNode = (
                <input 
                    id={key} 
                    type={type} 
                    placeholder=' ' 
                    className='scroll text'
                    name={key} 
                    required={value.required}
                />
            );
    }

    return (
        <div className={`${styles.inputData} ${styles[type]} ${value.size ? styles[value.size] : ''}`}>
            {inputNode}<br/>
            <div className={`${styles.underline}`}></div>
            <label className='text' htmlFor={key}>{value.label}</label>
        </div>
    );
}

// listInput is a obj that like a list of input want to get in form
// key will be the name of the input
// value will be the type of input, and append 'R' in the beginning if required
const Form = forwardRef<HTMLFormElement, FormProps>(({ 
    listInput,
    submitButton = '', 
    
    onSubmit = (e) => { e.preventDefault(); },
    divClassName = '' 
}, ref) => {
    return (
        <form 
            ref={ref} 
            className={`${styles.form} ${divClassName}`} 
            onSubmit={onSubmit}
        >
            {mapForObject(listInput, ([key, value], index) => (
                <div 
                    key={index} 
                    className={`${styles.formRow} ${value.hide ? styles.hide : ''}`}
                >
                    {getInputElement(key, value)}
                </div>
            ))}
            {submitButton}
        </form>
    );
});

export default Form;