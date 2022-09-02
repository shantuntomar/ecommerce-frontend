import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         '& > *': {
//             margin: theme.spacing(1),
//             width: theme.spacing(16),
//             height: theme.spacing(16),
//         },
//     },
// }));

function demo() {
    // const classes = useStyles();
    return (
        <div>
            <Paper elevation={10} style={{width:100 , height:100 , margin:'0 auto' , borderRadius:50}}>

            </Paper>

        </div>
    )
}

export default demo
