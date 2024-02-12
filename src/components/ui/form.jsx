import styles from './form.module.scss';

const  mapForObject = (obj, func) => { 
    //return array of return from func
    //func like map normal: value and index, attention that value is a array of
    //2 elements: key and value of each element of obj
    return Object.entries(obj).map(func) 
}

const getInputElement = (key, value) => {
    const type = value.type;
    let inputNode = undefined;
    switch (type) {
        case 'date':
        case 'datetime-local':
            inputNode = (                    
                <input  type="datetime-local" name={key} className={styles.date}
                        min={`${value.minDate || "2015-01-01T00:00"}`} 
                        max={`${value.maxDate || "2030-12-31T23:59"}`}
                        required={value.required} placeholder=' '/>)  
            break;
        case 'textarea':
            inputNode = 
                <textarea type="text" name={key} placeholder=' ' className='scroll text'
                        rows="20" cols="150" required={value.required}></textarea>
            break;
        default:
            inputNode = 
                <input type={type} placeholder=' ' className='scroll text'
                    name={key} required={value.required}/>
    }

    return (
        <div className={`${styles.inputData} ${styles[type]} ${value.big && styles.big}`}>
            {inputNode}<br/>
            <div className={`${styles.underline}`}></div>
            <label className='text' htmlFor={key}>{value.placeholder}</label>
        </div>
    )
}

//listInput is a obj that like a list of input want to get in form
//key will be the name and that will be also label (if label contient 2 words, using underscore instead of space)
//value will be the type of input, and append 'R' in the beginning if required
const Form = ({ listInput = {
                    first_name:  {type: 'text', placeholder: 'First Name', required: true},
                    email:       {type: 'email', placeholder: 'Email', required: true}, 
                    password:    {type: 'password', placeholder: 'Password', required: true}, 
                    describtion: {type: 'textarea', placeholder: 'Description', required: true, big: true},
                },
                submitButton='', callback=()=>{},
                divClassName='' }) => {
    return (
        <form className={`${styles.form} ${divClassName}`} onSubmit={callback}>
            {mapForObject( listInput, ([key, value], index)=>(
                <div key={index} className={styles.formRow}>
                    {getInputElement(key,value)}
                </div>
            ))}
            {submitButton}
        </form>
    )
}

export default Form;
