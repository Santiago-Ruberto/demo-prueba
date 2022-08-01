import Category from "./Category"
import { fetchCategories } from "./Categories.action"
import { useContext, useEffect, useState } from "react"
import { CategoriesContainer, Title } from "./styles"
import { LinearProgress } from "@mui/material"
import { GlobalContext } from "../../App"

export const categoriesMap = {
  'Microprocesadores': ['procesadores intel', 'procesadores amd', 'microprocesadores', 'procesadores', 'microprocesador'],
  'Almacenamiento': ['discos sólidos ssd', 'discos rígidos externos', 'discos rígidos internos', 'almacenamiento', 'ssd', 'discos sata', 'componentes pc discos accesorios'],
  'Placas de Video': ['placas de video geforce', 'componentes pc placas video', 'placa de video', 'placas de video radeon amd', 'placas de video geforce', 'placas de video'],
  'Fuentes de Alimentación': ['fuentes de alimentación', 'fuentes', 'fuentes certificadas', 'fuentes alimentacion', 'fuentes de poder'],
  'Motherboards': ['mothers amd', 'mothers intel', 'motherboard', 'motherboards', 'componentes pc placas motherboards'],
  'Coolers': ['coolers cpu', 'coolers ventiladores', 'coolers fan'],
  'Refrigeracion': ['refrigeracion'],
  'Monitores': ['monitores y proyectores', 'monitores'],
  'Memorias Ram': ['memoria ram', 'memorias-ram', 'memorias ram', 'memorias'],
  'Gabinetes': ['gabinetes', 'gabinetes y fuentes']
}

const Categories = ({ categories, setCategories, products, setFilteredProducts }) => {
  const [loading, setLoading] = useState(false)
  const globalContext = useContext(GlobalContext)


  const mapCategory = (category) => {
    for (const categoryTitle in categoriesMap) {
      if (categoriesMap[categoryTitle].includes(category.toLowerCase())) {
        return categoryTitle
      }
    }
    return category
  }

  const handleCategories = async () => {
    setLoading(true)
    const response = await fetchCategories()
    if (response.data) {
      setCategories(response.data.map((category) => category.trim().toLowerCase()))
    }
    setLoading(false)
  }

  useEffect(() => {
    handleCategories()
  }, [])

  const handleOnClick = (category) => {
    globalContext.setSelectedCategory(category)
    let filteredProductsByCategory = products.filter((product) => categoriesMap[category].includes(product.category.toLowerCase().trim()))
    setFilteredProducts(filteredProductsByCategory)
    globalContext.setCategorizedProducts(filteredProductsByCategory)
  }

  const generateCategoriesCard = () => {
    return (
      [...new Set(categories.map((category) => { return mapCategory(category) }))].map((category, index) => {
        return (
          <Category
            isSelectedCategory={globalContext.selectedCategory === category}
            category={category}
            index={index}
            handleOnClick={(category) => handleOnClick(category)}
            key={index} />
        )
      })
    )
  }


  return (
    <div>
      <Title>Categorias</Title>
      <CategoriesContainer>
        {generateCategoriesCard()}
      </CategoriesContainer>
      {loading &&
        <LinearProgress />
      }
    </div>
  )
}

export default Categories