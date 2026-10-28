import jwt from "jsonwebtoken";
export async function createContext({ req }: any) {
  const token = req.headers.authorization || "";
  if (!token) {
    return { user: null };
  }
  const [header, payload] = token.split(" ");
  if (header !== "Bearer" || !payload) {
    return { user: null };
  }
  try {
    const decoded = jwt.verify(payload, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };
    return { user: decoded };
  } catch (err) {
    return { user: null };
  }
}
