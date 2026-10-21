import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET ||
  "adminone-ut-gsi-jwt-secret-key-2025-secure-91317007";

const secretKey = new TextEncoder().encode(JWT_SECRET_STRING);

export interface JWTPayload {
  id: number;
  name: string;
  nrp: string;
  [key: string]: unknown;
}

/**
 * Sign a JWT token containing user session payload.
 * Expires in 7 days.
 */
export async function signSessionToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT({
    id: payload.id,
    name: payload.name,
    nrp: payload.nrp,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verify a JWT token and extract user session payload.
 * Returns null if token is invalid or expired.
 */
export async function verifySessionToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (!payload || typeof payload !== "object") {
      return null;
    }

    return {
      id: Number(payload.id),
      name: String(payload.name || ""),
      nrp: String(payload.nrp || ""),
    };
  } catch {
    return null;
  }
}
