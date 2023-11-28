import React from 'react';
import { HealthCheckEntry } from '../../types';
import { Card, CardContent, Icon } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, grey, red, yellow } from '@mui/material/colors';


const HealthCheck : React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    
    let iconName : React.ReactElement = <FavoriteIcon sx={{ color: 'white' }} />;

    switch (entry.healthCheckRating) {
        case 0:
            iconName = <FavoriteIcon sx= {{color: green[900]}}/>;
            break;
        
        case 1: 
            iconName = <FavoriteIcon sx= {{color: yellow[900]}}/>;
            break;
        
        case 2: 
            iconName = <FavoriteIcon sx= {{color: red[900]}}/>;
            break;

        case 3: 
            iconName = <FavoriteIcon sx= {{color: grey[900]}}/>;
            break;
        default:
            break;
    }

    return (

    <div>
    <Card sx={{minWidth: 275, maxWidth: 350}}>
        <CardContent>
            {entry.date} <LocalHospitalIcon/>
        </CardContent>
        <CardContent>
            {entry.description}
        </CardContent>
        <CardContent>
            <Icon>{iconName}</Icon>
        </CardContent>
        <CardContent>
            diagnose by {entry.specialist}
        </CardContent>
    </Card>
    </div>
    );
};

export default HealthCheck;