import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/lib/config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code') ?? ''
  const state = searchParams.get('state') ?? ''

  // When API_URL is empty (same-domain path routing), reconstruct the public
  // URL from request headers — nextUrl.origin returns 0.0.0.0:3000 (container
  // bind address) which is wrong when running behind kGateway/NLB.
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost'
  const proto = request.headers.get('x-forwarded-proto') || 'http'
  const base = API_URL || `${proto}://${host}`
  const backendUrl = `${base}/api/v1/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`

  return NextResponse.redirect(backendUrl)
}
