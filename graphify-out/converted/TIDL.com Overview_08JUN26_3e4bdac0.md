<!-- converted from TIDL.com Overview_08JUN26.docx -->

TIDL Website Overview
TIDL is becoming a telehealth and peptide brand.
 The company is moving from a pain relief brand to one where a customer learns about a treatment, answers a short set of medical questions, is seen by a licensed doctor, and receives a prescription medicine shipped to their door.
A visitor lands on the site, picks a goal, completes a short medical intake, a doctor reviews and prescribes, a pharmacy ships the medicine, and the brand keeps in touch by text and email.
The hero product is a pre dosed pen.
 The first and most important category is weight loss with GLP 1 medicine, a well known class of weight loss treatment, delivered in a pen where the dose is already measured so the patient never mixes or measures anything. The pen is what sets TIDL apart from cheaper gray market alternatives, so the site is built around explaining it clearly.






# Site Pages




# User journeys
First purchase.
 A new visitor meets a benefit led home page, takes the quiz, completes the intake, and pays. A doctor reviews and prescribes, and a pharmacy ships. The customer gets a welcome text, and when the order ships, a how to video for the pen.

Reorder by text.
 Before the next dose runs out, the customer gets a reminder and can reorders by sending a text or ordering on the website. The system already knows their dose and shipping, confirms by text, and the order ships within a couple of days.

When something goes wrong.
 If a customer is unhappy, they reach support on the website or the text concierge. Anything medical goes to a doctor. Because there are no product returns, for safety, the fix is a refund, a reshipment, or a credit, and because TIDL runs its own payments it is issued directly with no waiting on an outside party.

Someone who starts and stops.
 If a visitor begins the quiz and leaves, the site remembers where they stopped and gently invites them back by email or text, straight to that point, rather than making them start over.

A clinic buying wholesale.
 A clinic that today sells gray market product is offered a legitimate path, where their patients see a doctor, get a real prescription, and the medicine is made by a licensed pharmacy. At launch this is handled by hand, with the self service portal following later.


# Website features
AI search and recommendations.
 A conversational search, grounded in PrescribeRx's large clinical knowledge base and reached through their service, lets a visitor describe a goal and get a relevant protocol and products with add to cart. It is the primary way to discover products on the site, not a chat bot bolted on the side, and any medical question is handed to a doctor.
Text concierge and reorder.
 A friendly text assistant helps a first time buyer through ordering, handles reorders, and answers product questions. At launch this is a welcome message, with the fuller assistant following soon after.
Education.
 A short how to video on using the pen, dosing, and storage, sent by text when the order ships. The pen is new to most people, so a smooth first experience matters.
Lifecycle messaging.
 A planned series of helpful emails and texts over time: a welcome, care after delivery, a reminder before reorder, and win back for lapsed customers. It also reactivates the list TIDL already has.
Reviews and social proof.
 Real customer reviews, photos, and a social feed across the home, category, and product pages. In health and wellness, proof from real people matters more than almost anywhere.
Found in search and AI answers.
 The site is built from day one to rank in Google and to be cited inside AI answers such as ChatGPT, Perplexity, Claude, and Gemini, on the bet that this becomes a major way people discover products.
Trust, privacy, and safety.
 Clear policies, secure checkout, an adults only gate at eighteen and over, accessibility for every user, and privacy controls. The whole site is designed to read as a legitimate medical brand.





# Business Infrastructure
# PrescribeRx is the technology platform that runs the software, the intake, the portals, and the clinical knowledge base. LocumTele is the network of telemedicine doctors who review each intake and write the prescription. They are closely linked, the same chief medical director leads both, and LocumTele's doctors are already switched on inside PrescribeRx.
PrescribeRx, the technology platform.
 Runs the medical software: it receives the intake, routes the order, holds the portals, and provides the clinical knowledge base that powers the on site search. TIDL shows this experience on its own site but does not rebuild the medical system.
LocumTele, the doctor network.
 The licensed telemedicine providers who review each intake and prescribe. This is a separate contract from PrescribeRx, with the providers switched on inside the platform.
