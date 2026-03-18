"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/landing/Container";
import { FadeIn } from "@/components/landing/FadeIn";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit inquiry");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 md:gap-16 lg:grid-cols-2">
          <FadeIn className="space-y-10">
            <SectionHeader
              label="Get In Touch"
              title="Let's Design Something Enduring"
              description="Share your vision, timeline, and context. We'll respond with a thoughtful plan tailored to your space."
            />

            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 text-foreground" />
                <p className="text-lg">Gala No. 6, Shantidham Apartment, Lokmanya Nagar, Thane</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-foreground" />
                <p className="text-lg">official@aesthetica.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-5 text-foreground" />
                <p className="text-lg">+91 99999 88888</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delayMs={100}>
            <Card className="rounded-2xl border-0 bg-white shadow-sm">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="h-11 rounded-2xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="h-11 rounded-2xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Brief</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about scope, style, timeline, and expectations."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                      className="min-h-32 rounded-2xl"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-2xl" disabled={loading}>
                    {loading ? "Sending..." : "Send Inquiry"}
                  </Button>

                  <p aria-live="polite" className="text-sm text-muted-foreground">
                    {success ? "Thank you. Your inquiry has been submitted." : ""}
                  </p>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
