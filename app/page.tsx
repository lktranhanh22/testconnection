import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

async function getStats() {
  try {
    const [userCount, licenseCount, adminCount] = await Promise.all([
      prisma.user.count(),
      prisma.license.count(),
      prisma.admin.count(),
    ])
    
    return { userCount, licenseCount, adminCount }
  } catch (error) {
    console.error('Database error:', error)
    return { userCount: 0, licenseCount: 0, adminCount: 0 }
  }
}

export default async function Home() {
  const stats = await getStats()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Supabase Admin Dashboard
        </h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.userCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Licenses</h3>
            <p className="text-3xl font-bold text-green-600">{stats.licenseCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Admins</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.adminCount}</p>
          </div>
        </div>
        
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">👥 Users</h3>
            <p className="text-gray-600">Manage user accounts</p>
          </Link>
          
          <Link href="/licenses" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">🔑 Licenses</h3>
            <p className="text-gray-600">License management</p>
          </Link>
          
          <Link href="/admins" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">⚙️ Admins</h3>
            <p className="text-gray-600">Admin management</p>
          </Link>
          
          <Link href="/audit" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📊 Audit Logs</h3>
            <p className="text-gray-600">View system logs</p>
          </Link>
        </div>
      </div>
    </div>
  )
} 