import React from 'react';
import classes from './Layout.css';



const layout = (props) => {

    console.log(classes);

    return (
        <>
            <div>
                Something
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>

    );
}

export default layout;
