# Sandbox Meeting — What I'll Say (my script)

This is what I say out loud in the meeting while I share my screen and test the
site with him. It is not a file to send. The lines in *(italics)* are just cues
for when to show something — I don't read those out.

---

## 1. How I open

Hi Thomas, thanks for the time.

So the first thing I want to tell you — we already connected the TIDL website
to the PrescribeRx sandbox, and it's working. When someone finishes the quiz
and checks out, we send everything over to you, and it creates the patient and
the encounter on your side. Let me actually show you live, it's easier than
explaining it.

---

## 2. Showing the flow (while I share my screen)

*(Share screen, open the TIDL site.)*

So this is our site. Here's the quiz — the user answers a few questions about
their goal, their health, that kind of thing. Then they go to checkout.

When I submit checkout, we make one call to your unified intake endpoint, and
that single call creates the patient, the encounter, and the payment record all
at once. We also send the real medical info with it — the vitals, the quiz
answers, and the consent.

*(Run a real checkout.)*

Okay — see the confirmation page here? It shows the encounter number and the
patient number. Now let me open the PrescribeRx admin…

*(Open PRX admin, My Patients / Encounters.)*

…and there they are. Same patient, same encounter, sitting under TIDL Sandbox,
and it says Source: Api. So this whole flow works, end to end, right up to the
encounter. For example these ones here were all created by our checkout —
patients PAT-4445843178 and PAT-2995669706, and encounters ENC-8617840669 and
ENC-8980179717.

---

## 3. What I want from you (say this clearly)

So I'm not here to ask you what the next steps are — we already know them. What
I want is for you to look at what we built and just tell me we're doing it
right, and where we should improve.

Two things on our side I'd love you to confirm:

First, the way we send the intake — is that the right way, and are we sending
everything the visit actually needs?

Second, our setup — we use one API token, kept only on our server, never in the
browser. All our calls go through our own routes so the token stays private. And
we already have a webhook receiver ready for your status updates. Is that all
correct?

---

## 4. The launch plan (tell him our understanding)

Here's how we understand the plan — tell me if I've got it right.

The way we see it, there are two stages.

At launch, PrescribeRx handles everything — the payment and the order. So the
flow is: the user does the intake and checkout on our site, and from there you
and the provider take over — you handle the payment, the order, the review and
prescribe, all of it.

Then post-launch, TIDL builds its own payment gateway, so we'll collect the
payment on our side. But we still send the receipt over to you, and you prepare
the order and ship it. Is that the right way to see it?

---

## 5. The problem (say it, then show it)

Now, the one thing that's blocking us.

Everything works up to the encounter, but the Orders stay empty. And the reason
is there's no provider assigned to our org, so every encounter just stays
"Unassigned." Let me show you what I mean.

*(Open an encounter, e.g. ENC-8617840669, click Assign Provider.)*

See — I open the encounter, I click Assign Provider, and the list is empty.
There's nobody we can pick. And we can't move a provider into our org
ourselves — like Doctor Feelgood, he's under the demo org, not ours. Only you
can make that link on your side.

And since at launch you and the provider handle the order and the prescribe,
this is the thing we need from you first: can you attach a verified provider to
TIDL Sandbox, so we can finish the review and prescribe step and start seeing
Orders come through?

---

## 6. How I close

So that's really it. While we're here, take a look and just tell me — are we
doing it right, and what should we fix, or what do you need from us to move
forward?
