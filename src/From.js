import React, { useEffect, useState } from 'react'
import Timer from './Timer';

const From = () => {
    const [OTP, setOTP] = useState(null);
    const [count, setCount] = useState(1);
    const [disableOTPBtn, setDisableOTPBtn] = useState(true);
    const [displayBtn, setDisplayBtn] = useState(false);
    const [input, setInput] = useState({ city: "", fullName: "", panNumber: "", email: "", phoneNumber: "", otp: "" });
    const { city, fullName, panNumber, email, phoneNumber, otp } = input;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const time = 10;//sec

    const [error, setError] = useState({ city: false, fullName: false, panNumber: false, email: false, phoneNumber: false, otp: false });
    const pattern = { city: /[a-zA-z]{3,20}/, fullName: /[A-Za-z\s]{5,140}/, panNumber: /[A-Z]{5}[0-9]{4}[A-Z]{1}/, email: /[a-z0-9.]{3,}[@]{1}[a-z]{3,5}[.]{1}[a-z]{2,3}/, phoneNumber: /[0-9]{10}/, otp: /[0-9]{4}/ };

    const onInputChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
        inputValidation(e);
        if (phoneNumber.length < 10)
            setDisplayBtn(false);
    }
    const inputValidation = (e) => {
        if (!pattern[e.target.id].test(e.target.value)) {
            setError({ ...error, [e.target.id]: true })
        }
        else {
            setError({ ...error, [e.target.id]: false })
        }
    }

    const generateOTP = (min = 1000, max = 9999) => {
        let otp = Math.floor(Math.random() * (max - min)) + min;
        setOTP(otp);
        setDisplayBtn(true);
        alert(`OTP sent ${count}`);
        alert(`Your OTP is ${otp}`);
        setTimeout(() => {
            setDisableOTPBtn(false)
        }, time * 1000);
    }
    const resendOTP = () => {
        if (count <= 3) {
            setDisableOTPBtn(true);
            setCount(count => count + 1);
            generateOTP();
            setMinutes(0);
            setSeconds(time);
            console.log(count);
        }
        else {
            setDisplayBtn(false);
            alert("Please try again after an hour.");
        }
    }
    useEffect(() => {
        if (!isNaN(phoneNumber) && phoneNumber.length === 10) {
            generateOTP();
        }
    }, [phoneNumber]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Number(otp) === Number(OTP)) {
            alert(`Thank you for verification ${fullName} `);
            setInput({ city: "", fullName: "", panNumber: "", email: "", phoneNumber: "", otp: "" })
            setDisplayBtn(false);
        } else {
            alert("Enter correct OTP");
        }
    }

    return (
        <form autoComplete='off' className='form-container' onSubmit={(e) => { handleSubmit(e) }}>
            <label htmlFor='city'>City:
                <input
                    type='text'
                    id='city'
                    pattern='[a-zA-z]{3,20}'
                    onChange={(e) => onInputChange(e)}
                    value={city}
                    maxLength='20' required />
            </label>
            {error.city ? <span className='errorMessage'>*Enter City name</span> : ""}
            <label htmlFor='panNumber'>PAN Number:
                <input
                    type='text'
                    id='panNumber'
                    pattern={`[A-Z]{5}[0-9]{4}[A-Z]{1}`}
                    onChange={(e) => onInputChange(e)}
                    value={panNumber}
                    maxLength='10' required />
            </label>
            {error.panNumber ? <span className='errorMessage'>*Enter a valid PAN number</span> : ""}
            <label htmlFor='fullName'>Full Name:
                <input
                    type='text'
                    id='fullName'
                    pattern='[A-Za-z\s]{5,140}'
                    value={fullName}
                    onChange={(e) => onInputChange(e)}
                    maxLength='140' required />
            </label>
            {error.fullName ? <span className='errorMessage'>*Enter name with length 5 to 140</span> : ""}

            <label htmlFor='email'>Email:
                <input
                    type='email'
                    id='email'
                    pattern='[a-z0-9.]{3,}[@]{1}[a-z]{3,5}[.]{1}[a-z]{2,3}'
                    onChange={(e) => onInputChange(e)}
                    value={email}
                    maxLength='255' required />
            </label>
            {error.email ? <span className='errorMessage'>*Enter valid email address</span> : ""}

            <label htmlFor='phoneNumber'>Phone Number:</label>
            <div className='inputField'>
                <span className='prefix'>+91</span>
                <input
                    type='tel'
                    id='phoneNumber'
                    pattern='[0-9]{10}'
                    value={phoneNumber}
                    onChange={(e) => onInputChange(e)}
                    maxLength='10' required />
            </div>
            {error.phoneNumber ? <span className='errorMessage'>*Enter only 10 digits</span> : ""}

            <label htmlFor='otp'>Enter OTP:
                <input
                    type='text'
                    id='otp'
                    pattern='[0-9]{4}'
                    minLength='4'
                    maxLength='4'
                    value={otp}
                    onChange={(e) => onInputChange(e)}
                    required />
            </label>
            {error.otp ? <span className='errorMessage'>*Enter 4 digits</span> : ""}
            {displayBtn &&
                <div className='resend'>
                    <Timer minutes={minutes} seconds={seconds} setMinutes={setMinutes} setSeconds={setSeconds} />
                    <button disabled={disableOTPBtn} onClick={() => resendOTP()}>Resend OTP</button>
                </div>}
            <button type='submit'>Submit</button>
        </form>
    )
}

export default From;
