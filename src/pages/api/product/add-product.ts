import type { NextApiRequest, NextApiResponse } from "next";
import { IFormValue } from "../../product/add/type";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFormValue>
) {
  res.status(200).json({ name: "John Doe" });
}
