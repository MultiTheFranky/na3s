import { zodResolver } from "@hookform/resolvers/zod";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  AlertColor,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";
import { User } from "shared";
import { TypeOf, boolean, object, string } from "zod";

import { addUser } from "../../api/user/addUser";
import { getUsers } from "../../api/user/getUsers";
import { Alert } from "../../components/alert/index";
import FormInput from "../../components/formInput/index";
import { Modal } from "../../components/modal/index";
import { AuthContext } from "../../contexts/auth/index";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

/**
 * Component for add user using a modal
 * @returns {JSX.Element} Add user modal
 */
export const AddUserModal = ({ open, setOpen, setUsers }: Props) => {
  const [newUser, setNewUser] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    admin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const { user } = React.useContext(AuthContext);
  const [addUserAlert, setAddUserAlert] = React.useState<{
    open: boolean;
    message: string;
    type: AlertColor;
  }>({ open: false, message: "", type: "success" });

  const addUserSchema = object({
    name: string().min(1).max(100),
    email: string().email("Email is invalid").min(1),
    password: string().min(8),
    admin: boolean(),
  });

  type AddUserInput = TypeOf<typeof addUserSchema>;

  const methods = useForm<AddUserInput>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      admin: false,
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  /**
   *
   * @param values
   */
  const onSubmitHandler: SubmitHandler<AddUserInput> = (values) => {
    if (user)
      addUser({
        name: values.name,
        email: values.email,
        password: values.password,
        admin: values.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then(() => {
          getUsers().then((users) => {
            setUsers(users);
          });
          setOpen(false);
        })
        .catch((error) => {
          setAddUserAlert({
            open: true,
            message: error.response.data,
            type: "error",
          });
          setTimeout(() => {
            setAddUserAlert({
              open: false,
              message: addUserAlert.message,
              type: addUserAlert.type,
            });
          }, 3000);
        });
  };

  return (
    <Modal
      open={open}
      width={"25vw"}
      onClose={() => {
        setOpen(false);
      }}
    >
      <>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Add user
          </Typography>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <FormInput
              name="name"
              required
              fullWidth
              label="Name"
              sx={{ mb: 2 }}
            />
            <FormInput
              name="email"
              required
              fullWidth
              label="Email"
              sx={{ mb: 2 }}
            />
            <FormInput
              name="password"
              required
              fullWidth
              label="Password"
              sx={{ mb: 2 }}
              type="password"
            />
            Admin:{" "}
            <FormInput
              name="admin"
              type="checkbox"
              label="Admin"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </FormProvider>
        <Alert
          open={addUserAlert.open}
          message={addUserAlert.message}
          type={addUserAlert.type}
        />
      </>
    </Modal>
  );
};
