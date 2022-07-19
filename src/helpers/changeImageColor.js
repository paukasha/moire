export const changeImageColor = (product) => {
  console.log(product)
  return product.gallery ? product.gallery.map(el => {
    return el.file.url
  }).join() : ''
}
