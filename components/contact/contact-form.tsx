"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const inquiryReasons = [
  { value: "trade-finance", label: "Trade Finance" },
  { value: "commodities", label: "Commodities" },
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "produce", label: "Produce" },
  { value: "procurement", label: "Procurement Services" },
  { value: "capital-raising", label: "Capital Raising" },
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "other", label: "Other" },
]

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  inquiryReason: string
  message: string
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [inquiryReason, setInquiryReason] = useState("")
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, inquiryReason }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setStatus("success")
      reset()
      setInquiryReason("")
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again or contact us directly.")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
        </p>
        <Button onClick={() => setStatus("idle")} variant="outline">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name", { required: "Name is required" })}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Your Company"
            {...register("company")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiryReason">Reason for Inquiry *</Label>
        <Select value={inquiryReason} onValueChange={setInquiryReason}>
          <SelectTrigger className={!inquiryReason ? "text-muted-foreground" : ""}>
            <SelectValue placeholder="Select a reason for your inquiry" />
          </SelectTrigger>
          <SelectContent>
            {inquiryReasons.map((reason) => (
              <SelectItem key={reason.value} value={reason.value}>
                {reason.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project or inquiry..."
          rows={6}
          {...register("message", { required: "Message is required" })}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
