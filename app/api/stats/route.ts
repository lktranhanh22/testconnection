import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET() {
  try {
    console.log('Starting stats API call...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    
    const [userCount, licenseCount, adminCount, auditLogCount] = await Promise.all([
      prisma.user.count(),
      prisma.license.count(),
      prisma.admin.count(),
      prisma.auditLog.count(),
    ])

    const stats = {
      userCount,
      licenseCount,
      adminCount,
      auditLogCount,
    }

    console.log('Stats fetched successfully:', stats)
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Database error details:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorName = error instanceof Error ? error.name : 'UnknownError'
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch stats',
        details: errorMessage,
        name: errorName
      },
      { status: 500 }
    )
  }
} 