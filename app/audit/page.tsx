import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAuditLogs() {
  const auditLogs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      admin: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 100 // Limit to 100 recent logs
  })
  return auditLogs
}

export default async function AuditLogsPage() {
  const auditLogs = await getAuditLogs()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.entityType}</div>
                    <div className="text-sm text-gray-500">ID: {log.entityId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {log.actorType === 'USER' && log.user ? (
                        <div>
                          <div>{log.user.name || 'N/A'}</div>
                          <div className="text-gray-500">{log.user.email}</div>
                        </div>
                      ) : log.actorType === 'ADMIN' && log.admin ? (
                        <div>
                          <div>{log.admin.name}</div>
                          <div className="text-gray-500">{log.admin.email}</div>
                        </div>
                      ) : (
                        <div>
                          <div>{log.actorType}</div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {log.details || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {auditLogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No audit logs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 