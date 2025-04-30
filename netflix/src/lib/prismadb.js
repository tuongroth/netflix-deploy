import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prismadb?: PrismaClient };

const client = globalForPrisma.prismadb || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismadb = client;
}

export default client;
