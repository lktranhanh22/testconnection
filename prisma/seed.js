const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      userId: 'user_001'
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'USER',
      userId: 'user_002'
    }
  })

  // Create sample admin
  const admin1 = await prisma.admin.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashed_password_here',
      isSuperAdmin: true
    }
  })

  // Create sample licenses
  const license1 = await prisma.license.create({
    data: {
      userId: user1.id,
      key: 'MINIMAX-ABCD1234',
      status: 'ACTIVE',
      activatedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      usageCount: 50
    }
  })

  const license2 = await prisma.license.create({
    data: {
      userId: user2.id,
      key: 'MINIMAX-EFGH5678',
      status: 'PENDING',
      usageCount: 0
    }
  })

  // Create sample audit logs
  await prisma.auditLog.create({
    data: {
      action: 'CREATE_USER',
      entityType: 'USER',
      entityId: user1.id,
      actorType: 'ADMIN',
      adminId: admin1.id,
      details: 'User created by admin',
      ipAddress: '192.168.1.100'
    }
  })

  await prisma.auditLog.create({
    data: {
      action: 'ACTIVATE_LICENSE',
      entityType: 'LICENSE',
      entityId: license1.id,
      actorType: 'USER',
      userId: user1.id,
      details: 'License activated by user',
      ipAddress: '192.168.1.101'
    }
  })

  // Create sample usage data
  await prisma.usage.create({
    data: {
      userId: user1.id,
      feature: 'TTS_GENERATION',
      details: JSON.stringify({ voice: 'female', text_length: 150 })
    }
  })

  await prisma.usage.create({
    data: {
      userId: user1.id,
      feature: 'VOICE_CLONE',
      details: JSON.stringify({ audio_duration: 30 })
    }
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 