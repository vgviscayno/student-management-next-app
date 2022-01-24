import { useState } from 'react';
import classes from './EmailList.module.css';

const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function EmailList({ title, listTitle, emails, setEmails }) {
    const [email, setEmail] = useState('');

    const addEmail = (event) => {
        event.preventDefault();

        const emailInput = email.toLowerCase();
        if (emails.indexOf(emailInput) != -1) {
            return alert('Email already in the list');
        }

        setEmails((prevState) => {
            return [...prevState, emailInput];
        });
        setEmail('');
    };

    const emailOnChange = (event) => {
        setEmail(event.target.value);
    };

    const removeEmail = (email) => {
        setEmails((prevState) => {
            return prevState.filter((existingEmail) => existingEmail !== email);
        });
    };

    return (
        <>
            <div className={classes['email-form']}>
                <label htmlFor="email">{`${title}'s Email address: `}</label>
                <input id="email" value={email} onChange={emailOnChange} />
                <button
                    type="button"
                    onClick={addEmail}
                    disabled={
                        email.trim().length > 0 &&
                        email.toLowerCase().match(emailRegex)
                            ? false
                            : true
                    }
                >
                    Add Email
                </button>
            </div>
            <h3>{listTitle}</h3>
            <ul className={classes['email-list']}>
                {emails.map((email) => (
                    <li key={email}>
                        <div className={classes['email-list-item']}>
                            <p>{email}</p>
                            <button onClick={removeEmail.bind(null, email)}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
