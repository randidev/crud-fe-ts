import type { NextApiRequest, NextApiResponse } from "next";

import multer from "multer";
import { imageStorage } from "./config";
import { runMiddleware } from "../../../middleware/api";

type Data = {
  message?: string;
};

const upload = multer({ storage: imageStorage });

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await runMiddleware<Data>(req, res, upload.single("image"));
  } catch (e) {
    /* handle error */
  }

  return res.json({ message: "Image successfully uploaded." });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
