import type { NextApiRequest, NextApiResponse } from "next";

export const runMiddleware = <T extends unknown>(
  req: NextApiRequest,
  res: NextApiResponse<T>,
  fn: any
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
