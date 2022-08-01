import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqs from './faq.json'
import useStyles from './styles'
import { useEffect } from "react";


const Faq = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const mapFaqJson = () => {
    return faqs.map((faq, index) => {
      return (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={classes.faqTitle}>{faq.title}</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.faqText}>{faq.text}</div>
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>Preguntas Frecuentes</div>
      {mapFaqJson()}
    </div>
  )
}


export default Faq