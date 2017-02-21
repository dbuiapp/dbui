import { join } from '../../../util';

export default function sqlTransform(params) {
  const {
    xExpression,
    yExpression,
    joinExpressions,
    whereExpressions,
    groupExpressions,
  } = params;

  return `
    SELECT
      ${xExpression} AS x,
      ${yExpression} AS y
      FROM ${join(joinExpressions, ' LEFT JOIN ')}
      ${whereExpressions ? `WHERE (${join(whereExpressions, ') AND (')})` : ''}
      ${groupExpressions ? `GROUP BY ${join(groupExpressions, ', ')}` : ''}
  `;
}
