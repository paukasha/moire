export const changeImageColor = (product) => {
  return product.gallery ? product.gallery.map(el => {
    return el.file.url
  }).join() : ''
}
