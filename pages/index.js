import { useState } from 'react';
import EmailList from '../components/controls/EmailList';
import Card from '../components/ui/Card';
import classes from '../styles/HomePage.module.css';
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();
    const [tutors, setTutors] = useState([]);
    const formOnSubmitHandler = (event) => {
        event.preventDefault();

        router.push({
            pathname: 'get-common-students/',
            query: { tutor: tutors },
        });
    };
    return (
        <Card>
            <div className={classes['card-content']}>
                <h2>Get Common Students</h2>
                <form onSubmit={formOnSubmitHandler}>
                    <EmailList
                        title="Tutor"
                        listTitle="Get common students for the following tutors:"
                        emails={tutors}
                        setEmails={setTutors}
                    />
                    <button
                        type="submit"
                        disabled={tutors.length > 0 ? false : true}
                    >
                        View Common Students
                    </button>
                </form>
            </div>
        </Card>
    );
}
