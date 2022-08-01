import { ErrorMessage, Field, Form, Formik } from "formik";
import {makeStyles} from '@mui/styles'
import { postMessage } from "./Footer.actions";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles(theme => ({
  root:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input:{
    width:'100%',
    marginTop:10,
    marginBottom:10,
    padding:3,
  },
  button:{
    fontFamily:'Spartan',
    backgroundColor: theme.palette.primary.dark,
    fontSize:16,
    fontWeight:500,
    border: 'none',
    padding: 5,
    borderRadius: 2,
    width: '50%',
    color:theme.palette.white.main,
    boxShadow: '0px 8px 15px -1px rgba(0,0,0,0.45)',
  },
  title:{
    fontFamily:'Spartan',
    fontSize:20,
    fontWeight:500,
  }
}))

const FooterForm=()=>{
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  const handleMessage = async(formData)=>{
    setLoading(true)
    const response = await postMessage(formData)
    setLoading(false)
  }

  return(
    <div>
     <div className={classes.title}>Se parte de COMPAR-E!</div>
     <Formik
       initialValues={{ email: '', companyName: '' }}
       validate={values => {
         const errors = {};
         if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = '(Email Invalido)';
         }
         return errors;
       }}
       onSubmit={(values) => {
        handleMessage(values)
       }}
     >
       {({ isSubmitting }) => (
         <Form >
           <div className={classes.root}  >
            <Field placeholder="Email" className={classes.input} type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field placeholder="Nombre de la empresa" className={classes.input} type="text" name="companyName" />
            <ErrorMessage name="companyName" component="div" />
           </div>   
           <button className={classes.button} type="submit" disabled={isSubmitting}>
             {
               loading?
               <CircularProgress/>
               :
              'ENVIAR'
              }
           </button>
         </Form>
       )}
      </Formik>
    </div>
  )
}

export default FooterForm