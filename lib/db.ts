import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hnx-crm";

const globalCache = globalThis as typeof globalThis & {
  __mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = globalCache.__mongoose || {
  conn: null,
  promise: null,
};

if (!globalCache.__mongoose) globalCache.__mongoose = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "hnx-crm" });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
