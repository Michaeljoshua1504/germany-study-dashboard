INSERT INTO page_sections (section_key, html_content, updated_at)
VALUES ('travel', '  <div class="section-title">🧳 Travel Prep — India to Hof</div>
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
        <span class="home-card-link" id="travel-progress-electronics">2/3</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Power and connectivity</div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-ceptics" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-electronics-ceptics">Ceptics EU Plug Adapter (Type E/F, 2-pack) — ₹604 — ordered</label></div>
        <span class="cl-chip chip-done">Done</span>
      </div>
      <div class="cl-item cl-done">
        <input type="checkbox" class="cl-check persist-check" id="travel-electronics-powerplate" checked onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-electronics-powerplate">Portronics Power Plate — decided AGAINST (build-quality concerns) — buy a basic extension board locally in Germany instead</label></div>
        <span class="cl-chip chip-done">Done</span>
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
        <span class="home-card-title">💳 Money & Financial</span>
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
        <div class="cl-body"><label class="cl-label" for="travel-money-cash">Carry €300–500 cash for the first few days (card/ATM access can be unreliable initially)</label></div>
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
        <span class="home-card-title">📄 Documents & Photos</span>
        <span class="home-card-link" id="travel-progress-documents">0/3</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Keep in cabin bag — never checked baggage</div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-photocopies"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-documents-photocopies">Photocopies: passport + visa, admission letter, blocked account proof, health insurance</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-photos"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-documents-photos">Extra passport-size photos (needed repeatedly: Anmeldung, bank account, residence permit)</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      <div class="cl-item cl-critical">
        <input type="checkbox" class="cl-check persist-check" id="travel-documents-cabinbag"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-documents-cabinbag">Confirm all originals + one copy set are packed in the cabin bag, not checked luggage</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">💊 Medicines & Pharmacy</span>
        <span class="home-card-link" id="travel-progress-medicines">0/6</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Germany requires a prescription for most medicines — stock up now</div>
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
        <div class="cl-body"><label class="cl-label" for="travel-medicines-prescription">Any personal prescription medication — bring several months'' supply + the prescription itself</label></div>
        <span class="cl-chip chip-critical">Critical</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">🛒 Groceries & Kitchen</span>
        <span class="home-card-link" id="travel-progress-groceries">0/3</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">First-week comfort food</div>
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
        <div class="cl-body"><label class="cl-label" for="travel-groceries-readymade">A few ready-to-eat packets (MTR, Haldiram''s) for the chaotic first week</label></div>
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
        <span class="home-card-title">🧥 Winter Clothing (Decathlon)</span>
        <span class="home-card-link" id="travel-progress-winterclothing">0/4</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Covers first 4-6 weeks — real deep-winter gear waits until you''re in Germany</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-thermals"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-thermals">Thermal base layers — 2 sets</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-jacket"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-jacket">Padded jacket, 0°C rated (Decathlon MT100 line, ~₹3,000)</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-gloveshat"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-gloveshat">Gloves, beanie, scarf</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      <div class="cl-item cl-optional">
        <input type="checkbox" class="cl-check persist-check" id="travel-winterclothing-socks"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-winterclothing-socks">Wool/thermal socks (3-4 pairs)</label></div>
        <span class="cl-chip chip-optional">Optional</span>
      </div>
      </div>
    </div>

    <div class="home-card" style="margin-bottom:16px;">
      <div class="home-card-head">
        <span class="home-card-title">👟 Shoes (Decathlon)</span>
        <span class="home-card-link" id="travel-progress-shoes">0/1</span>
      </div>
      <div style="padding:12px 16px;">
        <div class="section-sub" style="margin-bottom:10px;">Interim pair only — proper winter boots to be bought in Germany once real snow hits</div>
      <div class="cl-item cl-important">
        <input type="checkbox" class="cl-check persist-check" id="travel-shoes-mh100"  onchange="saveCheck(this); updateTravelProgress()">
        <div class="cl-body"><label class="cl-label" for="travel-shoes-mh100">Quechua MH100 Mid-Ankle Waterproof Hiking Boots — ~₹3,500-4,000</label></div>
        <span class="cl-chip chip-important">Important</span>
      </div>
      </div>
    </div>
<script>
function updateTravelProgress() {
  document.querySelectorAll(''[id^="travel-progress-"]'').forEach(function(pill) {
    var catKey = pill.id.replace(''travel-progress-'', '''');
    var card = pill.closest(''.home-card'');
    if (!card) return;
    var boxes = card.querySelectorAll(''input.cl-check'');
    var total = boxes.length;
    var checked = Array.from(boxes).filter(function(b){ return b.checked; }).length;
    pill.textContent = checked + ''/'' + total;
  });
}
document.addEventListener(''DOMContentLoaded'', function(){ setTimeout(updateTravelProgress, 300); });
</script>
', NOW())
ON CONFLICT (section_key) DO UPDATE SET html_content = EXCLUDED.html_content, updated_at = NOW();