The data layer, the single memory.
 One place, owned and built by TIDL, that stores a record of every customer, order, event, and even every ad and piece of content, sitting on top of every other system. Every channel reads from it and writes to it, and it is what the AI tools learn from. Private health information stays inside PrescribeRx. The data layer holds the safe marketing and behavioral data, and a separate, locked down area holds the medical signals, what someone was interested in and how far they got, under strict protection, so TIDL can recommend the right product to someone who started but did not buy, on the site and by email and text. That medical signal is never sent to advertising platforms.
Payment.
 At launch PrescribeRx collects payment and reconciles to TIDL, because a payment account in TIDL's own name takes time to set up. TIDL then moves to its own account, where it collects directly and controls refunds, with the card also kept on file in PrescribeRx so later reorders and follow on consults run through TIDL's own account.
Pharmacy network.
 A network of licensed pharmacies makes the medicine to order, packs it cold where needed, and ships it. If one is out, the order reroutes automatically to another.
The AI layer.
 A set of tools, TIDL owned, that run on top of the data and act on it: the concierge, lifecycle messaging, recommendations, and a watcher that tracks changes in medicine regulations. The on site search and chat are powered by PrescribeRx's knowledge base, with this layer styling the answers, and the results feed back so the system improves over time.
The website is the front, and the platform and pharmacies are the back.
 When a customer checks out, the order flows from the site into PrescribeRx, a LocumTele doctor reviews and prescribes, and a pharmacy makes and ships the medicine.
Every step updates automatically.
As each step happens, prescribed, then shipped, then delivered, the update flows back and triggers the right message to the customer and updates their account. The payment is collected, the correct tax is applied for each state, and everything is recorded once in the data layer, so nothing is entered twice.


# Timeline

# Rules
Every customer sees a real doctor and gets a real prescription.
 This is what makes the brand legitimate, and it is the heart of the offer.
Any medical question goes to a human.
 It is never answered by a bot.
Claims are cleared with counsel.
 All health and product claims are reviewed before they go live.
Adults only.
 The product is prescription only and gated to eighteen and over.
Premium and medical.
 The look has a premium and trustworthy feel, with the pen as the hero object.

TIDL Website Full System and Data













TIDL Data Layer and AI Stack



| Page | What it does |
| --- | --- |
| Home | The landing page. Sells the brand and the offer, shows the pen, points the visitor to the quiz, and carries trust signals and real customer proof. |
| Category pages | Six of them, one hub per area of health, for example weight loss. Each explains the category, shows the products, and offers a recommended bundle. |
| Product pages | The decision page for one product. Leads with the outcome, covers how it works, what is in it, what to expect, pricing, and safety, and carries reviews. |
| AI search and chat | A conversational search where a visitor describes a goal and gets a grounded recommendation, with the option to add it to cart. This is the main way to discover products. |
| Quiz and intake | The quiz is the way into buying, and it is also the short medical questionnaire the doctor needs. One guided flow with a progress bar and no dead ends. |
| Checkout | Where the customer pays. Accepts cards and mobile wallets, supports HSA and FSA health cards, and shows price, tax, and shipping clearly before confirming. |
| Confirmation and account | Confirms the order and gives a simple account: order status, tracking, one step reorder, saved details, and support. |
| Patient portal | After an order, the patient logs in to see appointments, their health record, plans, and order status. It runs on the medical platform and is branded as TIDL. |
| B2B clinic portal | Added after launch. A separate portal for clinics that buy wholesale, ordering in bulk or prescribing for their own patients. |
| Phase | What is included |
| --- | --- |
| Now, by July | Site live and mobile first, intake and checkout working end to end, the welcome text and pen video sending, a basic account, the AI search live, and the lifecycle messaging fully designed. |
| After launch | Lifecycle messaging switches on, the fuller text assistant goes live with safety guardrails, and the B2B clinic portal moves from manual to self service. |
| Phase 2 | Marketing: search and AI content, paid advertising, and social and creator campaigns, started once the site is producing real results. |
| Future | Personalized portals for each patient, and the same template reused across more product lines. |