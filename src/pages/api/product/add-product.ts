import type { NextApiRequest, NextApiResponse } from "next";
import { addProduct } from "../../../services/product";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const payload = { ...req.body };
    payload.image = "/images/uploads/" + payload.image;

    const add = await addProduct(payload);

    if (add.status === 201) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Resource not allowed." });
  }
}
