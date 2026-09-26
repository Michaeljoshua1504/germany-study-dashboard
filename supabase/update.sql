UPDATE page_sections SET html_content = '<div class="section-title">🧳 Travel Prep — India to Hof</div>
  <div class="section-sub">Everything to buy or sort before Oct 4 flight (Qatar Airways, Student Club). Each item shows where to get it. Tick items off as you go — saved automatically.</div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🎒 Bags & Backpacks</span>
        <span class="home-card-link" id="travel-progress-bags">1/2</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Cabin bag + personal item for Qatar Airways (7kg combined limit)</div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-bags-niwlix" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-bags-niwlix">Niwlix Crossbody Sling Bag — ₹570 — ordered online (personal item for flight)</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-bags-transitz"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-bags-transitz">Mokobara Transit Z Backpack — ₹6,499 — buy in person, test laptop + iPad fit first</label>
          <div class="cl-source">🏬 Offline — Mokobara store, Phoenix Mall of Asia</div>
        </div>
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
        <div class="cl-body">
          <label class="cl-label" for="travel-packing-pickle">Foreign Pickle Packing Covers — ₹549 — ordered (pack in checked baggage, not cabin)</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-cubes" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-packing-cubes">Oceanevo Packing Cubes (9pc) — ₹798 — ordered</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-shoebags" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-packing-shoebags">Lifelong Shoe Bags (10-pack) — ₹199 — ordered</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-sealer" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-packing-sealer">ENEM Sealing Machine — ₹1,391 — for packing in India only, not carried to Germany</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-packing-lanyard" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-packing-lanyard">BowieMall Phone Lanyard — ₹338 — anti-theft wrist strap, ordered</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
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
        <div class="cl-body">
          <label class="cl-label" for="travel-electronics-ceptics">Ceptics EU Plug Adapter (Type E/F, 2-pack) — ₹604 — ordered. India uses Type D/M, Germany uses Type F</label>
          <div class="cl-source">🛒 Online — Amazon.in (ordered)</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-powerplate" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-electronics-powerplate">Portronics Power Plate — decided AGAINST (build-quality concerns)</label>
          <div class="cl-source">🇩🇪 Buy in Germany — any local supermarket/electronics store</div>
        </div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-laptop"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-electronics-laptop">Laptop &amp; charger — essential for university, carry in cabin bag, never checked baggage</label>
          <div class="cl-source">✅ Already have — just remember cabin-bag placement</div>
        </div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-sim"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-electronics-sim">SIM / eSIM for Germany — not yet decided</label>
          <div class="cl-source">🏬 Offline in Germany — Aldi Talk, congstar, or otelo (needs passport + German address), OR pre-order eSIM online before departure</div>
        </div>
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
        <div class="cl-body">
          <label class="cl-label" for="travel-money-hdfc">HDFC multicurrency forex card — load with Euros</label>
          <div class="cl-source">🏦 Offline — HDFC branch visit</div>
        </div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-money-cash"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-money-cash">Carry Euro cash — €100–200 for arrival day, €300–500 total for first few days</label>
          <div class="cl-source">🏦 Offline — HDFC branch or any authorized forex exchange counter</div>
        </div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-money-coins"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-money-coins">Small coins/notes for airport trains/trams on arrival in Germany</label>
          <div class="cl-source">🇩🇪 Get on arrival — currency exchange counter or ATM at the German airport</div>
        </div>
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
        <div class="cl-body">
          <label class="cl-label" for="travel-documents-photocopies">Document copies — physical + cloud: full set for parents, scan to Google Drive, one set in cabin bag</label>
          <div class="cl-source">🏬 Offline — any local Xerox/print shop; cloud scan can be done at home</div>
        </div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-photos"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-documents-photos">Passport-size photos — 10–15 copies. Print in India — much cheaper than Germany</label>
          <div class="cl-source">🏬 Offline — local photo studio/print shop</div>
        </div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-cabinbag"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-documents-cabinbag">Cabin bag essentials for travel day — passport, visa, admission letter, Expatrio certificate, TK insurance, accommodation booking, emergency contacts</label>
          <div class="cl-source">✅ No purchase — just organize what you already have</div>
        </div>
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
        <div class="section-sub" style="margin-bottom:10px;">Germany requires a prescription for most medicines — carry 1–2 months'' supply</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-paracetamol"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-medicines-paracetamol">Paracetamol (Dolo/Calpol)</label>
          <div class="cl-source">💊 Offline — any local pharmacy/medical store</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-bandaids"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-medicines-bandaids">Band-aids, antiseptic cream</label>
          <div class="cl-source">💊 Offline — any local pharmacy/medical store</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-ors"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-medicines-ors">ORS (oral rehydration) packets</label>
          <div class="cl-source">💊 Offline — any local pharmacy/medical store</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-cold"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-medicines-cold">Cold/cough relief (Vicks, Strepsils-type)</label>
          <div class="cl-source">💊 Offline — any local pharmacy/medical store</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-antacid"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-medicines-antacid">Basic antacid (Digene/Eno)</label>
          <div class="cl-source">💊 Offline — any local pharmacy/medical store</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-medicines-prescription"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-medicines-prescription">Any personal prescription medication — 1-2 months'' supply + the prescription itself</label>
          <div class="cl-source">💊 Offline — your regular pharmacy/doctor</div>
        </div>
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
        <div class="section-sub" style="margin-bottom:10px;">Indian food essentials for the first few weeks</div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-groceries-spices"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-groceries-spices">Spices/masalas (whole and ground) — hard to find in Hof specifically</label>
          <div class="cl-source">🛍️ Offline — any Indian grocery/supermarket</div>
        </div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-groceries-teacoffee"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-groceries-teacoffee">Tea/coffee, if you have a strong preference</label>
          <div class="cl-source">🛍️ Offline — any supermarket</div>
        </div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-groceries-readymade"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-groceries-readymade">A few ready-to-eat / instant food packets (MTR, Haldiram''s) and familiar snacks</label>
          <div class="cl-source">🛍️ Offline — any supermarket</div>
        </div>
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
        <div class="cl-body">
          <label class="cl-label" for="travel-eyewear-specs">Backup pair of spectacles — eyewear is expensive in Germany, process works differently</label>
          <div class="cl-source">🏬 Offline — Lenskart store</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-eyewear-lenssolution"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-eyewear-lenssolution">Contact lens solution, if you use lenses — stock up</label>
          <div class="cl-source">🏬 Offline — Lenskart store or any pharmacy</div>
        </div>
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
        <div class="section-sub" style="margin-bottom:10px;">Covers first 4-6 weeks. 1 good jacket from India is enough — buy more locally if needed.</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-jacket"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-jacket">1 good winter jacket — don''t bring 4-5 from India</label>
          <div class="cl-source">🏬 Offline — Columbia, Ground Floor, Phoenix Mall of Asia — <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Columbia/store/1662584/" target="_blank">map</a>, or Decathlon MT100 (~₹3,000)</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-thermals"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-thermals">Thermal / HEATTECH innerwear — 1-2 sets</label>
          <div class="cl-source">🏬 Offline — Van Heusen Innerwear, Phoenix Mall of Asia — <a href="https://magicpin.in/Bangalore/Phoenix-Mall-Of-Asia/Fashion/Van-Heusen-Innerwear/store/16624b6/" target="_blank">map</a>, or Decathlon base layers</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-sweaters"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-sweaters">High-neck sweaters / fleece / hoodies — worn almost daily Oct-March</label>
          <div class="cl-source">🏬 Offline — Jack &amp; Jones (2nd Floor), Columbia (Ground Floor), or Celio, all at Phoenix Mall of Asia</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-gloveshat"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-gloveshat">Gloves + beanie/cap + scarf</label>
          <div class="cl-source">🏬 Offline — Columbia (Ground Floor) or Accessorize (1st Floor), Phoenix Mall of Asia</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-socks"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-socks">Woollen/warm socks (3-4 pairs)</label>
          <div class="cl-source">🏬 Offline — Adidas Originals (1st Floor) or Columbia (Ground Floor), Phoenix Mall of Asia, or Decathlon</div>
        </div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-umbrella"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-umbrella">Small windproof umbrella / rain protection</label>
          <div class="cl-source">🏬 Offline — Miniso, Ground Floor, Phoenix Mall of Asia, or any supermarket in Hof</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-skincare"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-skincare">Lip balm + moisturiser — cold weather is very drying</label>
          <div class="cl-source">🏬 Offline — Health &amp; Glow (2nd Floor) or L''Occitane (1st Floor), Phoenix Mall of Asia</div>
        </div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-handwarmers"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-handwarmers">Hand/foot warmers</label>
          <div class="cl-source">🇩🇪 Buy in Germany — Decathlon carries these</div>
        </div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-waterbottle"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-winterclothing-waterbottle">Hot-water bottle (Wärmflasche)</label>
          <div class="cl-source">🇩🇪 Buy in Germany — cheaper there, built to German safety standards</div>
        </div>
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
        <div class="section-sub" style="margin-bottom:10px;">Interim pair only — proper heavy winter boots to be bought in Germany once real snow hits.</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-shoes-mh100"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body">
          <label class="cl-label" for="travel-shoes-mh100">Waterproof mid-ankle hiking boots — interim pair for the first weeks</label>
          <div class="cl-source">🏬 Offline — Decathlon (Quechua MH100, ~₹3,500-4,000), or Geox (1st Floor)/Bata Premium (Ground Floor), Phoenix Mall of Asia</div>
        </div>
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
', updated_at = NOW() WHERE section_key = 'travel';