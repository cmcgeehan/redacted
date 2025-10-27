import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { operativeName, status } = await request.json()

    if (!operativeName || !status) {
      return NextResponse.json(
        { error: 'Operative name and status are required' },
        { status: 400 }
      )
    }

    if (status !== 'accepted' && status !== 'declined') {
      return NextResponse.json(
        { error: 'Status must be "accepted" or "declined"' },
        { status: 400 }
      )
    }

    // Update the rsvp_status and accepted_at timestamp (only for accepted)
    const updateData: { rsvp_status: string; accepted_at?: string } = {
      rsvp_status: status,
    }

    // Only update accepted_at if status is 'accepted'
    if (status === 'accepted') {
      updateData.accepted_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('mission_rsvps')
      .update(updateData)
      .eq('operative_name', operativeName)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      console.error('Supabase error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        {
          error: 'Failed to submit RSVP',
          details: error.message || 'Unknown database error'
        },
        { status: 500 }
      )
    }

    // Check if any rows were updated
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Operative not found' },
        { status: 404 }
      )
    }

    // Use the first result if multiple exist (shouldn't happen with UNIQUE constraint)
    const result = data[0]

    return NextResponse.json(
      {
        message: status === 'accepted' ? 'Mission accepted successfully' : 'Mission declined',
        rsvp: result
      },
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
