const { PrismaClient } = require('@prisma/client');

// Use standard Prisma Client with environment variable handling found in schema.prisma
// This automatically picks up DATABASE_URL from .env or system environment
const prisma = new PrismaClient();

console.log('🔌 Connecting via Prisma (Standard Client)...');

module.exports = prisma;
