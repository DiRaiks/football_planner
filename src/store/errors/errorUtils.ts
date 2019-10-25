import get from 'lodash/get';

import { ResponseError } from '../types';

export function getErrorName(error: ResponseError) {
  const errorData = get(error, 'response.data.error');
  const errorStatus = get(error, 'response.status');

  if (errorStatus === 500) return 'INTERNAL_SERVER_ERROR';
  if (errorStatus === 502) return 'BAD_GATEWAY';

  return errorData.name || 'DEFAULT';
}
