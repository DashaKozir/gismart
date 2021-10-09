import React, {useRef, useState} from 'react';
import axios from 'axios';

function CreateForm( {showForm} ) {

    const [emailDirty, setEmailDirty] = useState(false)
    const [firstNameDirty, setFirstNameDirty] = useState(false)
    const [lastNameDirty, setLastNameDirty] = useState(false)
    const [emailError, setEmailError] = useState('Required')
    const [firstNameError, setFirstNameError] = useState('Required')
    const [lastNameError, setLastNameError] = useState('Required')

    const titleRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const pictureRef = useRef()

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'firstName':
                setFirstNameDirty(true)
                break
            case 'lastName':
                setLastNameDirty(true)
                break
        }
    }

    const emailHandler = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(emailRef.current.value).toLowerCase())) {
            setEmailError('Please, enter a correct email')
            if (!emailRef.current.value){
                setEmailError('Required')
            }
        } else {
            setEmailError('')
        }
    }

    const firstNameHandler = () => {
        if (firstNameRef.current.value.length < 2 || firstNameRef.current.value.length > 50){
            setFirstNameError('Please enter your first name from 2 to 50 characters long')
            if (!firstNameRef.current.value){
                setFirstNameError('Required')
            }
        } else {
            setFirstNameError('')
        }
    }

    const lastNameHandler = () => {
        if (lastNameRef.current.value.length < 2 || lastNameRef.current.value.length > 50){
            setLastNameError('Please enter your last name from 2 to 50 characters long')
            if (!lastNameRef.current.value){
                setLastNameError('Required')
            }
        } else {
            setLastNameError('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const title = titleRef.current.value
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const email = emailRef.current.value
        const picture = pictureRef.current.value

        axios.post('https://dummyapi.io/data/v1/user/create',{title, firstName, lastName, email, picture}, {
                headers: {
                    "app-id": "6154537832884b1a024b2f3c",
                    "Content-Type": "application/json"
                }})
            .then(res => {
                (console.log(res.data))
                alert('User successfully created :)')
                showForm()
            })
            .catch(error => {
                console.log({
                    'error response': error.response.data
                })
                alert(`User creating failed. ${JSON.stringify(error.response.data.data)}`)
                showForm()
            })
    }

    return (
        <div className='form_container'>
            <div className="form_main_window">
                <form className='form' onSubmit={handleSubmit}>
                    <h2 className='form_title'>Create user</h2>
                    <select className='form_item' name="title" placeholder='Title' ref={titleRef}>
                        <option value="mr">mr</option>
                        <option value="mr">mrs</option>
                        <option value="mr">ms</option>
                        <option value="mr">miss</option>
                        <option value="mr">dr</option>
                    </select>
                    <input onBlur={e => blurHandle(e)} onChange={firstNameHandler} className='form_item' name='firstName' type="text" placeholder='Enter your first name..' ref={firstNameRef} required/>
                    {(firstNameDirty) && <div style={{ color: 'red' }}>{firstNameError}</div>}
                    <input onBlur={e => blurHandle(e)} onChange={lastNameHandler} className='form_item' name='lastName' type="text" placeholder='Enter your last name..' ref={lastNameRef} required/>
                    {(lastNameDirty) && <div style={{ color: 'red' }}>{lastNameError}</div>}
                    <input onBlur={e => blurHandle(e)} onChange={emailHandler} className='form_item' name='email' type="text" placeholder='Enter your email..' ref={emailRef}  required/>
                    {(emailDirty) && <div style={{ color: 'red' }}>{emailError}</div>}
                    <input className='form_item' name='picture' type="text" placeholder='Enter the URL link to your picture..' ref={pictureRef}/>
                    <button type="submit" className="form_button">Create User</button>
                </form>
            </div>
        </div>
    );
}

export default CreateForm;