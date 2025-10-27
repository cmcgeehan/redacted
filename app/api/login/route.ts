import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { operativeName, password } = await request.json()

    if (!operativeName || !password) {
      return NextResponse.json(
        { error: 'Agent name and password are required' },
        { status: 400 }
      )
    }

    // Query database for operative with matching name and password
    const { data, error } = await supabase
      .from('mission_rsvps')
      .select('operative_name, operative_password')
      .eq('operative_name', operativeName)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'AGENT NOT RECOGNIZED', authenticated: false },
        { status: 401 }
      )
    }

    // Check password match
    if (data.operative_password !== password) {
      return NextResponse.json(
        { error: 'ACCESS DENIED - INVALID CREDENTIALS', authenticated: false },
        { status: 401 }
      )
    }

    // Success
    return NextResponse.json(
      {
        authenticated: true,
        operativeName: data.operative_name,
        message: 'Authentication successful',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', authenticated: false },
      { status: 500 }
    )
  }
}
