import classes from './Table.module.css';

export default function Table({ heading, data }) {
    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>{heading}</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((datum) => {
                        return (
                            <tr key={datum}>
                                <td>{datum}</td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td>Tutor has no students</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
