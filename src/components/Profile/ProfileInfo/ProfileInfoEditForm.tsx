import React, {useState} from "react";
import {ProfileEditFormType, ProfileType, saveProfile} from "../../../redux/reducer/profile-reducer";
import {Button, Checkbox, Container, FormControlLabel, makeStyles, TextField} from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../redux/redux-store";
import s from './ProfileInfo.module.scss'

type ProfileInfoType = {
   profile: ProfileType
   setEditMode: (value: boolean) => void
}

export const ProfileInfoEditForm: React.FC<ProfileInfoType> = (props) => {
   const [openTooltip, setOpenTooltip] = useState<boolean>(false)
   const handleClick = () => setOpenTooltip(true)
   const handleClose = () => setOpenTooltip(false)

   const dispatch = useDispatch()

   const profile = useSelector<AppRootStateT, ProfileType | null>(state => state.profilePage.profile)

   const schema = yup.object().shape({
      aboutMe: yup
         .string()
         .required('About me is a required field'),
      fullName: yup
         .string()
         .required('Full name is a required field'),
      lookingForAJobDescription: yup
         .string()
         .required('Description is a required field'),
      contacts: yup.object().shape({
         website: yup
            .string()
            .url('Website should have correct format'),
         github: yup
            .string()
            .url('Github should have correct format'),
         vk: yup
            .string()
            .url('Vkontakte should have correct format'),
         facebook: yup
            .string()
            .url('Facebook should have correct format'),
         instagram: yup
            .string()
            .url('Instagram should have correct format'),
         twitter: yup
            .string()
            .url('Twitter should have correct format'),
         youtube: yup
            .string()
            .url('Youtube should have correct format'),
         mainLink: yup
            .string()
            .url('MainLink should have correct format'),
      })
   })

   const {register, handleSubmit, formState: {errors}} = useForm<ProfileEditFormType>({
      defaultValues: {
         aboutMe: profile?.aboutMe,
         fullName: profile?.fullName,
         lookingForAJob: profile?.lookingForAJob,
         lookingForAJobDescription: profile?.lookingForAJobDescription,
         contacts: {
            github: profile?.contacts.github,
            vk: profile?.contacts.vk,
            facebook: profile?.contacts.facebook,
            instagram: profile?.contacts.instagram,
            mainLink: profile?.contacts.mainLink,
            twitter: profile?.contacts.twitter,
            website: profile?.contacts.website,
            youtube: profile?.contacts.youtube,
         }
      },
      mode: "onBlur",
      resolver: yupResolver(schema)
   })

   const onSubmit: SubmitHandler<ProfileEditFormType> = (data) => {
      dispatch(saveProfile(data))
      props.setEditMode(false)
      console.log(data)
   }

   const useStyles = makeStyles(() => ({
      position: {
         display: 'flex',
         justifyContent: 'center',
         flexDirection: 'column',
         alignItems: 'center',
         padding: '0'
      },
      container: {
         margin: '100px 0'
      },
      width: {
         width: '100%'
      },
      btn: {
         width: '200px'
      },
      input: {
         height: '30px'
      }
   }))

   return (
      <Container className={`${useStyles().position}`}>
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
               severity={!!errors ? 'error' : 'success'}>
               {!!errors ? 'Data is filled incorrectly!!!' : 'Data saved!!!'}
            </MuiAlert>
         </Snackbar>

         <form
            className={`${useStyles().position} ${useStyles().width}`}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>

            <div className={s.profileEditWrap}>
               <div className={s.profileEditInfo}>
                  <span className={s.profileEditInfoDesc}>Profile info:</span>

                  <TextField
                     fullWidth
                     required
                     helperText={errors.fullName?.message}
                     error={!!errors.fullName}
                     label={'Full name:'}
                     margin={"normal"}
                     variant={'outlined'}
                     {...register("fullName")} />

                  <TextField
                     fullWidth
                     required
                     helperText={errors.aboutMe?.message}
                     error={!!errors.aboutMe}
                     label={'About me:'}
                     margin={"normal"}
                     variant={'outlined'}
                     multiline
                     minRows={2}
                     maxRows={10}
                     {...register('aboutMe')} />

                  <TextField
                     fullWidth
                     required
                     helperText={errors.lookingForAJobDescription?.message}
                     error={!!errors.lookingForAJobDescription}
                     label={'Looking for a job description:'}
                     margin={"normal"}
                     variant={'outlined'}
                     multiline
                     minRows={2}
                     maxRows={10}
                     {...register('lookingForAJobDescription')} />


                  <FormControlLabel style={{
                     margin: '20px 0',
                     alignSelf: 'self-start'
                  }} control={
                     <Checkbox
                        defaultChecked={profile ? profile.lookingForAJob : false}
                        color={'primary'}
                        {...register("lookingForAJob")}/>
                  } label={'Looking for a job?'}/>
               </div>
               <div className={s.profileEditContact}>
                  <span className={s.profileEditContactDesc}>Contacts:</span>
                  <div className={s.profileEditContactWrap}>
                     <div className={s.profileEditContactLeft}>
                        <TextField
                           helperText={errors.contacts?.facebook?.message}
                           error={!!errors.contacts?.facebook}
                           fullWidth
                           size={'small'}
                           label={'Facebook:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.facebook")} />

                        <TextField
                           fullWidth
                           size={'small'}
                           helperText={errors.contacts?.vk?.message}
                           error={!!errors.contacts?.vk}
                           label={'Vkontakte:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.vk")} />

                        <TextField
                           fullWidth
                           helperText={errors.contacts?.twitter?.message}
                           error={!!errors.contacts?.twitter}
                           size={'small'}
                           label={'Twitter:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.twitter")} />

                        <TextField
                           fullWidth
                           size={'small'}
                           helperText={errors.contacts?.instagram?.message}
                           error={!!errors.contacts?.instagram}
                           label={'Instagram:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.instagram")} />

                     </div>
                     <div className={s.profileEditContactRight}>
                        <TextField
                           fullWidth
                           size={'small'}
                           helperText={errors.contacts?.youtube?.message}
                           error={!!errors.contacts?.youtube}
                           label={'Youtube:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.youtube")} />


                        <TextField
                           fullWidth
                           size={'small'}
                           helperText={errors.contacts?.github?.message}
                           error={!!errors.contacts?.github}
                           label={'Github:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.github")} />

                        <TextField
                           fullWidth
                           size={'small'}
                           helperText={errors.contacts?.mainLink?.message}
                           error={!!errors.contacts?.mainLink}
                           label={'Main Link:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.mainLink")} />

                        <TextField
                           fullWidth
                           size={'small'}
                           helperText={errors.contacts?.website?.message}
                           error={!!errors.contacts?.website}
                           label={'Website:'}
                           margin={"normal"}
                           variant={'outlined'}
                           {...register("contacts.website")} />
                     </div>
                  </div>
               </div>
            </div>
            <Button
               style={{
                  fontFamily: `Mochiy Pop P One, sans-serif`
               }}
               className={useStyles().btn}
               fullWidth
               variant={"contained"}
               color="primary"
               type={"submit"}
               onClick={handleClick}
            >Save</Button>
         </form>
      </Container>

   )
}



