import { Card, CardContent } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const OccupationalHealthcare : React.FC< {entry: OccupationalHealthcareEntry}> = ({entry}) => (
    <div>
        <Card sx={{ minWidth: 275, maxWidth: 350}}>
            <CardContent>
                {entry.date} <LocalHospitalIcon/>
            </CardContent>
            <CardContent>
                {entry.description}
            </CardContent>
            <CardContent>
                diagnose by {entry.specialist}
            </CardContent>
        </Card>
    </div>
);

export default OccupationalHealthcare;
