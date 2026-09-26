-- Admission Reference Notes tab content
INSERT INTO page_sections (section_key, html_content, updated_at)
VALUES ('admission-reference', $ADMREF$<style>
.ref-topic { background:var(--card-bg); border:1.5px solid var(--border); border-radius:10px; margin-bottom:10px; overflow:hidden; }
.ref-topic summary { list-style:none; cursor:pointer; padding:13px 16px; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; color:var(--text); }
.ref-topic summary::-webkit-details-marker { display:none; }
.ref-icon { font-size:16px; }
.ref-title { flex:1; }
.ref-arrow { font-size:11px; color:var(--text-muted,#888); transition:transform 0.2s; }
.ref-topic[open] .ref-arrow { transform:rotate(180deg); }
.ref-body { padding:2px 16px 16px; border-top:1px solid var(--border); }
.ref-row { display:flex; gap:10px; padding:6px 0; border-bottom:1px solid var(--border); font-size:12.5px; }
.ref-row:last-child { border-bottom:none; }
.ref-label { width:190px; flex-shrink:0; color:var(--text-muted,#888); }
.ref-value { color:var(--text); }
.ref-portal { padding:10px 0; border-bottom:1px solid var(--border); }
.ref-portal:last-child { border-bottom:none; }
.ref-portal-name { font-size:12.5px; font-weight:700; color:var(--text); }
.ref-portal-link a { font-size:11.5px; color:#378ADD; text-decoration:none; word-break:break-all; }
.ref-portal-link a:hover { text-decoration:underline; }
.ref-portal-desc { font-size:11.5px; color:var(--text-muted,#888); margin-top:2px; }
</style>

<div class="section-title">📖 Reference Notes</div>
<div class="section-sub">Background info from your Access Data letter and the three orientation packs — not tasks, just things worth remembering.</div>

<details class="ref-topic" open>
  <summary><span class="ref-icon">🔑</span><span class="ref-title">Login Portals</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><div class="ref-portal"><div class="ref-portal-name">Password Self-Service</div><div class="ref-portal-link"><a href="https://selfservice.hof-university.de" target="_blank">https://selfservice.hof-university.de</a></div><div class="ref-portal-desc">Change/reset your password, manage security questions</div></div><div class="ref-portal"><div class="ref-portal-name">Microsoft 365 / Outlook</div><div class="ref-portal-link"><a href="https://portal.microsoftonline.com/" target="_blank">https://portal.microsoftonline.com/ · https://outlook.office.com</a></div><div class="ref-portal-desc">Email (checked daily — official comms), Office apps. MFA via Microsoft Authenticator</div></div><div class="ref-portal"><div class="ref-portal-name">MFA Portal (Shibboleth/VPN)</div><div class="ref-portal-link"><a href="https://mfa.hof-university.de" target="_blank">https://mfa.hof-university.de</a></div><div class="ref-portal-desc">Separate token registration — needed for Moodle, Primuss, Zoom, Panopto, Nextcloud & VPN. Microsoft's factor does NOT work here</div></div><div class="ref-portal"><div class="ref-portal-name">PRIMUSS Student Portal</div><div class="ref-portal-link"><a href="https://www3.primuss.de/cgi-bin/login/index.pl?FH=fhh" target="_blank">https://www3.primuss.de/cgi-bin/login/index.pl?FH=fhh</a></div><div class="ref-portal-desc">Enrollment docs, exam registration, address updates, matriculation certificate</div></div><div class="ref-portal"><div class="ref-portal-name">Moodle</div><div class="ref-portal-link"><a href="https://moodle.hof-university.de/" target="_blank">https://moodle.hof-university.de/</a></div><div class="ref-portal-desc">Course rooms, study materials, Zoom links — log in via Shibboleth</div></div><div class="ref-portal"><div class="ref-portal-name">Webfolders</div><div class="ref-portal-link"><a href="https://webfolders.hof-university.de" target="_blank">https://webfolders.hof-university.de</a></div><div class="ref-portal-desc">Access your personal university files worldwide</div></div><div class="ref-portal"><div class="ref-portal-name">Print Server</div><div class="ref-portal-link"><a href="https://printserver.hof-university.de/user" target="_blank">https://printserver.hof-university.de/user</a></div><div class="ref-portal-desc">Load printing account, retrieve printer ID, unlock Windows password</div></div><div class="ref-portal"><div class="ref-portal-name">Zoom</div><div class="ref-portal-link"><a href="https://hof-university.zoom.us/" target="_blank">https://hof-university.zoom.us/</a></div><div class="ref-portal-desc">Full-access university Zoom account</div></div><div class="ref-portal"><div class="ref-portal-name">Panopto</div><div class="ref-portal-link"><a href="https://hawhof.cloud.panopto.eu/" target="_blank">https://hawhof.cloud.panopto.eu/</a></div><div class="ref-portal-desc">Recorded lecture videos</div></div><div class="ref-portal"><div class="ref-portal-name">Nextcloud</div><div class="ref-portal-link"><a href="https://nextcloud.hof-university.de/" target="_blank">https://nextcloud.hof-university.de/</a></div><div class="ref-portal-desc">File sharing/cloud storage</div></div><div class="ref-portal"><div class="ref-portal-name">IT Service Site</div><div class="ref-portal-link"><a href="https://www.hof-university.com/studying-at-hof-university/services-and-support/it-service" target="_blank">https://www.hof-university.com/studying-at-hof-university/services-and-support/it-service</a></div><div class="ref-portal-desc">Guides for Office365, printing, WiFi, and more</div></div></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🆔</span><span class="ref-title">Your Account Basics</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><div class="ref-row"><span class="ref-label">Username (Windows ID)</span><span class="ref-value">mpadamuthum</span></div><div class="ref-row"><span class="ref-label">University email</span><span class="ref-value">mpadamuthum@hof-university.de</span></div><div class="ref-row"><span class="ref-label">Matrikelnummer</span><span class="ref-value">00417126</span></div><div class="note-box" style="margin-top:10px;"><strong>⚠️ Deliberately not stored here:</strong> your password and online registration number. This dashboard's repo is public — anything pushed to it (even to feed the private database) sits in git history in plaintext. Keep those two in a password manager instead.</div></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🔐</span><span class="ref-title">MFA Setup Recap (two separate registrations)</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><p>Two <strong>separate</strong> MFA registrations are required — completing one does not cover the other:</p>
<ol style="margin:6px 0 0 18px;padding:0;font-size:12.5px;line-height:1.7;">
<li><strong>Microsoft 365 / email</strong> — set up via portal.microsoftonline.com using the Microsoft Authenticator app (QR code + number-matching approval).</li>
<li><strong>Shibboleth services & VPN</strong> — set up separately via mfa.hof-university.de using your online registration number, then "Token enrollment wizard → Enroll Token" and scanning a second QR code with the same Authenticator app. This one generates a 6-digit code that refreshes every 30 seconds.</li>
</ol></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🏫</span><span class="ref-title">Hof University Fast Facts</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><div class="ref-row"><span class="ref-label">Founded</span><span class="ref-value">1994, run by the Free State of Bavaria</span></div><div class="ref-row"><span class="ref-label">Students</span><span class="ref-value">~4,000 · 30%+ international, 50+ nations</span></div><div class="ref-row"><span class="ref-label">Campus Hof (main)</span><span class="ref-value">University management, library, sports facilities, main canteen, start-up support</span></div><div class="ref-row"><span class="ref-label">Other locations</span><span class="ref-value">2nd campus: Münchberg · 3rd campus: Kronach · Learning site: Selb</span></div></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">✉️</span><span class="ref-title">Communication Culture Rules</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><ul style="margin:0 0 0 18px;padding:0;font-size:12.5px;line-height:1.8;">
<li>Email is the <strong>only official channel</strong> — WhatsApp/social/Moodle are extras, not replacements.</li>
<li>Contact <strong>one</strong> email address per issue — not several at once.</li>
<li>Unsure who to contact? Email welcome@hof-university.de — they'll redirect you.</li>
<li>Don't chase an update for <strong>3 weeks</strong> after your first email — repeated follow-ups slow things down.</li>
<li>Don't visit offices in person unless there's an open consultation hour, or you've been given a specific appointment.</li>
</ul></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🕐</span><span class="ref-title">Open Consultation Hours</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><div class="ref-row"><span class="ref-label">Orientation Week</span><span class="ref-value">Sept 25 – Oct 9, Mon–Fri, 1:00–2:00pm, in front of room A016</span></div><div class="ref-row"><span class="ref-label">During semester (from Oct 5)</span><span class="ref-value">Shared office hours in A016 — Mon–Thu 1:00–2:00pm, Fri 9:00–10:00am</span></div><div class="ref-row"><span class="ref-label">Closed</span><span class="ref-value">Weekends, holidays, lecture-free days, semester break</span></div></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🪪</span><span class="ref-title">CampusCard — What It Covers</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><ul style="margin:0 0 0 18px;padding:0;font-size:12.5px;line-height:1.8;">
<li><strong>Student ID</strong> + <strong>semester ticket</strong>: free on HofBus (all routes), specific DB Regio trains Hof↔Münchberg (not Agilis/ALEX), specific Agilis train Hof↔Selb — valid until end of semester (Mar 14 for WS, Sept 30 for SS)</li>
<li><strong>Library card</strong>, <strong>printing/copying</strong>, and <strong>canteen/Mensa</strong> payment</li>
<li>Only issued after enrollment + access data are created (a few days' wait) — collected in person, room A111</li>
<li>Same card reused every semester — just re-validated at the validation machine (near A115/B023) each term, only possible after paying that semester's fee</li>
</ul></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🏋️</span><span class="ref-title">Sports Facilities</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><ul style="margin:0 0 0 18px;padding:0;font-size:12.5px;line-height:1.8;">
<li>Opening hours: Mon–Sun 7:00am–10:00pm · Programs: Mon–Thu 4:30–10:00pm</li>
<li>Transponder for anytime access: €20 deposit, from the reception of the neighboring university (subject to stock)</li>
<li>Free program includes: Volleyball, Table Tennis, Crossfit, Unihockey, Badminton, Nordic Walking, Football, Yoga, Step Aerobic, Basketball, Running, Zumba and more (seasonal)</li>
<li>Weekly enrollment opens every Sunday 10:00pm for the following week</li>
</ul></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🏦</span><span class="ref-title">Bank Account — Documents Needed</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><p style="font-size:12.5px;">Documents needed to open a German current account ("Girokonto"):</p>
<ul style="margin:6px 0 0 18px;padding:0;font-size:12.5px;line-height:1.8;">
<li>Passport (non-EU) / ID card (EU)</li>
<li>Meldebescheinigung (from city registration)</li>
<li>Immatrikulationsbescheinigung (enrollment certificate)</li>
</ul>
<p style="font-size:12.5px;margin-top:8px;">Hof partners with <strong>Sparkasse Hochfranken</strong>. If your blocked account is with <strong>Kotak</strong>, note it isn't recognized in Germany — you'd need a German blocked account too (Sparkasse can do both). Legitimation must happen in person within 7 days of starting.</p></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🛂</span><span class="ref-title">Residence Permit — Documents Needed</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><p style="font-size:12.5px;">Email to Ms. Schaller (rebecca.schaller@stadt-hof.de) should include: full name, birthdate, visa expiry date.</p>
<p style="font-size:12.5px;margin-top:6px;">Documents to attach:</p>
<ul style="margin:6px 0 0 18px;padding:0;font-size:12.5px;line-height:1.8;">
<li>Filled application form</li>
<li>Proof of valid health insurance for studying (not travel insurance)</li>
<li>Financial statement — min. <strong>€934/month</strong>: recent blocked-account statement + current-account statements for the last 3 months</li>
<li>"Regelstudienzeitbescheinigung" — expected graduation date letter from student affairs</li>
</ul>
<p style="font-size:12.5px;margin-top:6px;">At the appointment itself, bring: originals of everything sent, 1 digital biometric passport photo, and approx. <strong>€100 cash</strong> (fee varies by country).</p></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">🏥</span><span class="ref-title">Health Insurance Notes</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><p style="font-size:12.5px;">Your insurer notifies Hof directly once your enrollment certificate is submitted to them — don't send proof to the university yourself.</p>
<p style="font-size:12.5px;margin-top:6px;"><strong>AOK</strong> and <strong>TK</strong> both have representatives on campus during the semester for in-person consultations.</p></div>
</details>
<details class="ref-topic">
  <summary><span class="ref-icon">⚠️</span><span class="ref-title">Scam Awareness</span><span class="ref-arrow">▾</span></summary>
  <div class="ref-body"><p style="font-size:12.5px;">German police, immigration authorities, and embassies will <strong>never</strong> ask for sensitive data (student number, bank details, visa info) over the phone. If someone claiming to be an authority does, don't share anything — hang up and report it to police if it happens. Hof itself is a safe city.</p></div>
</details>
$ADMREF$, now())
ON CONFLICT (section_key) DO UPDATE SET html_content = EXCLUDED.html_content, updated_at = EXCLUDED.updated_at;

-- My Room tab content
INSERT INTO page_sections (section_key, html_content, updated_at)
VALUES ('my-room', $ROOM$<style>
.my-room-content .rm-topic { background:var(--card-bg); border:1.5px solid var(--border); border-radius:10px; margin-bottom:10px; overflow:hidden; }
.my-room-content .rm-topic summary { list-style:none; cursor:pointer; padding:13px 16px; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; color:var(--text); }
.my-room-content .rm-topic summary::-webkit-details-marker { display:none; }
.my-room-content .rm-icon { font-size:16px; }
.my-room-content .rm-title { flex:1; }
.my-room-content .rm-arrow { font-size:11px; color:var(--text-muted,#888); transition:transform 0.2s; }
.my-room-content .rm-topic[open] .rm-arrow { transform:rotate(180deg); }
.my-room-content .rm-body { padding:2px 16px 16px; border-top:1px solid var(--border); }
.my-room-content .rm-row { display:flex; gap:10px; padding:6px 0; border-bottom:1px solid var(--border); font-size:12.5px; }
.my-room-content .rm-row:last-child { border-bottom:none; }
.my-room-content .rm-label { width:190px; flex-shrink:0; color:var(--text-muted,#888); }
.my-room-content .rm-value { color:var(--text); }
.my-room-content .rm-alert { background:rgba(214,69,69,0.08); border:1.5px solid rgba(214,69,69,0.35); border-radius:10px; padding:12px 14px; font-size:12.5px; margin-bottom:14px; color:var(--text); }
.my-room-content .rm-todo { margin:0; padding-left:0; list-style:none; }
.my-room-content .rm-todo li { display:flex; gap:8px; padding:6px 0; border-bottom:1px solid var(--border); font-size:12.5px; color:var(--text); }
.my-room-content .rm-todo li:last-child { border-bottom:none; }
.my-room-content .rm-body ul { margin:4px 0 4px 18px; padding:0; }
.my-room-content .rm-body li { font-size:12.5px; padding:3px 0; color:var(--text); }
</style>

<div class="my-room-content">

<div class="section-title">🏠 My Room</div>
<div class="section-sub">Wohnanlage An der Schützenstraße, Hof — Studierendenwerk Oberfranken. Everything from your Mietvertrag, Hausordnung and Brandschutzordnung, in one place.</div>

<div class="rm-alert">📮 <strong>Two documents still need your signature and to be sent back</strong> — the Mietvertrag (sign twice, fill in place/date) and the SEPA-Mandat (fill in your bank details once you have a German account, then sign). The Allgemeine Mietbedingungen, Hausordnung and Brandschutzordnung are for your records only — no signature needed.</div>

<details class="rm-topic" open>
  <summary><span class="rm-icon">📋</span><span class="rm-title">Quick Facts</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <div class="rm-row"><div class="rm-label">Address</div><div class="rm-value">Schützenstr. 10, 95028 Hof</div></div>
    <div class="rm-row"><div class="rm-label">Room</div><div class="rm-value">Einzelapartment (möbliert) · VO-Nr. 905-00-01-08-0</div></div>
    <div class="rm-row"><div class="rm-label">Personennummer</div><div class="rm-value">119126</div></div>
    <div class="rm-row"><div class="rm-label">Contract period</div><div class="rm-value">01.10.2026 – 29.02.2028</div></div>
    <div class="rm-row"><div class="rm-label">Grundmiete</div><div class="rm-value">€276.00</div></div>
    <div class="rm-row"><div class="rm-label">Betriebskosten (Vorauszahlung)</div><div class="rm-value">€96.00</div></div>
    <div class="rm-row"><div class="rm-label">Internet</div><div class="rm-value">€16.00</div></div>
    <div class="rm-row"><div class="rm-label">Gesamtmiete</div><div class="rm-value"><strong>€388.00/month</strong> — due by the 5th working day, via SEPA direct debit</div></div>
    <div class="rm-row"><div class="rm-label">Kaution (deposit)</div><div class="rm-value">€570.00 — payable in 3 equal monthly instalments, 1st due at start of tenancy</div></div>
    <div class="rm-row"><div class="rm-label">Deposit/rent account</div><div class="rm-value">Sparkasse Bayreuth · IBAN DE60 7735 0110 0009 0344 48 · BIC BYLADEM1SBT</div></div>
    <div class="rm-row"><div class="rm-label">Notice period</div><div class="rm-value">Only to 28.02 or 31.08, 2 months' written notice</div></div>
  </div>
</details>

<details class="rm-topic" open>
  <summary><span class="rm-icon">📞</span><span class="rm-title">Contacts</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <div class="rm-row"><div class="rm-label">Hausmeister (caretaker)</div><div class="rm-value">Herr Schmidt · 0173/2752769 — call about move-in (office hours 8:00–9:00)</div></div>
    <div class="rm-row"><div class="rm-label">Wohnheimverwaltung</div><div class="rm-value">Monika Zenkel · 0921 5559-01 · wohnheim@swo.bayern</div></div>
    <div class="rm-row"><div class="rm-label">Office hours</div><div class="rm-value">Mon, Tue, Thu, Fri 9–12 · Wed 13–16</div></div>
  </div>
</details>

<details class="rm-topic" open>
  <summary><span class="rm-icon">✅</span><span class="rm-title">To Do Before / At Move-In</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <ul class="rm-todo">
      <li>☐ Sign the Mietvertrag (2 signatures + place/date) and send it back to Studierendenwerk Oberfranken</li>
      <li>☐ Fill in and sign the SEPA-Mandat once you have a German bank account, then send it back</li>
      <li>☐ Hand the Bewerbungsbogen to the Hausmeister at move-in</li>
      <li>☐ Register at the Einwohnermeldeamt Hof within 2 weeks of moving in (Wohnungsgeberbescheinigung is already on file there)</li>
      <li>☐ Submit a valid Studienbescheinigung every 30.04 and 31.10</li>
    </ul>
  </div>
</details>

<details class="rm-topic">
  <summary><span class="rm-icon">🏢</span><span class="rm-title">House Rules — General (all Studierendenwerk buildings)</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <ul>
      <li>Quiet hours 22:00–7:00 — keep noise at room volume</li>
      <li>Building doors (main + side) always kept closed</li>
      <li>Waste separation is required — non-compliance gets billed to you</li>
      <li>No nails, screws or tape on walls/doors; thin steel pins/pushpins are fine — use picture rails</li>
      <li>No personal cooking plates, fridges/freezers, heaters or other high-power appliances</li>
      <li>Laundry rooms are for residents only</li>
      <li>Bikes/vehicles only in designated spots; fire lanes always clear</li>
      <li>Rundfunkbeitrag (German broadcasting fee) registration is required</li>
      <li>Away more than 7 days → tell the Hausmeister in advance</li>
      <li>Private parties need the Hausmeister's approval in advance; quiet hours still apply</li>
      <li>Beds must not be used without bedsheets</li>
      <li>No grilling or open flame on balconies, terraces, courtyards or green areas</li>
      <li>Absolute no-smoking in halls, stairwells, shared common rooms, and the waste/heat-pump area</li>
      <li>Don't remove official notices or post your own on the noticeboard</li>
      <li>No personal routers allowed in the dorms</li>
      <li>No shopping carts left on the grounds</li>
    </ul>
  </div>
</details>

<details class="rm-topic">
  <summary><span class="rm-icon">🚪</span><span class="rm-title">House Rules — Specific to An der Schützenstraße</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <ul>
      <li>Never stick anything to the window panes; close the window whenever you leave the room</li>
      <li>Don't sit on the fall-protection railings</li>
      <li>Ground-floor window sills are not an exit</li>
      <li>Never alter the room's ventilation slots or tape over them</li>
      <li>The flat roof is off-limits</li>
      <li>No smoking in the rooms</li>
      <li>Follow the posted floor-cleaning instructions (also on the Studierendenwerk website)</li>
      <li>No grilling near the façade outside</li>
      <li>No bikes in hallways or rooms — only in the designated bike area</li>
      <li>Never park or even unload in the fire lane</li>
      <li>No smoking near the waste enclosure/heat pump; never bin hot cigarette butts</li>
      <li>Max occupancy in shared common rooms: 38 people (ground floor) / 37 (upper floors)</li>
    </ul>
  </div>
</details>

<details class="rm-topic">
  <summary><span class="rm-icon">🔥</span><span class="rm-title">Fire Safety (Brandschutzordnung)</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <p style="font-size:12.5px;"><strong>⚠️ There is no building-wide fire alarm — you have to warn others yourself.</strong></p>
    <p style="font-size:12.5px;margin-top:6px;"><strong>Emergency number: 112</strong></p>
    <ul>
      <li>Stay calm → call 112 → warn others and help anyone who needs it → close doors behind you (don't lock them)</li>
      <li>Use the marked escape routes — never the lift — and go to the assembly point, then follow instructions</li>
      <li>Fire extinguishers are in the corridors and technical rooms; smoke detectors are in every apartment and networked in the hallways</li>
      <li>Keep escape routes, fire-brigade access lanes and hydrants clear at all times</li>
      <li>Only try to put out a fire yourself if it's small and you're not in danger — leave immediately if smoke builds up</li>
    </ul>
  </div>
</details>

<details class="rm-topic">
  <summary><span class="rm-icon">📄</span><span class="rm-title">Rental Conditions — Key Points (Allgemeine Mietbedingungen)</span><span class="rm-arrow">▾</span></summary>
  <div class="rm-body">
    <ul>
      <li>This is a rotation-principle student room, tied to being enrolled — it ends automatically if you leave or finish your studies, no notice needed</li>
      <li>Send a current Studienbescheinigung (enrollment certificate) by 30.04 and 31.10 every year, without being asked</li>
      <li>Extensions are possible near your thesis/final exams or for serious illness — apply in writing by 30.04 (for a 31.08 end date) or 31.10 (for a 28.02 end date)</li>
      <li>The landlord can raise the rent unilaterally in writing if costs increase</li>
      <li>Subletting only with prior permission, max 3 months, and only to another eligible student</li>
      <li>Register at the Einwohnermeldeamt within 2 weeks of moving in</li>
      <li>You're liable for damage caused by you, your visitors, or (in a shared flat) a flatmate's negligence</li>
      <li>The landlord can enter with 48h notice for repairs/inspections; immediate entry only if there's danger to life/health or serious property damage</li>
      <li>Pets: only small caged/tank animals without permission — anything else needs the landlord's sign-off</li>
    </ul>
  </div>
</details>

</div>
$ROOM$, now())
ON CONFLICT (section_key) DO UPDATE SET html_content = EXCLUDED.html_content, updated_at = EXCLUDED.updated_at;
