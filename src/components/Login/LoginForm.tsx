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
import {connect} from "react-redux";
import {FormDataType, login, setStatusMessAC} from "../../redux/reducer/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';


type MapDispatchToPropsType = {
   login: (data: FormDataType) => void
   setStatusMessAC: (message: string, showTooltip: boolean) => void
}
type LoginFormType = MapDispatchToPropsType & MapStateToPropsType

export const LoginPage = (props: LoginFormType) => {
   if (props.isAuth) {
      return <Redirect to={'/profile'}/>
   }

   return <LoginForm  {...props}/>
}

const LoginForm: React.FC<LoginFormType> = (props) => {
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

   const onSubmit: SubmitHandler<FormDataType> = (data) => props.login(data)


   const useStyles = makeStyles(() => ({
      position: {
         display: 'flex',
         justifyContent: 'center',
         flexDirection: 'column',
         alignItems: 'center'
      },
      container: {
         margin: '100px 0'
      },
      width: {
         width: '300px'
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
               severity={props.resultStatusMessage ? 'success' : 'error'}>
               {props.statusMessages}
            </MuiAlert>
         </Snackbar>

         <form
            className={`${useStyles().position} ${useStyles().width}`}
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

type MapStateToPropsType = {
   isAuth: boolean
   statusMessages: string
   resultStatusMessage: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   isAuth: state.auth.isAuth,
   statusMessages: state.auth.statusMessages,
   resultStatusMessage: state.auth.resultStatusMessage
})

export const LoginFormContainer = connect(mapStateToProps, {login, setStatusMessAC})(LoginPage)