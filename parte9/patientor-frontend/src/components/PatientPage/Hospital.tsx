import { Card, CardContent } from "@mui/material";
import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital : React.FC< {entry: HospitalEntry}> = ({entry}) => (
    <div>
        <Card sx={{ minWidth: 275, maxWidth: 350}}>
            <CardContent>
                {entry.date} <LocalHospitalIcon/>
           
                
            </CardContent>
            <CardContent>
            {entry.description}
            </CardContent>
            <CardContent>
            {entry.discharge.criteria}
            </CardContent>
            <CardContent>
                diagnose by {entry.specialist}
            </CardContent>

        </Card>
    </div>
);

export default Hospital;