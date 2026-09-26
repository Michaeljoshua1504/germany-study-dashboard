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
