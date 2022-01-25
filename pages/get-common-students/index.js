import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/ui/Card';
import classes from '../../styles/GetCommonStudentsPage.module.css';
import Table from '../../components/data/Table';

const baseUrl =
    process.env.STUDENT_MANAGEMENT_BACKEND_BASE_URL ||
    'http://localhost:4000/api';

const getcommonstudentsAPI =
    process.env.STUDENT_MANAGEMENT_BACKEND_GETCOMMONSTUDENTS_API ||
    'getcommonstudents';

const generateAPIQueryString = (queryObject) => {
    let queryString = '';
    const tutors = queryObject.tutor;
    if (queryObject.tutor.constructor === Array) {
        for (let index = 0; index < tutors.length; index++) {
            const tutor = tutors[index];
            queryString += `tutor=${tutor}`;
            if (index != tutors.length - 1) {
                queryString += '&';
            }
        }
    } else {
        queryString = `tutor=${queryObject.tutor}`;
    }

    return queryString;
};

export async function getServerSideProps(context) {
    const query = generateAPIQueryString(context.query);
    try {
        // const query = context.resolvedUrl.split('?')[1];

        const { data } = await axios({
            method: 'get',
            url: `${baseUrl}/${getcommonstudentsAPI}?${query}`,
            headers: {
                'Content-type': 'application/json',
            },
        });

        return {
            props: {
                data: {
                    ...data,
                    tutors: context.query.tutor,
                },
            },
        };
    } catch (err) {
        if (err.response.status === 404) {
            return {
                notFound: true,
            };
        }

        let props = {
            data: {
                statusCode: 500,
            },
        };

        if (err.response) {
            props = {
                data: err.response.data,
            };
        }
        return {
            props,
        };
    }
}

export default function GetCommonStudentsResultsPage({ data }) {
    const router = useRouter();
    const [hasError, setHasError] = useState(false);
    const [students, setStudents] = useState([]);
    const [tutors, setTutors] = useState([]);

    const buttonHandler = () => {
        router.replace('/');
    };

    const ErrorCard = (
        <Card>
            <div className={classes['error-card-content']}>
                <h3>Error encountered</h3>
                <p>{data.details ? data.details[0].tutor : ''}</p>
                <button onClick={buttonHandler}>Run another query</button>
            </div>
        </Card>
    );

    const Results = (
        <Card>
            <div className={classes.results}>
                <h2>Common Students Result</h2>
                <h3>Queried Tutors</h3>
                <Table heading="Tutors" data={tutors} />
                <h3>Common students among the queried tutors</h3>
                <Table heading="Students" data={students} />
                <button onClick={buttonHandler}>Run another query</button>
            </div>
        </Card>
    );
    const display = hasError ? ErrorCard : Results;
    useEffect(() => {
        if (data.statusCode) {
            setHasError(true);
        } else {
            setHasError(false);
            setStudents([...data.students]);
            if (data.tutors.constructor === Array) {
                setTutors(data.tutors);
            } else {
                setTutors([data.tutors]);
            }
        }
    }, []);

    return <>{display}</>;
}
