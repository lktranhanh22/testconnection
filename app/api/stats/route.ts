import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export async function GET() {
  try {
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

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 