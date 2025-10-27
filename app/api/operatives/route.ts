import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('mission_rsvps')
      .select('operative_name')
      .order('operative_name', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch operatives' },
        { status: 500 }
      )
    }

    // Extract just the names from the data
    const operatives = data.map(row => row.operative_name)

    return NextResponse.json({ operatives }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
