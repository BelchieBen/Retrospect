import { PrismaClient } from "@prisma/client";
import { PoolConfig } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV !== "development") {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
