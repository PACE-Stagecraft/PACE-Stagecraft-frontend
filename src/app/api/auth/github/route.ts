import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { API_URL } from '@/lib/config'

export async function GET(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost'
  const proto = request.headers.get('x-forwarded-proto') || 'http'
  const base = API_URL || `${proto}://${host}`
  const callbackUrl = `${base}/api/v1/auth/github`

  const { searchParams } = new URL(request.url)
  const params = searchParams.toString()

  redirect(params ? `${callbackUrl}?${params}` : callbackUrl)
}
