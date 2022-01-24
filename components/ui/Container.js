import classes from './Container.module.css';

export default function Container(props) {
    return <div className={classes.container}>{props.children}</div>;
}
