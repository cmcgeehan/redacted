import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { operativeName } = await request.json()

    if (!operativeName) {
      return NextResponse.json(
        { error: 'Operative name is required' },
        { status: 400 }
      )
    }

    // Update the accepted_at timestamp for the operative
    // This marks when they officially accepted the mission through the UI
    const { data, error } = await supabase
      .from('mission_rsvps')
      .update({
        accepted_at: new Date().toISOString(),
      })
      .eq('operative_name', operativeName)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit RSVP' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Operative not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Mission accepted successfully', rsvp: data },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to check RSVP status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const operativeName = searchParams.get('operative')

    if (!operativeName) {
      // Return all RSVPs
      const { data, error } = await supabase
        .from('mission_rsvps')
        .select('*')
        .order('accepted_at', { ascending: false })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ rsvps: data })
    }

    // Check specific operative
    const { data, error } = await supabase
      .from('mission_rsvps')
      .select('*')
      .eq('operative_name', operativeName)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" which is fine
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ rsvp: data || null })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
