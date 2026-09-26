INSERT INTO page_sections (section_key, html_content, updated_at)
VALUES ('travel', '<div class="section-title">🧳 Travel Prep — India to Hof</div>
  <div class="section-sub">Everything to buy or sort before Oct 4 flight (Qatar Airways, Student Club). Tick items off as you go — check state is saved automatically.</div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🎒 Bags & Backpacks</span>
        <span class="home-card-link" id="travel-progress-bags">1/2</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Cabin bag + personal item for Qatar Airways (7kg combined limit)</div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-bags-niwlix" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-bags-niwlix">Niwlix Crossbody Sling Bag — ₹570 — ordered online (personal item for flight)</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-bags-transitz"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-bags-transitz">Mokobara Transit Z Backpack — ₹6,499 — buy in person at Phoenix Mall of Asia (test laptop + iPad fit first)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🧳 Packing Materials</span>
        <span class="home-card-link" id="travel-progress-packing">5/5</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">For organizing the suitcase — ordered, already handled</div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-pickle" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-packing-pickle">Foreign Pickle Packing Covers — ₹549 — ordered (pack in checked baggage, not cabin)</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-cubes" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-packing-cubes">Oceanevo Packing Cubes (9pc) — ₹798 — ordered</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-shoebags" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-packing-shoebags">Lifelong Shoe Bags (10-pack) — ₹199 — ordered</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-sealer" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-packing-sealer">ENEM Sealing Machine — ₹1,391 — for packing in India only, not carried to Germany</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-lanyard" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-packing-lanyard">BowieMall Phone Lanyard — ₹338 — anti-theft wrist strap, ordered</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🔌 Electronics & Adapters</span>
        <span class="home-card-link" id="travel-progress-electronics">2/4</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Power and connectivity</div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-ceptics" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-electronics-ceptics">Ceptics EU Plug Adapter (Type E/F, 2-pack) — ₹604 — ordered. India uses Type D/M, Germany uses Type F — cheaper to buy in India than Germany</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-powerplate" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-electronics-powerplate">Portronics Power Plate — decided AGAINST (build-quality concerns) — buy a basic extension board locally in Germany instead</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-laptop"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-electronics-laptop">Laptop &amp; charger — essential for university, carry in cabin bag, never checked baggage</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-sim"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-electronics-sim">SIM / eSIM for Germany — not yet decided (buy on landing or pre-order eSIM)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">💳 Money &amp; Financial</span>
        <span class="home-card-link" id="travel-progress-money">0/3</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Sort before departure</div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-money-hdfc"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-money-hdfc">HDFC multicurrency forex card — visit branch, load with Euros</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-money-cash"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-money-cash">Carry Euro cash — at least €100–200 for arrival-day transport/emergencies before your forex card is active, and €300–500 total on hand for the first few days</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-money-coins"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-money-coins">Small coins/notes for airport trains/trams on arrival in Germany</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">📄 Documents &amp; Photos</span>
        <span class="home-card-link" id="travel-progress-documents">0/3</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Keep in cabin bag — never checked baggage</div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-photocopies"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-documents-photocopies">Document copies — physical + cloud: give parents one full physical set (passport, visa, admission letter, loan sanction letter, Expatrio certificate, TK insurance), scan everything to Google Drive, and carry your own set in cabin bag</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-photos"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-documents-photos">Passport-size photos — 10–15 copies. Needed for German registrations, university, and bank formalities after arrival. Print in India — much cheaper than in Germany</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-cabinbag"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-documents-cabinbag">Cabin bag essentials for travel day: passport + visa ALWAYS in cabin bag, never checked baggage — also keep admission letter, Expatrio certificate, TK insurance, accommodation booking, and emergency contacts with you</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">💊 Medicines &amp; Pharmacy</span>
        <span class="home-card-link" id="travel-progress-medicines">0/6</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Germany requires a prescription for most medicines — stock up now. Carry enough personal medication for 1–2 months, since TK health insurance takes a few days to activate after arrival</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-paracetamol"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-medicines-paracetamol">Paracetamol (Dolo/Calpol)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-bandaids"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-medicines-bandaids">Band-aids, antiseptic cream</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-ors"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-medicines-ors">ORS (oral rehydration) packets</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-cold"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-medicines-cold">Cold/cough relief (Vicks, Strepsils-type)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-antacid"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-medicines-antacid">Basic antacid (Digene/Eno)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-prescription"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-medicines-prescription">Any personal prescription medication — bring 1-2 months'' supply + the prescription itself</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🛒 Groceries &amp; Kitchen</span>
        <span class="home-card-link" id="travel-progress-groceries">0/3</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Indian food essentials for the first few weeks while you settle in and find Indian grocery stores in Hof</div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-groceries-spices"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-groceries-spices">Spices/masalas (whole and ground) — hard to find in Hof specifically</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-groceries-teacoffee"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-groceries-teacoffee">Tea/coffee, if you have a strong preference</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-groceries-readymade"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-groceries-readymade">A few ready-to-eat / instant food packets (MTR, Haldiram''s) and familiar snacks for the chaotic first week</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">👓 Eyewear</span>
        <span class="home-card-link" id="travel-progress-eyewear">0/2</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Lenskart stop</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-eyewear-specs"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-eyewear-specs">Backup pair of spectacles — eyewear is expensive in Germany, process works differently</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-eyewear-lenssolution"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-eyewear-lenssolution">Contact lens solution, if you use lenses — stock up, don''t rely on finding your brand there</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🧥 Winter Clothing</span>
        <span class="home-card-link" id="travel-progress-winterclothing">0/9</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Covers first 4-6 weeks. Hof winters are cold (0°C and below) — pack warm jackets, thermals and layers; Indian winters are not comparable. Don''t overpack: 1 good jacket from India is enough, buy more locally if needed since German winter wear is designed for the climate. Store links below are at Phoenix Mall of Asia.</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-jacket"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-jacket">1 good winter jacket — don''t bring 4-5 from India. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Columbia/store/1662584/" target="_blank">Columbia</a> (Ground Floor), or Decathlon MT100 padded jacket (~₹3,000)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-thermals"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-thermals">Thermal / HEATTECH innerwear — 1-2 sets, big difference in Hof winters. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Van-Heusen-Innerwear/store/16624b6/" target="_blank">Van Heusen Innerwear</a>, or Decathlon base layers</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-sweaters"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-sweaters">High-neck sweaters / fleece / hoodies — layering staple, worn almost daily Oct-March. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/JackandJones/store/1663b6c/" target="_blank">Jack &amp; Jones</a> (2nd Floor) · <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Columbia/store/1662584/" target="_blank">Columbia</a> · <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Celio/store/163bb43/" target="_blank">Celio</a></label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-gloveshat"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-gloveshat">Gloves + beanie/cap + scarf — don''t skip any, Hof gets windy and cold fast from October. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Columbia/store/1662584/" target="_blank">Columbia</a> · <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Accessorize/store/1662517/" target="_blank">Accessorize</a> (1st Floor)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-socks"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-socks">Woollen/warm socks (3-4 pairs) — cold apartment floors get to you fast. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Adidas-Originals/store/1662519/" target="_blank">Adidas Originals</a> · <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Columbia/store/1662584/" target="_blank">Columbia</a>, or Decathlon</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-umbrella"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-umbrella">Small windproof umbrella / rain protection — Germany winter = cold + rain + wind. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Lifestyle/Miniso/store/166259a/" target="_blank">Miniso</a> (Ground Floor), or pick up at any supermarket in Hof</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-skincare"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-skincare">Lip balm + moisturiser — cold weather is very drying, and skincare is pricier in Germany. 🏬 <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Beauty/Health-And-Glow/store/1640051/" target="_blank">Health &amp; Glow</a> · <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Beauty/LOccitane/store/1662569/" target="_blank">L''Occitane</a></label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-handwarmers"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-handwarmers">Hand/foot warmers — optional to bring, heat packs are available at Decathlon in Germany too</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-waterbottle"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-waterbottle">Hot-water bottle (Wärmflasche) — don''t bring, buy a certified one in Germany (cheaper there, built to German safety standards)</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">👟 Shoes</span>
        <span class="home-card-link" id="travel-progress-shoes">0/1</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Interim pair only — proper heavy winter boots to be bought in Germany once real snow hits. Wet feet in German winter is a real problem, don''t underestimate this.</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-shoes-mh100"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-shoes-mh100">Quechua MH100 Mid-Ankle Waterproof Hiking Boots (Decathlon) — ~₹3,500-4,000, OR 🏬 at Phoenix Mall of Asia: <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Geox/store/1662549/" target="_blank">Geox</a> (1st Floor) · <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Bata-Premium/store/1662580/" target="_blank">Bata Premium</a> (Ground Floor)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      </div>
    </div>
<script>
function updateTravelProgress() {
  document.querySelectorAll(''[id^="travel-progress-"]'').forEach(function(pill) {
    var card = pill.closest(''.home-card'');
    if (!card) return;
    var boxes = card.querySelectorAll(''input.cl-check'');
    var total = boxes.length;
    var checked = Array.from(boxes).filter(function(b){ return b.checked; }).length;
    pill.textContent = checked + ''/'' + total;
  });
}
document.addEventListener(''DOMContentLoaded'', function(){ setTimeout(updateTravelProgress, 300); });
if (typeof updateTravelProgress === ''function'') setTimeout(updateTravelProgress, 300);
</script>
', NOW())
ON CONFLICT (section_key) DO UPDATE SET html_content = EXCLUDED.html_content, updated_at = NOW();

UPDATE page_sections SET html_content = '<div class="section-title">✈️ Visa &amp; Relocation Journey — Admission to Arrival</div>
  <div class="section-sub">Every step from accepting your offer to settling into Germany. Priority-coded — red = critical, amber = important, blue = good to have. Tick items off as you go — progress saved in this browser.</div>

  <div class="progress-row">
    <div class="progress-track"><div class="progress-fill" id="visa-progress-fill" style="width:0%;"></div></div>
    <div class="progress-pct" id="visa-progress-pct">0%</div>
  </div>

  <div class="visa-gallery">

  <!-- PRE-VISA CHECKS -->
  <details class="phase phase-critical" open>
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">🔍</span>
        <span class="phase-sum-title">Pre-Visa Checks</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Fix before visa arrives</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">Things discovered during the Canada → Germany switch that need correcting <strong>before your visa arrives</strong>. All linked to Avanse loan account (number saved in Todoist). WhatsApp Aswini on Monday with the saved message in Todoist.</div>

      <div class="cl-item cl-critical persist-check" id="pv-1">
        <input type="checkbox" class="cl-check persist-check" id="pv-1-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-1-cb"><strong>Fix ISIC card — name &amp; institution</strong> — Currently shows "Michael Michael" + "Douglas". Must be corrected to "Michael Joshua" + "Hof University of Applied Sciences, Germany" before departure. Ask Aswini first; if unresolved contact isic.org with passport + Hof enrollment confirmation.</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="pv-2-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-2-cb"><strong>Check Avanse loan sanction letter</strong> — Verify it shows Hof University of Applied Sciences + Germany as destination. If it still mentions Canada or Douglas College, inform Aswini immediately — the visa consulate checks this document.</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="pv-3-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-3-cb"><strong>Life insurance linked to loan</strong> — Mandatory with Avanse loan (~1.25–1.5% of loan amount). Check if it mentions Canada or Douglas College. Ask Aswini: "Does my life insurance policy need updating for Germany?"</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="pv-4-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-4-cb"><strong>Overseas health insurance coverage</strong> — If Avanse bundled one, check which country it covers. Must be valid for Germany/Europe, not Canada. Ask Aswini for confirmation.</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>

      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="pv-5-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-5-cb"><strong>Avanse portal — verify destination &amp; university</strong> — Log in at avanse.com and confirm: destination = Germany, university = Hof University of Applied Sciences, course = MEng Software Engineering for Industrial Applications.</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>

      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="pv-6-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-6-cb"><strong>HDFC branch visit — 3 things</strong> — (1) Credit limit increase on Swiggy Ornge → ask for ₹1 lakh. (2) Upgrade to Millennia or Regalia First for lounge access. (3) Apply for Multicurrency Platinum ForexPlus Card — load Euros for Germany.</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>

      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="pv-7-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-7-cb"><strong>HSBC loan account purpose</strong> — Ask HSBC relationship manager if the loan account purpose references Canada or Douglas College. If yes, request update to Hof University of Applied Sciences, Germany.</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="pv-8-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-8-cb"><strong>Download Niyo Global app &amp; order card</strong> — Zero forex markup for daily Euro spending in Germany. Open account 100% online, no income proof needed. Use alongside HDFC card for complete coverage.</label></div>
        <span class="cl-chip chip-optional">Good to have</span>
      </div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="pv-9-cb" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="pv-9-cb"><strong>Texas Review — confirm nothing else Canada-linked</strong> — Ask your consultant: "Is there anything else in my file that still references Canada or Douglas College?" They have your complete file and will know immediately.</label></div>
        <span class="cl-chip chip-optional">Good to have</span>
      </div>
    </div>
  </details>

  <!-- PHASE 0 -->
  <details class="phase phase-done" id="phase-0" open>
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">📋</span>
        <span class="phase-sum-title">Phase 0 — Before You Apply</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Foundational documents</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">Foundational documents every Indian applicant needs before a German university or the embassy will even look at your file.</div>

      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-0-1" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-0-1">APS Certificate (Akademische Prüfstelle) obtained — mandatory for Indian students, verifies your academic documents. ✓ You already have this.</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>

      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-0-2" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-0-2">IELTS certificate valid and not expiring before your intake (yours: 6.5)</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-0-3" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-0-3">Any university-specific language certificate obtained (e.g. Goethe A1 German for Fulda)</label></div>
        <span class="cl-chip chip-optional">Good to have</span>
      </div>
    </div>
  </details>

  <!-- PHASE 1 -->
  <details class="phase phase-done" id="phase-1">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">📬</span>
        <span class="phase-sum-title">Phase 1 — Admission Letter</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Zulassungsbescheid received</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">The clock starts here. This letter is the foundation document everything else depends on.</div>

      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-1-1" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-1-1">Read the offer carefully — note whether it''s conditional or unconditional, and the accept-by deadline</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-1-2" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-1-2">If conditional — fulfil every listed condition (missing documents, certificates) well before the deadline</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-1-3" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-1-3">Formally accept the offer / confirm your intent to enroll, in writing if required</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-1-4" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-1-4">Pay any enrollment deposit or first tuition instalment if applicable (e.g. Hof MEng tuition)</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-1-5" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-1-5">Request the official enrollment/admission confirmation letter — required for the blocked account and the visa application</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
    </div>
  </details>

  <!-- PHASE 2 -->
  <details class="phase" id="phase-2">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">💶</span>
        <span class="phase-sum-title">Phase 2 — Blocked Account</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Sperrkonto · Expatrio</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">2026 requirement: <strong>€11,904</strong> (€992 × 12 months) deposited up front, released at <strong>€992/month</strong> after you arrive. <strong>✅ Chosen provider: Expatrio Value Package</strong> — €119 setup fee + €9/month. Accepted by all German authorities.</div>

      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-1" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-2-1">Sign up for the <strong>Expatrio Value Package</strong> at expatrio.com — includes blocked account, TK health insurance, free German bank account, travel insurance, and Expatrio Scholarship eligibility.</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-2" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-2-2">Register online — submit passport ID + Hof admission/offer letter as proof of admission</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-3" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-2-3">Transfer €11,904 — coordinated with Avanse loan (Aswini) and Zenith Forex (Vaishnavi)</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-4" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-2-4">Blocking confirmation (Sperrbestätigung) PDF downloaded — submitted to visa file</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-5" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-2-5">Free Expatrio German Bank Account connected — €992/month releases automatically once you arrive in Germany</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-6" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-2-6"><strong>Expatrio Scholarship</strong> — submit a short video by <strong>September 30, 2026</strong>. Top prize: €15,000. Free to apply, nothing to lose. Only available to Value Package customers.</label></div>
        <span class="cl-chip chip-important">30 Sep deadline</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-2-7" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-2-7"><strong>⚠️ Update arrival date in Expatrio — do this as soon as flight is booked.</strong> Log in to the Expatrio app or User Portal and update your exact arrival date. This sets the correct start date for your Travel Insurance and mandatory Health Insurance (TK). Do NOT leave the default date — it must match your actual flight date.</label></div>
        <span class="cl-chip chip-important">After Flight Booked</span>
      </div>
    </div>
  </details>

  <!-- PHASE 3 -->
  <details class="phase" id="phase-3">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">🏥</span>
        <span class="phase-sum-title">Phase 3 — Health Insurance</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>TK via Expatrio</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">Health insurance is mandatory for your visa and university enrollment. <strong>✅ Chosen provider: TK (Techniker Krankenkasse)</strong> — Germany''s largest public insurer, English-language support, fully digital.</div>

      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-3-1" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-3-1"><strong>Travel/Incoming Insurance</strong> — free with Expatrio Value Package. Covers you from the moment you leave India until TK activates in Germany. Mandatory for the visa application. ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-3-2" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-3-2"><strong>TK Public Health Insurance</strong> — ~€120/month (under 30). Bundled in Expatrio Value Package. English-speaking support, TK-Flex cashback up to €90/year. Best choice for international students in Germany. ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-3-3" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-3-3"><strong>TK notifies Hof electronically — do NOT submit anything yourself.</strong> Hof requires this notification before issuing your student credentials and CampusCard. Confirm TK has notified Hof before you arrive.</label></div>
        <span class="cl-chip chip-important">Confirm</span>
      </div>
    </div>
  </details>

  <!-- PHASE 4 -->
  <details class="phase" id="phase-4">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">🛂</span>
        <span class="phase-sum-title">Phase 4 — Visa Application</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Germany Consulate Chennai</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">One-shot process — remonstration (appeal) procedure abolished from July 2025, so the file needed to be complete and correct the first time. ✅ Application submitted and received by Germany Consulate Chennai on 10 Sep 2026. Ref: saved in Todoist.</div>

      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-1" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-4-1">Registered on CSP (digital.diplo.de/visa), completed questionnaire and uploaded documents for digital pre-screening ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-1b" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-4-1b">VFS Chennai appointment booked and attended — 9 Sep 2026, Ramee Mall, Anna Salai, Chennai ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-2" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-4-2">Document set submitted: passport, biometric photos, admission letter, APS certificate, academic transcripts, CV, SOP, blocked account confirmation, health insurance proof ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-3" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-4-3">Visa fee (~€75) + VFS service charge paid ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-4" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-4-4">Biometrics and document submission completed at VFS Chennai ✅</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-5" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-4-5"><strong>✅ Visa Dispatched — Out for Delivery Soon</strong> — Passport dispatched 22 Sep 2026. Ref: saved in Todoist. <strong>Received at Chennai Operations Center</strong> — now in local courier network. Delivery expected very soon. Keep your phone available and collect immediately when it arrives.</label></div>
        <span class="cl-chip chip-done">Dispatched ✅</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-4-6" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-4-6"><strong>Collect passport with national (D) visa</strong> — Courier dispatched 22 Sep 2026. Track delivery and collect as soon as it arrives. Check the visa validity dates and entry conditions immediately upon receipt.</label></div>
        <span class="cl-chip chip-critical">Coming Soon 📦</span>
      </div>
    </div>
  </details>

  <!-- PHASE 5 -->
  <details class="phase phase-important" id="phase-5">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">🧳</span>
        <span class="phase-sum-title">Phase 5 — Pre-Departure</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Before you fly</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">Once the visa is in hand, focus shifts to logistics. Organized by category — work through each section before departure.</div>

      <!-- ✈️ FLIGHT & HOUSING -->
      <div class="phase-intro" style="margin-top:12px;"><strong>✈️ Flight & Housing</strong></div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-1" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-1"><strong>Book your flight</strong> — One-way is fine, return tickets not required for a student visa. Book as soon as visa arrives to get better fares. Use Qatar Airways Student Club promo code for 10% off — saved in Todoist.</label></div>
        <span class="cl-chip chip-critical">Book on visa arrival</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-2" onchange="saveCheck(this)" checked>
        <div class="cl-body"><label class="cl-label" for="visa-5-2"><strong>Hof dormitory application ✅</strong> — Moodle housing quiz submitted (5 Aug), signed declaration form emailed to housing@hof-university.de, payment confirmation (Quittung €3,448.22) sent 28 Aug 2026. Preference: Am Saalepark (single) → Am Eichelberg (single). Awaiting offer.</label></div>
        <span class="cl-chip chip-done">Submitted</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-2b" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-2b"><strong>Confirm room booking</strong> — Once housing offer arrives, review, accept, and confirm with housing@hof-university.de</label></div>
        <span class="cl-chip chip-important">Waiting on Hof</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-3" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-3"><strong>Temporary accommodation</strong> — Arrange hostel/Airbnb for first 1–3 weeks if permanent housing isn''t confirmed before you fly.</label></div>
        <span class="cl-chip chip-important">If needed</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-5" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-5"><strong>Confirm Expatrio blocked account</strong> — Verify it''s ready to release €992/month once you land and activate it.</label></div>
        <span class="cl-chip chip-important">Before Departure</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-23" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-23"><strong>Submit Hof Arrival Form</strong> — Submit after booking flight — housing@hof-university.de needs your exact arrival date and flight details.</label></div>
        <span class="cl-chip chip-important">After Flight Booked</span>
      </div>

      <!-- 🏦 BANKING & FINANCE -->
      <div class="phase-intro" style="margin-top:18px;"><strong>🏦 Banking & Finance</strong></div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-6" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-6"><strong>Visit HDFC Branch</strong> — (1) Credit limit increase on Swiggy Ornge → ₹1 lakh, (2) Upgrade credit card to Millennia or Regalia First for lounge access, (3) Apply for Multicurrency Platinum ForexPlus Card — load Euros, (4) Inform bank about international travel so cards don''t get blocked, (5) Convert savings account to <strong>NRO account</strong> (mandatory once you become NRI after 182+ days abroad), (6) Open <strong>NRE account</strong> for Germany earnings — tax-free interest, fully repatriable.</label></div>
        <span class="cl-chip chip-critical">Before Departure</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-7" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-7"><strong>Inform HSBC</strong> — Notify about NRI status change. Confirm loan account purpose is updated to Hof University of Applied Sciences, Germany.</label></div>
        <span class="cl-chip chip-critical">Before Departure</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-17" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-17"><strong>Avanse EMI repayment plan</strong> — Confirm with parents who handles EMI payments back home. Set up auto-debit from NRO account if possible. Ask Aswini ma''am about moratorium period — when do repayments actually start?</label></div>
        <span class="cl-chip chip-critical">Before Departure</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-9" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-9"><strong>Download Niyo Global App & order card</strong> — Zero forex markup for daily Euro spending in Germany. Order before departure so card arrives in time.</label></div>
        <span class="cl-chip chip-important">Before Departure</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-12" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-12"><strong>Demat account (inactive)</strong> — Technically should be converted to NRO Demat once NRI status is confirmed. Not urgent — can be done remotely later.</label></div>
        <span class="cl-chip chip-optional">Low Priority</span>
      </div>

      <!-- 📄 DOCUMENTS & LEGAL -->
      <div class="phase-intro" style="margin-top:18px;"><strong>📄 Documents & Legal</strong></div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-13" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-13"><strong>Power of Attorney (POA) for parents</strong> — Give parents legal authority to sign documents, handle bank transactions, and manage official matters on your behalf while you''re in Germany. Get this notarized before departure.</label></div>
        <span class="cl-chip chip-critical">Before Departure</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-16" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-16"><strong>Verify PAN linked to Aadhaar</strong> — Mandatory for NRI banking transactions. Check at <a href="https://incometax.gov.in" target="_blank">incometax.gov.in</a> before leaving.</label></div>
        <span class="cl-chip chip-critical">Before Departure</span>
      </div>

      <!-- 📱 MOBILE & CONNECTIVITY -->
      <div class="phase-intro" style="margin-top:18px;"><strong>📱 Mobile & Connectivity</strong></div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-8" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-8"><strong>Keep Indian mobile number active</strong> — Linked to all bank OTPs. Do NOT deactivate. Switch to minimum recharge or incoming-only plan (Jio/Airtel NRI plans available).</label></div>
        <span class="cl-chip chip-critical">Before Departure</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-18" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-18"><strong>Activate international roaming</strong> — Enable roaming on your Indian SIM for first 2–3 days after landing until German SIM is set up. Needed for OTPs and family contact on arrival day.</label></div>
        <span class="cl-chip chip-important">Before Departure</span>
      </div>

      <!-- 🎒 PACKING -->
      

      <!-- ❄️ WINTER ESSENTIALS -->
      

      <!-- 🇮🇳 OTHER — BEFORE LEAVING -->
      <div class="phase-intro" style="margin-top:18px;"><strong>🇮🇳 Other — Before Leaving India</strong></div>

      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-10" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-10"><strong>Register on MADAD Portal</strong> — Indian government portal for citizens living abroad. Register before or just after leaving. <a href="https://madad.gov.in" target="_blank">madad.gov.in</a></label></div>
        <span class="cl-chip chip-important">Before/After Departure</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-11" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-11"><strong>Register at Indian Consulate Munich</strong> — After arriving in Germany. Bernheimer Palais, Lenbachplatz 2a, 80333 Munich. <a href="https://www.cgimunich.gov.in" target="_blank">cgimunich.gov.in</a></label></div>
        <span class="cl-chip chip-important">After Arrival</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-5-22" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-5-22"><strong>Inform church leadership</strong> — Hand over Technical Lead responsibilities for media & sound temporarily before departure.</label></div>
        <span class="cl-chip chip-important">Before Departure</span>
      </div>
    </div>
  </details>

  <!-- PHASE 6 -->
  <details class="phase phase-important" id="phase-6">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">🇩🇪</span>
        <span class="phase-sum-title">Phase 6 — First 2 Weeks</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Legally time-critical</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">Germany has hard legal deadlines here — don''t let these slip. Enrollment is already done online — focus shifts to legal registration and getting your student access set up.</div>

      <!-- 🎓 INTRODUCTION DAYS -->
      <div class="phase-intro" style="margin-top:12px;"><strong>🎓 Introduction Days — Oct 1 & 2, 2026</strong></div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-intro-0" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-intro-0"><strong>Download Hof Ersti App</strong> — Stay informed before arrival. <a href="https://ersti-app.hof-university.de/" target="_blank">ersti-app.hof-university.de</a> | Preboarding code: <strong>U5pb5</strong></label></div>
        <span class="cl-chip chip-critical">Do Now</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-intro-1" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-intro-1"><strong>Arrive in Hof by Sep 30</strong> — Introduction Days start Oct 1 at 9:15 AM. Must be settled and ready the night before.</label></div>
        <span class="cl-chip chip-critical">Sep 30</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-intro-2" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-intro-2"><strong>Introduction Day 1 — Thu Oct 1</strong> — Arrival with music & coffee at Hof campus from 9:15 AM. Programme ends late afternoon. Evening closing event at Studierenden Café. One week before you''ll receive your room assignment for Oct 1.</label></div>
        <span class="cl-chip chip-critical">Oct 1</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-intro-3" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-intro-3"><strong>Introduction Day 2 — Fri Oct 2</strong> — 9:30 AM start at your respective study location (M.Eng. Software Engineering building).</label></div>
        <span class="cl-chip chip-critical">Oct 2</span>
      </div>

      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-1" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-1"><strong>Anmeldung</strong> — register your address at the local Bürgeramt/Einwohnermeldeamt within <strong>14 days</strong> of moving in. Almost everything else in Germany depends on this confirmation.</label></div>
        <span class="cl-chip chip-critical">Within 14 days</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-2" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-2"><strong>Activate blocked account monthly release</strong> — contact Expatrio once you have your Anmeldung confirmation to start the €992/month release</label></div>
        <span class="cl-chip chip-critical">Day 1</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-3" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-3">Open/activate German bank account — Expatrio German Bank Account is already set up, activate it on arrival</label></div>
        <span class="cl-chip chip-important">Week 1</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-4" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-4">Get a German SIM card — Aldi Talk, congstar, or otelo are popular, affordable options for students. You''ll need your passport + German address + online video ID verification to register. eSIM works too if your phone supports it, but costs more.</label></div>
        <span class="cl-chip chip-important">Week 1</span>
      </div>

      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-dtkt" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-dtkt"><strong>Get the Deutschlandticket (Student) — €38/month</strong> — Unlimited travel on all local/regional trains, buses, trams and U-Bahn across Germany (not ICE/IC). Your CampusCard already covers Hof city buses. For travel outside Hof, get this ticket. Steps: (1) Download "VGN Fahrplan &amp; Tickets" app → (2) Tap "Order Deutschlandticket" → (3) Select "Hochschule für angewandte Wissenschaften Hof" → (4) Log in with Hof university account (2FA required) → (5) Choose start date (Oct 1 recommended) → (6) Fill in personal info using your German address + Hof email + IBAN → (7) Choose HandyTicket option → Complete "Zahlungspflichtig bestellen". Monthly, cancellable anytime. Student price: <strong>€38</strong> (vs €58 for public).</label></div>
        <span class="cl-chip chip-important">Week 1</span>
      </div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-bus" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-bus"><strong>Know your bus routes to university</strong> — Take bus 1505, 1506, or 1507 in the direction of "Hochschule" — drops you a few steps from campus. Free with your CampusCard. If near Saalepark: stop "Ottostraße" (&lt;100m away), take route 1505. If near Hauptbahnhof: any of the three routes start from there.</label></div>
        <span class="cl-chip chip-optional">Good to know</span>
      </div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-shopping" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-shopping"><strong>Grocery shopping in Hof</strong> — Smaller stores: Lidl, Aldi, Norma, Diska. Larger stores with more variety: Edeka, Kaufland. For bedding (essential — apartments have NO bedclothes on arrival): JYSK (best selection) or Woolworth in the city centre. Remember: <strong>Pfand</strong> — most plastic/glass bottles have a deposit (8–25 cents). Return them at the Pfand machine in any supermarket to get it back.</label></div>
        <span class="cl-chip chip-optional">Good to know</span>
      </div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-offices" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-offices"><strong>Hof University service offices (Room A016)</strong> — All reachable by email using your university email address. International Office: Mon–Wed 1–2 pm · international@hof-university.de. Housing Office: Tue &amp; Thu 1–2 pm · housing@hof-university.de. IT Service: Mon–Thu 1–2 pm (Room A004 or Z206) · it-service@hof-university.de. Erasmus: Wed 1–2 pm &amp; Fri 9–10 am · erasmus@hof-university.de.</label></div>
        <span class="cl-chip chip-optional">Good to know</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-5" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-5"><strong>Download Zugangsdaten (student login credentials)</strong> from PRIMUSS APPLICATION portal once Hof sends them. Then log into PRIMUSS STUDENT portal to download your enrollment certificate.</label></div>
        <span class="cl-chip chip-critical">From Sep 25</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-6" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-6"><strong>Collect CampusCard</strong> in person at Student Affairs Office, Room A111, Hof campus. Available from <strong>Sep 25</strong> — Mon &amp; Thu: 12–3 pm · Tue, Wed &amp; Fri: 9 am–12 pm.</label></div>
        <span class="cl-chip chip-critical">From Sep 25</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-7" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-7"><strong>Fill Hof arrival form</strong> — submit at least 7 days before travelling to Hof. Housing Office needs your arrival date and time to organize your keys. Jennifer (arrival@hof-university.de) will contact you 3 days before arrival.</label></div>
        <span class="cl-chip chip-critical">7 days before</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-8" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-8"><strong>Attend housing after-arrival presentation</strong> — Sep 25 or Oct 6. Required to get your Kitchen Bazaar ticket (free plates, pans, cutlery — returned when leaving). Invitation sent by email. Housing Office: Room A016, Building A.</label></div>
        <span class="cl-chip chip-important">Sep 25 / Oct 6</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-6-9" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-6-9">Read the Hof Moodle post-arrival guide — covers address update in Primuss, course registration, and all first-week admin steps. Available after Zugangsdaten arrives.</label></div>
        <span class="cl-chip chip-optional">Good to have</span>
      </div>
    </div>
  </details>

  <!-- PHASE 7 -->
  <details class="phase phase-optional" id="phase-7">
    <summary>
      <div class="phase-sum-top">
        <span class="phase-sum-icon">💼</span>
        <span class="phase-sum-title">Phase 7 — Work & Post-Study</span>
        <svg class="phase-ring" width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="15" fill="none" stroke="#e0ded6" stroke-width="3"/>
          <circle cx="19" cy="19" r="15" fill="none" stroke="#1D9E75" stroke-width="3"
            stroke-dasharray="94.25" stroke-dashoffset="94.25" stroke-linecap="round"
            transform="rotate(-90 19 19)" class="phase-ring-fill"/>
        </svg>
      </div>
      <div class="phase-sum-expand"><span>Good to know</span><span class="phase-expand-arrow">▾</span></div>
    </summary>
    <div class="phase-body">
      <div class="phase-intro">Not urgent actions — but important to know ahead of time so you can plan your finances and career from day one.</div>

      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-7-1" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-7-1"><strong>Part-time work during studies:</strong> International students can work up to 140 full days (or 280 half days) per year without a work permit. Hof recommends being financially stable for at least the first semester before taking a job.</label></div>
        <span class="cl-chip chip-optional">Good to know</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="visa-7-2" onchange="saveCheck(this)">
        <div class="cl-body"><label class="cl-label" for="visa-7-2"><strong>Post-graduation job search:</strong> After completing your degree, you can extend your residence permit for up to 18 months to find a job in Germany. Once you have an offer, apply for a work visa. No need to return to India first.</label></div>
        <span class="cl-chip chip-optional">Good to know</span>
      </div>
    </div>
  </details>

  </div><!-- /visa-gallery -->
<!-- sync-test -->
', updated_at = NOW() WHERE section_key = 'visa';
