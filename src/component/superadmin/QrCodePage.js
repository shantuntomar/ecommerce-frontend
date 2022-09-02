import React from 'react'
import Grid from '@material-ui/core/Grid';
import {postData , getData , ServerURL} from '../../FetchNodeServices';

function QrCodePage(props) {
    return (
        <div>

            <Grid container spacing={1}>

                <Grid item lg={12}>
                    <div style={{ border: '4px solid white', borderRadius: 50, marginRight: 10 , marginTop:5 , marginBottom:5 }}>
                        
                    </div>

                </Grid>
            </Grid>

            
            
        </div>
    )
}

export default QrCodePage
