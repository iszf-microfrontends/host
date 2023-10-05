export enum ErrorStatus {
  SERVER = 500,
  BAD_DATA = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export class HttpError {
  constructor(public status: ErrorStatus) {}
}

const createError = (status: ErrorStatus): new () => HttpError =>
  class extends HttpError {
    constructor() {
      super(status);
    }
  };

export const ServerError = createError(ErrorStatus.SERVER);
export const BadDataError = createError(ErrorStatus.BAD_DATA);
export const UnauthorizedError = createError(ErrorStatus.UNAUTHORIZED);
export const ForbiddenError = createError(ErrorStatus.FORBIDDEN);
export const NotFoundError = createError(ErrorStatus.NOT_FOUND);
export const ConflictError = createError(ErrorStatus.CONFLICT);
