export default function applyDateValueMask (date) {
  return new Date(date).toLocaleDateString('pt-BR')
}
