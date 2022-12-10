import { Card, CardContent, CardHeader, CardMedia, Tooltip } from "@mui/material";
import { Arma3BasicServerInfo } from "shared";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green, red } from "@mui/material/colors";
import { getAvatarText } from '../../utils';

/**
 * Arma 3 server component
 * @param {Arma3Server} server 
 * @returns {JSX.Element}
 */
export const Server = (server: Arma3BasicServerInfo) => {

    /**
     * Handle click on server card
     */
    const handleClick = () => {
        window.open(`steam://connect/${server.ip}:${server.port}`, '_blank');
    }

    return (
        <Tooltip title={"Click to connect to the server"}>
            <Card onClick={handleClick} sx={
                {
                    cursor: 'pointer',
                }
            }>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: server.isOn ? green[500] : red[500] }} aria-label="recipe">
                            {getAvatarText(server.name)}
                        </Avatar>
                    }
                    title={server.name}
                    subheader={`${server.ip}:${server.port}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={`https://raw.githubusercontent.com/jetelain/Arma3Map/master/maps/${server.mission.template.split(".")[1]}/0/0/0.png`}
                    alt={server.mission.template}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Players: {server.players} / {server.maxPlayers}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};