export default function dataToBackEnd (value) {
  if (!value) {
    return
  }

  return value
    .replace(/[^\w\s]/g, '')
    .replace(',', '.')
    .trim()
}
