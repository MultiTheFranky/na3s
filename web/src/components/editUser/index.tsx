import { Modal } from '../../components/modal/index';
import { Toolbar, Typography, FormGroup } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Close, Edit } from '@mui/icons-material';
import { AuthContext } from '../../contexts/auth/index';
import * as React from 'react';
import { User } from 'shared';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { updateUser } from '../../api/user/updateUser';
import { getUsers } from '../../api/user/getUsers';
type Props = {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    editUser: User;
}

/**
 * Component for add user using a modal
 * @returns {JSX.Element} Add user modal
 */
export const EditUser = ({ setUsers, editUser }: Props) => {

    const { user } = React.useContext(AuthContext);
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        open ? <Modal open={open} width={"25vw"} onClose={
            () => {
                setOpen(false);
            }
        }><>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Edit user
                    </Typography>
                    <IconButton onClick={() => {
                        setOpen(false);
                    }}>
                        <Close />
                    </IconButton>
                </Toolbar>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={editUser.admin} onChange={
                        (event) => {
                            editUser.admin = event.target.checked;
                            if (user) {
                                updateUser(editUser, user.token).then(() => {
                                    getUsers(user.token).then((res) => {
                                        setUsers(res);
                                        setOpen(false);
                                    });
                                });
                            }
                        }
                    } />} label="Admin" />
                </FormGroup>
            </>
        </Modal>
            :
            <IconButton onClick={() => {
                setOpen(true);
            }}>
                <Edit />
            </IconButton>
    )
}
