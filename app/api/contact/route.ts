import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function sendToHubSpot(data: {
  name: string
  email: string
  phone?: string
  company?: string
  inquiryReason?: string
  message: string
}) {
  const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID
  const hubspotFormId = process.env.HUBSPOT_FORM_ID

  if (!hubspotPortalId || !hubspotFormId) {
    console.log("HubSpot not configured, skipping...")
    return
  }

  const nameParts = data.name.split(" ")
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""

  const hubspotData = {
    fields: [
      { name: "email", value: data.email },
      { name: "firstname", value: firstName },
      { name: "lastname", value: lastName },
      { name: "phone", value: data.phone || "" },
      { name: "company", value: data.company || "" },
      { name: "inquiry_reason", value: data.inquiryReason || "" },
      { name: "message", value: data.message },
    ],
  }

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hubspotData),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("HubSpot submission failed:", errorText)
    } else {
      console.log("Successfully sent to HubSpot")
    }
  } catch (error) {
    console.error("HubSpot API error:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, inquiryReason, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      message: inquiryReason ? `[${inquiryReason}] ${message}` : message,
    })

    if (error) {
      console.error("Error saving contact submission:", error)
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      )
    }

    // Send to HubSpot (non-blocking)
    sendToHubSpot({ name, email, phone, company, inquiryReason, message })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
