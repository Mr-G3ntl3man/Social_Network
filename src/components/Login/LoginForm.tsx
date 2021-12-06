import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {
   Button,
   Checkbox,
   Container,
   FormControlLabel,
   makeStyles,
   TextField
} from "@material-ui/core";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {FormDataType, login, UserDataType} from "../../redux/reducer/auth-reducer";
import {AppRootStateT} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import s from './form.module.scss'

export const LoginPage: React.FC = () => {
   const isAuth = useSelector<AppRootStateT, boolean>(state => state.auth.isAuth)
   const authorizedUser = useSelector<AppRootStateT, UserDataType | null>(state => state.auth.userData)

   if (isAuth) {
      return <Navigate to={authorizedUser ? `/profile/${authorizedUser.id}` : '/login'}/>
   }

   return <LoginForm/>
}

const LoginForm: React.FC = () => {
   const statusMessages = useSelector<AppRootStateT, string>(state => state.auth.statusMessages)
   const resultStatusMessage = useSelector<AppRootStateT, boolean>(state => state.auth.resultStatusMessage)
   const captchaUrl = useSelector<AppRootStateT, string | null>(state => state.auth.captchaUrl)

   const dispatch = useDispatch()

   const [openTooltip, setOpenTooltip] = useState<boolean>(false)
   const handleClick = () => setOpenTooltip(true)
   const handleClose = () => setOpenTooltip(false)

   const schema = yup.object().shape({
      email: yup
         .string()
         .email('Email should have correct format')
         .required('Email is a required field'),
      password: yup
         .string()
         .required('Password is a required field')
   })

   const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>({
      mode: "onBlur",
      resolver: yupResolver(schema)
   });

   const onSubmit: SubmitHandler<FormDataType> = (data) => dispatch(login(data))

   const useStyles = makeStyles(() => ({
      position: {
         display: 'flex',
         justifyContent: 'center',
         flexDirection: 'column',
         alignItems: 'center'
      },
      container: {
         padding: '100px 0'
      }
   }))

   return (
      <Container className={`${useStyles().position} ${useStyles().container}`}>
         <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: "right"}}
            open={openTooltip}
            autoHideDuration={2000}
            onClose={handleClose}>
            <MuiAlert
               style={{
                  fontFamily: `Mochiy Pop P One, sans-serif`,
                  letterSpacing: '2px'
               }}
               variant="filled"
               onClose={handleClose}
               severity={resultStatusMessage ? 'success' : 'error'}>
               {statusMessages}
            </MuiAlert>
         </Snackbar>

         <form
            className={`${useStyles().position} ${s.width}`}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>

            <TextField
               fullWidth
               helperText={errors.email?.message}
               error={!!errors.email}
               id={'email'}
               required
               label={'Email'}
               type={"text"}
               autoComplete={"username"}
               margin={"normal"}
               variant={'outlined'}
               {...register("email", {required: true})} />

            <TextField
               required
               fullWidth
               helperText={errors.password?.message}
               error={!!errors.password}
               id={'password'}
               label={'Password'}
               type={"password"}
               autoComplete={"current-password"}
               margin={"normal"}
               variant={'outlined'}
               {...register('password', {required: true})} />

            <FormControlLabel style={{
               margin: '20px 0',
               alignSelf: 'self-start'
            }} control={
               <Checkbox
                  color={'primary'}
                  {...register("remember", {required: false})}/>
            } label={'Remember me?'}/>


            {captchaUrl &&
            <div style={{
               marginBottom: '20px',
               textAlign: 'center'
            }}>
               <img src={captchaUrl} alt="captcha"/>
               <TextField
                  required
                  fullWidth
                  size={'small'}
                  helperText={errors.captcha?.message}
                  error={!!errors.captcha}
                  label={'Enter captcha'}
                  margin={"normal"}
                  variant={'outlined'}
                  {...register('captcha', {required: true})} />
            </div>
            }

            <Button
               style={{
                  fontFamily: `Mochiy Pop P One, sans-serif`
               }}
               fullWidth
               variant={"contained"}
               color="primary"
               onClick={handleClick}
               type={"submit"}>Login</Button>
         </form>
      </Container>
   )
}

export default LoginPage