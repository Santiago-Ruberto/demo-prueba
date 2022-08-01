import { Autocomplete, TextField } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { useContext } from "react"
import { GlobalContext } from "../../App"
import { FONT_LATO } from "../../theme"
import { categoriesMap } from "../Category/Categories"
import { Container } from "./styles"


const useStyles = makeStyles(theme => ({
  autocomplete: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px !important'
    },
    '& .css-1958la6-MuiFormLabel-root-MuiInputLabel-root': {
      fontFamily: FONT_LATO
    }
  },
}))

const Search = ({ products, setFilteredProducts }) => {
  const classes = useStyles()
  const globalContext = useContext(GlobalContext)

  const checkName = (name, str) => {
    name = name.replace(/[^a-z0-9]/gi, '')
    str = str.replace(/[^a-z0-9]/gi, '')
    if (name.length > 0 && str.length > 0 && Math.abs(name.length - str.length) <= 2) {
      var pattern = name.trim().split("").map((x) => {
        return `(?=.*${x})`
      }).join("");
      var regex = new RegExp(`${pattern}`, "g")
      return str.match(regex);
    } else {
      return false
    }

  }

  const checkSufficientCoincidence = (product, input) => {
    const arrayProduct = product.trim().split(' ')
    const arrayInput = input.trim().split(' ')
    const intersection = arrayProduct.filter(element => arrayInput.includes(element) || arrayInput.some((inputWord) => checkName(inputWord, element)));
    return arrayInput.length === intersection.length
  }

  const handleOnInput = (productInput) => {

    if (productInput) {
      const matchingCategories = (Object.entries(categoriesMap).find(([key, value]) => value.includes(productInput.toLowerCase())) || [])[1]
      globalContext.eventTrackGA('Producto', `${productInput}`, 'search-for-prod')
      let filteredProductsByInput = products.filter(
        (product) => (
          productInput.toLowerCase().includes(product.title.toLowerCase()) ||
          product.title.toLowerCase().includes(productInput.toLowerCase()) ||
          matchingCategories?.includes(product.category.toLowerCase()) ||
          checkSufficientCoincidence(product.title.toLowerCase(), productInput.toLowerCase()) ||
          checkName(product.title.toLowerCase().substring(0, 5), productInput.toLowerCase().substring(0, 5))
        )
      ).sort(function (a, b) { return a.price - b.price })
      setFilteredProducts(filteredProductsByInput)
      globalContext.setCategorizedProducts(filteredProductsByInput)
    } else {
      setFilteredProducts(globalContext.products)
      globalContext.setCategorizedProducts(products)
      globalContext.setSelectedCategory(null)
    }
  }

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <Container>
      <Autocomplete
        id="products-search"
        freeSolo
        options={[]}
        renderInput={(params) => <TextField {...params} label={'Introduce una palabra clave...'} />}
        onChange={(event, value) => handleOnInput(value)}
        className={classes.autocomplete}
        onKeyUp={onEnter}
      />
    </Container>
  )
}

export default Search