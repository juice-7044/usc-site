"use client"

import { useEffect } from "react"

export function VapiWidget() {
  useEffect(() => {
    // Create the vapi-widget element
    const existingWidget = document.querySelector("vapi-widget")
    if (existingWidget) return

    const widget = document.createElement("vapi-widget")
    widget.setAttribute("public-key", "b28b4ee1-00f8-4531-b18c-e4761142de5a")
    widget.setAttribute("assistant-id", "c4f7112f-5e67-40c4-b5ce-ab8480fb34ac")
    widget.setAttribute("mode", "hybrid")
    widget.setAttribute("theme", "dark")
    widget.setAttribute("size", "full")
    widget.setAttribute("radius", "large")
    widget.setAttribute("accent-color", "#22D3EE")
    widget.setAttribute("main-label", "Chat with USC")
    widget.setAttribute("empty-chat-message", "Hi! How can I help you today?")
    widget.setAttribute("empty-voice-message", "Tap to talk.")
    widget.setAttribute("start-button-text", "Start Voice Chat")
    widget.setAttribute("end-button-text", "End Call")
    
    document.body.appendChild(widget)

    return () => {
      const widgetEl = document.querySelector("vapi-widget")
      if (widgetEl) {
        widgetEl.remove()
      }
    }
  }, [])

  return null
}
