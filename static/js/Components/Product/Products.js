import { Grid, Pagination, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { createRef, useContext, useEffect, useState } from 'react'
import Product from './Product'
import { fetchProducts, fetchFavorites, fetchFirstLoadProducts } from './Product.actions'
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { ProductsQuantity, ProductsTitle } from './styles'
import RangeSlider from '../Search/RangeSlider/RangeSlider'
import { GlobalContext } from '../../App'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'inherit !important',
    marginTop: 'inherit !important',
    marginLeft: 'inherit !important',
    display: 'flex',
    justifyContent: 'space-evenly',
    rowGap: 10,
    textAlign: '-webkit-center'
  },
  media: {
    height: 140,
  },
  title: {
    ...theme.title
  },
  divider: {
    ...theme.divider
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconViewContainer: {
    marginRight: 20,
    '@media (min-width: 400px)': {
      display: 'none'
    }
  },
  iconView: {
    marginLeft: 5,
    marginRight: 15,
    marginTop: 10,
    cursor: 'pointer'
  },
  pagination: {
    paddingBottom: 20,
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center'
  }
}))

export const formatPrice = (price) => {
  const splittedPrice = price.split('.')
  if (splittedPrice.length >= 3) {
    return parseFloat(parseFloat(price.substring(0, price.length - 2)).toFixed(4))
  }
  if (splittedPrice.length > 1 && splittedPrice[1].length <= 2) {
    return parseFloat(parseFloat(splittedPrice[0]).toFixed(4))
  }
  return parseFloat(parseFloat(price.replace('.', '')).toFixed(4));
}

const Products = ({ totalProducts, products, setProducts, setFilteredProducts, filteredProducts }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [viewOnSingleColumn, setViewOnSingleColumn] = useState(false)
  const [xs, setXs] = useState(5)
  const [productsPaginated, setProductsPaginated] = useState([])
  const productsPerPage = 20
  const [pagesQuantity, setPagesQuantity] = useState(0)
  const productsTopRef = createRef()
  const [pageNumber, setPageNumber] = useState(null)
  const [myFavorites, setMyFavorites] = useState([])
  const [showRange, setShowRange] = useState(false)
  const [loadedAllProds, setLoadedAllProds] = useState(false)
  const globalContext = useContext(GlobalContext)

  useEffect(() => {
    if (totalProducts > filteredProducts.length && filteredProducts.length !== 0) {
      setShowRange(true)
    } else {
      setShowRange(false)
    }
  }, [filteredProducts])

  const handleFirstLoad = async () => {
    setLoading(true)
    let response = await fetchFirstLoadProducts()
    setProducts(response.data)
    globalContext.setProducts(response.data)
    setFilteredProducts(response.data)
    setLoading(false)
  }

  const handleProducts = async () => {
    setLoading(true)
    let response = await fetchProducts()
    let favorites = await fetchFavorites()
    if (favorites) {
      let counts = {}
      favorites.data.forEach((favorite) => { counts[favorite.productId] = (counts[favorite.productId] || 0) + 1; })
      response.data.map((product) => {
        return product.favorites = (counts[product._id] || 0)
      })
      setMyFavorites(favorites.data.filter((favorite) => favorite.userId === localStorage.getItem('googleId')).map((favorite) => { return favorite.productId }))
    }
    if (response.data) {
      const productsWithFormattedPrice = response.data.map((product) => { return { ...product, price: formatPrice(product.price) } })
      setProducts(productsWithFormattedPrice)
      globalContext.setProducts(productsWithFormattedPrice)
      setFilteredProducts(productsWithFormattedPrice)
    }
    setLoading(false)
    setLoadedAllProds(true)
  }

  const handleOnChangeView = (value) => {
    setViewOnSingleColumn(value)
    if (!value) {
      setXs(5)
    } else {
      setXs(10)
    }
  }

  useEffect(() => {
    //handleFirstLoad()
    handleProducts()
  }, [])

  useEffect(() => {
    handlePagination(1)
    setPageNumber(1)
    setPagesQuantity(Math.ceil(products.length / 20))
  }, [products])

  const getRangePrice = () => {
    const minValue = globalContext.categorizedProducts.reduce(function (prev, curr) {
      return prev.price < curr.price ? prev : curr;
    });
    const maxValue = globalContext.categorizedProducts.reduce(function (prev, curr) {
      return prev.price > curr.price ? prev : curr;
    });
    globalContext.setRangePrice({ min: minValue.price, max: maxValue.price })
  }

  useEffect(() => {
    if (globalContext.categorizedProducts.length) {
      getRangePrice()
    }
  }, [globalContext.selectedCategory, globalContext.categorizedProducts])

  const handlePagination = (page) => {
    setPageNumber(page)
    setProductsPaginated(products.slice(productsPerPage * (page - 1), productsPerPage * page))
    if (page > 1 || pageNumber > 1) {
      productsTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }



  const showProductsWithMaxPrice = (priceTuple) => {
    return globalContext.categorizedProducts.filter((prod) => prod.price >= priceTuple[0] && prod.price <= priceTuple[1])
  }

  const handleSetFilteredProductsByPrice = (filteredProductsByPrice) => {
    setFilteredProducts(globalContext.categorizedProducts.filter((prod) => filteredProductsByPrice.includes(prod._id)))
  }


  return (
    <>
      {showRange && globalContext.rangePrice.max && globalContext.rangePrice.min &&
        <RangeSlider
          onChange={(price) => showProductsWithMaxPrice(price)}
          setFilteredProducts={(prods) => handleSetFilteredProductsByPrice(prods)}
        />}
      <div className={classes.headerContainer}>
        <ProductsTitle ref={productsTopRef}>Productos {loadedAllProds && <ProductsQuantity> ({filteredProducts.length})</ProductsQuantity>}</ProductsTitle>
        {
          viewOnSingleColumn ?
            <div className={classes.iconViewContainer}>
              <TableRowsRoundedIcon fontSize={'medium'} className={classes.iconView} />
              <GridViewOutlinedIcon onClick={() => handleOnChangeView(false)} fontSize={'medium'} className={classes.iconView} />
            </div>
            :
            <div className={classes.iconViewContainer}>
              <TableRowsOutlinedIcon onClick={() => handleOnChangeView(true)} fontSize={'medium'} className={classes.iconView} />
              <GridViewRoundedIcon fontSize={'medium'} className={classes.iconView} />
            </div>
        }
      </div>
      <Grid container rowSpacing={1} columns={{ xs: 11, sm: 17, md: 13 }} className={classes.root}>
        {
          loading ?
            Array.from(Array(6)).map((product, index) => (
              <Grid item xs={xs} sm={5} md={4} key={index}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))
            :
            productsPaginated.length === 0 ?
              <div>No se encontraron productos relacionados</div>
              :
              productsPaginated.map((product, index) => (
                <Grid item xs={xs} sm={5} md={3} key={index}>
                  <Product singleModeView={viewOnSingleColumn} product={product} isFavorite={myFavorites.includes(product._id)} />
                </Grid>
              ))
        }
      </Grid>
      {pageNumber &&
        <Pagination
          onChange={(e, page) => handlePagination(page)}
          className={classes.pagination}
          count={pagesQuantity}
          variant="outlined"
          color="primary"
          page={pageNumber}
        />
      }
    </>
  )
}
export default Products