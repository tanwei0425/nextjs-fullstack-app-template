import { PrismaClient } from "@prisma/client";
// 防止，在开发模式下， PrismaClient 耗尽数据链接数，将实例化的 PrismaClient 对象存到全局 global
const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismadb
}
export default prismadb;
