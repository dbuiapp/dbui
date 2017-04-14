export default function join(expression, separator = ',') {
  if (Array.isArray(expression)) {
    return expression.join(separator);
  }
  return expression;
}
