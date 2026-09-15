// ═══════════════ 10. GERMAN A1 CURRICULUM (7 Sep – 7 Oct 2026) ═══════════════

let germanProgress = {}; // { [day]: { completed: bool, note_text: string } }

const GERMAN_WEEKS = [
  { num: 1, title: 'Phase 1 — Foundations', range: 'Days 1–7', dates: 'Sep 7–13' },
  { num: 2, title: 'Phase 2 — Your World', range: 'Days 8–14', dates: 'Sep 14–20' },
  { num: 3, title: 'Phase 3 — Out in the World', range: 'Days 15–21', dates: 'Sep 21–27' },
  { num: 4, title: 'Phase 4 — Getting Things Done', range: 'Days 22–31', dates: 'Sep 28–Oct 7' }
];

const GERMAN_DAYS = {
  1: { week:1, date:'7 Sep', topic:'Pronunciation & The German Alphabet', grammar:'German has 4 extra letters: ä, ö, ü (umlauts) and ß (eszett, sounds like "ss"). Every letter is pronounced — there are no silent letters like in English.',
    vocab:[['A, Ä','ah, eh','ah / air-ish'],['O, Ö','oh, ooh-eh','oh / "ur" sound'],['U, Ü','oo, ueh','oo / "ew" sound'],['ß (Eszett)','sharp s','ss'],['W','v sound','vee'],['V','f sound','fow'],['Z','ts sound','tset'],['J','y sound','yot']],
    practice:'Practice saying your name letter by letter in German pronunciation. Say "schön" (beautiful) and "schon" (already) — notice the ö difference.' },
  2: { week:1, date:'8 Sep', topic:'Greetings, Politeness & Introducing Yourself', grammar:'Personal pronoun "ich" (I) + verb "sein" (to be): ich bin = I am. German sentences are Subject + Verb, just like English at this stage. This day also introduces du vs Sie — the informal and formal ways to say "you".',
    vocab:[['Hallo','Hello','HAH-loh'],['Guten Morgen','Good morning','GOO-ten MOR-gen'],['Guten Tag','Good day / Hello','GOO-ten TAHK'],['Guten Abend','Good evening','GOO-ten AH-bent'],['Tschüss','Bye (informal)','chooss'],['Auf Wiedersehen','Goodbye (formal)','owf VEE-der-zayn'],['Ich bin...','I am...','ikh bin'],['Wie heißt du?','What is your name? (informal)','vee HYSST doo']],
    practice:'Write 2 sentences: greet someone, then introduce yourself. Example: "Guten Tag! Ich bin Michael."' },
  3: { week:1, date:'9 Sep', topic:'Numbers 0–20', grammar:'Numbers 13–19 are built by adding "-zehn" to the base number (drei+zehn = dreizehn = 13). This pattern repeats at every ten, so learning the base numbers unlocks the whole system.',
    vocab:[['null, eins, zwei','0, 1, 2','nool, eyenss, tsvy'],['drei, vier, fünf','3, 4, 5','dry, feer, fewnf'],['sechs, sieben, acht','6, 7, 8','zex, ZEE-ben, ahkt'],['neun, zehn','9, 10','noyn, tsayn'],['elf, zwölf','11, 12','elf, tsverlf'],['zwanzig','20','TSVAHN-tsikh']],
    practice:'Count from 0 to 20 out loud. Then write down your phone number in German digits.' },
  4: { week:1, date:'10 Sep', topic:'Nationality & Where You\'re From', grammar:'"Ich komme aus..." = I come from... Use "aus" (from) + country name. Most country names don\'t need "der/die/das" (the) in front — just say "aus Indien", "aus Deutschland".',
    vocab:[['Ich komme aus...','I come from...','ikh KOM-meh ows'],['Indien','India','IN-dee-en'],['Deutschland','Germany','DOYTCH-lahnt'],['Woher kommst du?','Where are you from?','vo-HAIR komst doo'],['Ich bin Inder.','I am Indian (male).','ikh bin IN-der'],['die Stadt','the city','dee shtaht'],['das Land','the country','dahss lahnt']],
    practice:'Write: "Ich komme aus Indien. Ich bin aus Bangalore." (I come from India. I am from Bangalore.)' },
  5: { week:1, date:'11 Sep', topic:'The Verb "sein" (to be) — Full Conjugation', grammar:'"Sein" is irregular and used constantly. ich bin / du bist / er-sie-es ist / wir sind / ihr seid / sie-Sie sind. Memorize this table — it\'s the single most useful verb in German.',
    vocab:[['ich bin','I am','ikh bin'],['du bist','you are (informal)','doo bisst'],['er/sie/es ist','he/she/it is','air/zee/ess isst'],['wir sind','we are','veer zint'],['ihr seid','you all are','eer zyte'],['sie/Sie sind','they/You(formal) are','zee zint']],
    practice:'Fill in: "___ bin müde" (I am tired), "Du ___ nett" (You are nice), "Wir ___ Studenten" (We are students).' },
  6: { week:1, date:'12 Sep', topic:'Basic Sentence Structure & First W-Questions', grammar:'German statements follow Subject-Verb-Object (S-V-O), same as English: "Ich bin Michael." (I am Michael.) For yes/no questions, the verb simply moves to the very front: "Bist du müde?" (Are you tired?). For W-questions, the question word comes first, then the verb: "Wie heißt du?" (What is your name?) — was (what), wer (who), wo (where) are your first three.',
    vocab:[['Was?','What?','vahss'],['Wer?','Who?','vair'],['Wo?','Where?','voh'],['Bist du...?','Are you...?','bisst doo'],['Kommst du...?','Are you coming...?','komst doo'],['Danke','Thank you','DAHN-keh'],['Bitte','Please / You\'re welcome','BIT-teh']],
    practice:'Turn 3 statements into yes/no questions by moving the verb to the front: "Du bist müde." → "Bist du müde?" Then write one W-question using "wo": "Wo wohnst du?" (Where do you live?)' },
  7: { week:1, date:'13 Sep', topic:'Phase 1 Review + Voice Test', grammar:'Review: sein conjugation, the alphabet & pronunciation, numbers 0–20, greetings & du/Sie, nationality, sentence structure & W-questions. No new grammar today — consolidate everything from Phase 1, then a live voice check covering all of it.',
    vocab:[['Wiederholung','Review','vee-der-HOH-loong'],['die Woche','the week','dee VOH-kheh'],['das Wort','the word','dahss vort'],['der Satz','the sentence','dair zahts'],['üben','to practice','EW-ben']],
    practice:'Self-test: introduce yourself fully out loud — name, nationality, city — using only what you learned this week. No notes allowed.' },

  8: { week:2, date:'14 Sep', topic:'Family Members', grammar:'German nouns have gender: der (masculine), die (feminine), das (neuter). Family words follow biological gender mostly: der Vater (father), die Mutter (mother). Memorize the article WITH the noun, not separately.',
    vocab:[['die Familie','the family','dee fah-MEE-lee-eh'],['der Vater','the father','dair FAH-ter'],['die Mutter','the mother','dee MOOT-ter'],['der Bruder','the brother','dair BROO-der'],['die Schwester','the sister','dee SHVESS-ter'],['die Eltern','the parents','dee EL-tern'],['das Kind','the child','dahss kint']],
    practice:'Write 3 sentences about your own family using "Mein Vater ist..." / "Meine Mutter ist..." (My father is.../My mother is...).' },
  9: { week:2, date:'15 Sep', topic:'The Verb "haben" (to have)', grammar:'"Haben" is the second essential irregular verb. ich habe / du hast / er-sie-es hat / wir haben / ihr habt / sie-Sie haben. Used for possession and many fixed expressions (e.g. "Ich habe Hunger" = I am hungry, literally "I have hunger").',
    vocab:[['ich habe','I have','ikh HAH-beh'],['du hast','you have','doo hahst'],['er/sie hat','he/she has','air/zee haht'],['wir haben','we have','veer HAH-ben'],['Ich habe Hunger.','I am hungry.','ikh HAH-beh HOON-ger'],['Ich habe Durst.','I am thirsty.','ikh HAH-beh doorst']],
    practice:'Translate: "I have a brother and a sister." → "Ich habe einen Bruder und eine Schwester."' },
  10: { week:2, date:'16 Sep', topic:'Daily Routine — Part 1 (Morning)', grammar:'Separable verbs: some German verbs split, with the prefix moving to the end. "aufstehen" (to get up) → "Ich stehe um 7 Uhr auf." (I get up at 7 o\'clock.) This feels strange at first but becomes natural with practice.',
    vocab:[['aufstehen','to get up','OWF-shtay-en'],['frühstücken','to have breakfast','FREW-shtew-ken'],['sich duschen','to shower','zikh DOO-shen'],['die Uhr','the clock/o\'clock','dee oor'],['um... Uhr','at... o\'clock','oom oor'],['jeden Tag','every day','YAY-den tahk']],
    practice:'Write your real morning routine in German using "Ich stehe um ___ Uhr auf. Ich frühstücke um ___ Uhr."' },
  11: { week:2, date:'17 Sep', topic:'Daily Routine — Part 2 (Work & Evening)', grammar:'Time expressions use "um" for clock time (um 9 Uhr) and "am" for days (am Montag). Word order: time expressions usually come right after the verb in a simple sentence.',
    vocab:[['arbeiten','to work','AR-by-ten'],['die Arbeit','the work/job','dee AR-byte'],['nach Hause gehen','to go home','nahkh HOW-zeh GAY-en'],['schlafen','to sleep','SHLAH-fen'],['der Abend','the evening','dair AH-bent'],['die Nacht','the night','dee nahkht']],
    practice:'Write 3 sentences about your work day using "Ich arbeite...", and one about going to sleep "Ich schlafe um... Uhr."' },
  12: { week:2, date:'18 Sep', topic:'Days of the Week & "am"', grammar:'Days of the week are always capitalized and masculine (der Montag). To say "on Monday" use "am Montag" (am = an + dem, a contraction you\'ll see often in German).',
    vocab:[['Montag','Monday','MOHN-tahk'],['Dienstag','Tuesday','DEENS-tahk'],['Mittwoch','Wednesday','MIT-vokh'],['Donnerstag','Thursday','DON-ners-tahk'],['Freitag','Friday','FRY-tahk'],['Samstag/Sonnabend','Saturday','ZAHMS-tahk'],['Sonntag','Sunday','ZON-tahk']],
    practice:'Write what you do on 3 different days: "Am Montag arbeite ich. Am Samstag schlafe ich lange."' },
  13: { week:2, date:'19 Sep', topic:'Possessive Pronouns (mein, dein, sein)', grammar:'"Mein" (my) changes ending based on the noun\'s gender: mein Vater (my father - masc.), meine Mutter (my mother - fem.), mein Kind (my child - neuter). This is your first taste of German adjective endings.',
    vocab:[['mein/meine','my (masc/fem)','mine / MY-neh'],['dein/deine','your (masc/fem)','dine / DY-neh'],['sein/seine','his (masc/fem)','zine / ZY-neh'],['ihr/ihre','her (masc/fem)','eer / EE-reh'],['unser/unsere','our (masc/fem)','OON-zer / OON-zeh-reh']],
    practice:'Translate: "My father, your mother, his sister, our family" → "Mein Vater, deine Mutter, seine Schwester, unsere Familie."' },
  14: { week:2, date:'20 Sep', topic:'Phase 2 Review + Voice Test', grammar:'Review: haben conjugation, separable verbs (aufstehen), days of the week, possessive pronouns. Try building longer sentences combining time + routine + family.',
    vocab:[['das Leben','the life','dahss LAY-ben'],['der Alltag','the everyday routine','dair AHL-tahk'],['zusammen','together','tsoo-ZAH-men'],['wissen','to know (a fact)','VISS-en'],['verstehen','to understand','fair-SHTAY-en']],
    practice:'Write a 5-sentence paragraph about a typical day: wake-up time, breakfast, work, family, sleep — all in German.' },

  15: { week:3, date:'21 Sep', topic:'Food & Drink Vocabulary', grammar:'Food nouns also carry gender: der Apfel (the apple - masc.), die Banane (the banana - fem.), das Brot (the bread - neuter). There\'s no shortcut — gender must be memorized per word, so always learn the article together with the noun.',
    vocab:[['das Brot','the bread','dahss broht'],['der Käse','the cheese','dair KAY-zeh'],['die Milch','the milk','dee milkh'],['das Wasser','the water','dahss VAH-ser'],['der Kaffee','the coffee','dair KAH-feh'],['der Apfel','the apple','dair AHP-fel'],['das Gemüse','the vegetables','dahss geh-MEW-zeh'],['das Fleisch','the meat','dahss flysh']],
    practice:'Write a shopping list of 5 foods using "Ich brauche..." (I need...): "Ich brauche Brot, Käse, Milch..."' },
  16: { week:3, date:'22 Sep', topic:'The Accusative Case (Akkusativ) — Intro', grammar:'German has cases that change articles based on a noun\'s role in the sentence. The Accusative is used for direct objects. Only the masculine "der" changes → "den": "Ich sehe den Mann" (I see the man). Feminine/neuter/plural stay the same as Nominativ.',
    vocab:[['den (masc. Akk.)','the (masc. object)','dayn'],['Ich sehe...','I see...','ikh ZAY-eh'],['Ich kaufe...','I buy...','ikh KOW-feh'],['Ich möchte...','I would like...','ikh MERKH-teh'],['einen (masc. Akk.)','a (masc. object)','EYE-nen']],
    practice:'Translate: "I buy a bread (der Brot... wait, das Brot)." Correct version: "Ich kaufe das Brot." Now try: "I see the man." → "Ich sehe den Mann."' },
  17: { week:3, date:'23 Sep', topic:'At the Supermarket — Shopping Phrases', grammar:'"Möchten" (would like) is a polite modal verb, more polite than "wollen" (want). "Ich möchte..." + noun is the standard polite way to ask for something in shops, cafes, restaurants.',
    vocab:[['Ich möchte...','I would like...','ikh MERKH-teh'],['Was kostet das?','How much does that cost?','vahss KOSS-tet dahss'],['Das macht... Euro.','That comes to... euros.','dahss mahkt OY-roh'],['der Supermarkt','the supermarket','dair ZOO-per-markt'],['die Kasse','the checkout','dee KAH-seh'],['bar bezahlen','to pay cash','bar beh-TSAH-len']],
    practice:'Write a 4-line shop dialogue: ask for an item politely, ask the price, respond, say thank you and goodbye.' },
  18: { week:3, date:'24 Sep', topic:'Asking & Giving Directions', grammar:'"Wo ist...?" (Where is...?) is the key question. Direction words like "links" (left), "rechts" (right), "geradeaus" (straight ahead) come at the end of simple instruction sentences.',
    vocab:[['Wo ist...?','Where is...?','voh isst'],['links','left','links'],['rechts','right','rekhts'],['geradeaus','straight ahead','geh-RAH-deh-ows'],['die Straße','the street','dee SHTRAH-seh'],['die Ecke','the corner','dee EK-keh'],['in der Nähe','nearby','in dair NAY-eh']],
    practice:'Write directions from your home to a nearby shop using "Gehen Sie geradeaus... dann links..." (Go straight... then left...).' },
  19: { week:3, date:'25 Sep', topic:'Prepositions of Place (in, auf, neben, unter)', grammar:'Common place prepositions: in (in), auf (on), neben (next to), unter (under), vor (in front of), hinter (behind). These take Dativ case when describing a fixed position — for now, just learn the meanings; the case rules come later in A2.',
    vocab:[['in','in','in'],['auf','on','owf'],['neben','next to','NAY-ben'],['unter','under','OON-ter'],['vor','in front of','for'],['hinter','behind','HIN-ter'],['zwischen','between','TSVISH-en']],
    practice:'Describe where 3 objects are in your room using these prepositions: "Das Buch ist auf dem Tisch." (The book is on the table.)' },
  20: { week:3, date:'26 Sep', topic:'Adjectives — Describing Things', grammar:'Basic adjectives come before the noun (groß = big → "ein großes Haus") or after "sein" with no ending change (das Haus ist groß = the house is big). After "sein", adjectives never change — much simpler than adjectives before nouns.',
    vocab:[['groß','big','grohss'],['klein','small','kline'],['gut','good','goot'],['schlecht','bad','shlekht'],['schön','beautiful','shern'],['neu','new','noy'],['alt','old','ahlt'],['teuer','expensive','TOY-er'],['billig','cheap','BIL-likh']],
    practice:'Describe 4 things using "ist" + adjective: "Mein Haus ist groß. Mein Auto ist alt." etc.' },
  21: { week:3, date:'27 Sep', topic:'Phase 3 Review + Voice Test', grammar:'Review: food vocab, Akkusativ basics (den/einen), shopping phrases, directions, prepositions of place, simple adjectives. This phase introduced your first grammatical case — re-read Day 16 if "den" vs "der" still feels unclear.',
    vocab:[['einkaufen','to go shopping','EYEN-kow-fen'],['der Weg','the way/path','dair vayk'],['die Richtung','the direction','dee RIKH-toong'],['beschreiben','to describe','beh-SHRY-ben']],
    practice:'Write a short story (5–6 sentences): you go to the supermarket, buy 3 food items, ask for directions to the checkout, and describe one item using an adjective.' },

  22: { week:4, date:'28 Sep', topic:'Transport & Getting Around', grammar:'"Mit dem/der" (by/with the) is used for transport: mit dem Bus (by bus), mit der Bahn (by train). "Dem" is the Dativ form of masculine/neuter "der/das" — another small case shift to recognize, not yet to fully master.',
    vocab:[['der Bus','the bus','dair booss'],['die Bahn / der Zug','the train','dee bahn / dair tsook'],['das Auto','the car','dahss OW-toh'],['das Fahrrad','the bicycle','dahss FAHR-raht'],['mit dem Bus','by bus','mit daym booss'],['der Bahnhof','the train station','dair BAHN-hohf'],['die Haltestelle','the (bus) stop','dee HAHL-teh-shtel-leh']],
    practice:'Write how you usually travel: "Ich fahre mit dem Bus zur Arbeit." (I travel by bus to work.) Try 2 more transport sentences.' },
  23: { week:4, date:'29 Sep', topic:'Booking & Travel Phrases', grammar:'"Ich möchte einen/eine/ein... buchen" = I would like to book a... Remember the Akkusativ pattern from Day 16: einen (masc.), eine (fem.), ein (neuter) — the gender of the noun decides the ending.',
    vocab:[['die Fahrkarte','the ticket','dee FAHR-kar-teh'],['buchen','to book','BOO-khen'],['der Flug','the flight','dair flook'],['die Ankunft','the arrival','dee AHN-koonft'],['die Abfahrt','the departure','dee AHP-fahrt'],['Hin und zurück','Round trip','hin oont tsoo-REWK'],['Einfach','One-way','EYEN-fahkh']],
    practice:'Write a short dialogue booking a train ticket: state destination, ask one-way or return, ask the price.' },
  24: { week:4, date:'30 Sep', topic:'Health & Body Parts', grammar:'"Mir tut... weh" = my... hurts (literally "to me hurts the..."). This is a Dativ construction — "mir" (to me) + body part + "tut weh". Very common phrase pattern worth memorizing as a fixed chunk.',
    vocab:[['der Kopf','the head','dair kopf'],['der Bauch','the stomach','dair bowkh'],['der Arm','the arm','dair arm'],['das Bein','the leg','dahss byne'],['Mir tut der Kopf weh.','My head hurts.','meer toot dair kopf vay'],['krank','sick','krahnk'],['der Arzt / die Ärztin','the doctor (m/f)','dair artst / dee ERTST-in']],
    practice:'Write 3 sentences: say you are sick, say what hurts using "Mir tut... weh", say you need a doctor.' },
  25: { week:4, date:'1 Oct', topic:'Weather & Seasons', grammar:'Weather sentences use the impersonal "es" (it): "Es regnet" (It is raining), "Es ist kalt" (It is cold). "Es" here doesn\'t refer to a specific object — it\'s a grammatical placeholder, same idea as English "it" in "it is raining".',
    vocab:[['das Wetter','the weather','dahss VET-ter'],['Es regnet.','It is raining.','ess RAYG-net'],['Es schneit.','It is snowing.','ess shnyte'],['Es ist kalt.','It is cold.','ess isst kahlt'],['Es ist warm.','It is warm.','ess isst varm'],['die Sonne','the sun','dee ZON-neh'],['der Winter / der Sommer','winter / summer','VIN-ter / ZOM-mer']],
    practice:'Describe today\'s actual weather in German, then write one sentence each for your favorite season and why.' },
  26: { week:4, date:'2 Oct', topic:'Modal Verbs — können & müssen', grammar:'Modal verbs (können = can, müssen = must) push the main verb to the end of the sentence in infinitive form: "Ich kann Deutsch sprechen" (I can speak German) — kann is conjugated, sprechen stays infinitive at the end.',
    vocab:[['ich kann','I can','ikh kahn'],['du kannst','you can','doo kahnst'],['ich muss','I must','ikh mooss'],['du musst','you must','doo moosst'],['können','can / to be able to','KER-nen'],['müssen','must / to have to','MEW-ssen']],
    practice:'Translate: "I can speak German" and "I must work tomorrow" → "Ich kann Deutsch sprechen." / "Ich muss morgen arbeiten."' },
  27: { week:4, date:'3 Oct', topic:'Asking Questions — W-Fragen', grammar:'German question words (W-Fragen) all start with W: was (what), wer (who), wo (where), wann (when), warum (why), wie (how). The verb comes immediately after the question word — second position, just like in normal statements.',
    vocab:[['Was?','What?','vahss'],['Wer?','Who?','vair'],['Wo?','Where?','voh'],['Wann?','When?','vahn'],['Warum?','Why?','vah-ROOM'],['Wie?','How?','vee'],['Wie viel?','How much?','vee feel']],
    practice:'Write 6 questions, one for each W-word, about your own life: "Wo wohnst du?" "Wann arbeitest du?" etc.' },
  28: { week:4, date:'4 Oct', topic:'Cumulative Review — Sentences & Connectors', grammar:'"Und" (and), "aber" (but), "oder" (or), "weil" (because) connect ideas. "Weil" is special — it pushes the verb to the very end of its clause: "Ich lerne Deutsch, weil ich nach Deutschland gehe." (I learn German because I go to Germany.)',
    vocab:[['und','and','oont'],['aber','but','AH-ber'],['oder','or','OH-der'],['weil','because','vyle'],['denn','because (no word-order change)','den'],['auch','also','owkh']],
    practice:'Write 3 sentences using und/aber/weil to connect ideas about your German learning goal and your move to Germany.' },
  29: { week:4, date:'5 Oct', topic:'Mock Listening & Reading Practice', grammar:'No new grammar — today is active practice. Read your Day 1–28 notes out loud, then try following a short German audio (a children\'s story, slow-German podcast, or Goethe-Institut A1 sample audio) and pick out words you recognize.',
    vocab:[['hören','to listen','HER-ren'],['lesen','to read','LAY-zen'],['das Beispiel','the example','dahss buy-SHPEEL'],['die Übung','the exercise','dee EW-boong'],['die Prüfung','the exam','dee PREW-foong']],
    practice:'Find one short German audio or video clip (2–3 min) online and write down 5 words you recognized from this month\'s vocabulary.' },
  30: { week:4, date:'6 Oct', topic:'Mock Speaking & Writing Practice', grammar:'No new grammar — simulate the Goethe A1 exam\'s speaking and writing sections. Speaking: introduce yourself fully (name, origin, profession, family). Writing: fill out a simple form and write a short personal message.',
    vocab:[['der Beruf','the profession','dair beh-ROOF'],['der Wohnort','the place of residence','dair VOHN-ort'],['das Formular','the form','dahss for-moo-LAR'],['unterschreiben','to sign','OON-ter-shry-ben']],
    practice:'Record yourself (voice memo) speaking for 1 minute introducing yourself fully. Then write a 5-sentence message to a friend about your German learning month.' },
  31: { week:4, date:'7 Oct', topic:'Final Review — A1 Checkpoint', grammar:'Full month review: sein & haben conjugations, Akkusativ basics (den/einen), modal verbs (können/müssen), W-questions, connectors (und/aber/weil). If any of these still feel shaky, that\'s your focus list for the first week in A2.',
    vocab:[['geschafft!','done it! / made it!','geh-SHAHFT'],['der Erfolg','the success','dair air-FOLK'],['weitermachen','to keep going','VY-ter-mah-khen'],['die nächste Stufe','the next level (A2)','dee NEKH-steh SHTOO-feh']],
    practice:'Write one full paragraph (8–10 sentences) about yourself in German — name, origin, family, daily routine, what you can do, and why you\'re learning German. This is your A1 checkpoint — compare it to Day 1 and see how far you\'ve come.' }
};

function germanDayNum() {
  const today = new Date();
  const start = new Date('2026-09-07T00:00:00');
  const end = new Date('2026-10-07T23:59:59');
  if (today < start) return 0;
  if (today > end) return 31;
  return Math.floor((today - start) / 86400000) + 1;
}

function germanWordCount() {
  let total = 0;
  Object.keys(GERMAN_DAYS).forEach(d => {
    if (germanProgress[d] && germanProgress[d].completed) total += GERMAN_DAYS[d].vocab.length;
  });
  return total;
}

function germanCompletedCount() {
  return Object.keys(GERMAN_DAYS).filter(d => germanProgress[d] && germanProgress[d].completed).length;
}

function updateGermanStats() {
  const dayNum = germanDayNum();
  const completed = germanCompletedCount();
  const words = germanWordCount();
  const pct = Math.round((completed / 31) * 100);

  const dayLabel = dayNum === 0 ? 'Not started' : dayNum > 31 ? 'Complete!' : `Day ${dayNum}`;
  ['ger-stat-day','ger-stat-day-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = dayLabel; });
  ['ger-stat-completed','ger-stat-completed-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = completed + '/31'; });
  ['ger-stat-words','ger-stat-words-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = words; });
  ['ger-stat-pct','ger-stat-pct-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = pct + '%'; });

  const fill = document.getElementById('ger-progress-fill');
  const pctEl = document.getElementById('ger-progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

function toggleGermanDay(day) {
  const current = germanProgress[day]?.completed || false;
  germanProgress[day] = { ...(germanProgress[day] || {}), completed: !current };
  if (sbClient) {
    sbClient.from('german_progress').upsert({
      day_num: day,
      completed: !current,
      note_text: germanProgress[day].note_text || '',
      teaching_notes: germanProgress[day].teaching_notes || ''
    }).then(({error}) => {
      if (error) console.error('Failed to save German progress:', error.message);
    });
  }
  renderGermanWeeks();
  updateGermanStats();
}

function saveGermanTeachingNotes(day, text) {
  germanProgress[day] = { ...(germanProgress[day] || {}), teaching_notes: text };
  if (sbClient) {
    sbClient.from('german_progress').upsert({
      day_num: day,
      completed: germanProgress[day].completed || false,
      note_text: germanProgress[day].note_text || '',
      teaching_notes: text
    }).then(({error}) => {
      if (error) console.error('Failed to save German teaching notes:', error.message);
      else { renderGermanWeeks(); }
    });
  } else {
    renderGermanWeeks();
  }
}

function renderGermanWeeks() {
  const container = document.getElementById('german-weeks');
  if (!container) return;
  const todayNum = germanDayNum();

  container.innerHTML = GERMAN_WEEKS.map(week => {
    const dayKeys = Object.keys(GERMAN_DAYS).filter(d => GERMAN_DAYS[d].week === week.num).map(Number).sort((a,b)=>a-b);
    const daysHtml = dayKeys.map(d => {
      const lesson = GERMAN_DAYS[d];
      const isDone = germanProgress[d]?.completed || false;
      const isToday = d === todayNum;
      const teachingNotes = germanProgress[d]?.teaching_notes || '';
      const wasTaught = teachingNotes.trim().length > 0;
      const vocabRows = lesson.vocab.map(([de, en, pron]) => `
        <div class="vocab-row"><span class="vocab-de">${de}</span><span class="vocab-en">${en}</span><span class="vocab-pron">${pron}</span></div>
      `).join('');

      return `
      <div class="ger-day-card ${isDone ? 'done' : ''} ${isToday ? 'today' : ''}">
        <div class="ger-day-header" onclick="toggleGermanDayOpen(${d})">
          <div class="ger-day-num">Day ${d}</div>
          <div class="ger-day-topic">
            <div class="ger-day-title">${lesson.topic}</div>
            <div class="ger-day-date">${lesson.date}${isToday ? ' · Today' : ''}${wasTaught ? ' · <span class="ger-taught-badge">📋 Taught</span>' : ''}</div>
          </div>
          <input type="checkbox" class="ger-day-check" ${isDone ? 'checked' : ''} onclick="event.stopPropagation();toggleGermanDay(${d})">
        </div>
        <div class="ger-day-body" id="ger-day-body-${d}" style="display:none;">
          <div class="ger-day-section-label">📖 Grammar Point (Lesson Plan)</div>
          <div class="ger-grammar-text">${lesson.grammar}</div>
          <div class="ger-day-section-label">🗂️ Vocabulary</div>
          <div class="vocab-table">${vocabRows}</div>
          <div class="ger-day-section-label">✍️ Practice</div>
          <div class="ger-practice-text">${lesson.practice}</div>

          <div class="ger-day-section-label">📋 Full Teaching Notes — What We Actually Covered</div>
          <div class="ger-teaching-notes" id="ger-teaching-notes-${d}">${wasTaught ? formatTeachingNotes(teachingNotes) : '<span class="ger-notes-placeholder">Not taught yet. Once this lesson is taught live, the full session writeup will appear here.</span>'}</div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="ger-week-block">
      <div class="ger-week-title">${week.title} <span class="ger-week-range">${week.range} · ${week.dates}</span></div>
      <div class="ger-days-list">${daysHtml}</div>
    </div>`;
  }).join('');
}

function formatTeachingNotes(text) {
  // Lightweight markdown-ish rendering: **bold**, line breaks, and simple "### " headers
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .split('\n')
    .map(line => {
      if (line.startsWith('### ')) return `<div class="ger-notes-heading">${line.slice(4)}</div>`;
      if (line.trim() === '') return '<br>';
      return `<p>${line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
    })
    .join('');
}

function toggleGermanDayOpen(day) {
  const body = document.getElementById('ger-day-body-' + day);
  if (!body) return;
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function renderGermanNotesGrid() {
  const grid = document.getElementById('german-notes-grid');
  if (!grid) return;
  const dayKeys = Object.keys(GERMAN_DAYS).map(Number).sort((a,b)=>a-b);

  grid.innerHTML = dayKeys.map(d => {
    const lesson = GERMAN_DAYS[d];
    const noteVal = germanProgress[d]?.note_text || '';
    const isDone = germanProgress[d]?.completed || false;
    return `
    <div class="ger-note-card ${isDone ? 'done' : ''}">
      <div class="ger-note-header">
        <span class="ger-note-day">Day ${d}</span>
        <span class="ger-note-topic">${lesson.topic}</span>
        ${isDone ? '<span class="dash-pill green">✓ Done</span>' : ''}
      </div>
      <textarea class="ger-note-textarea" id="ger-note-${d}" placeholder="What did you find hard? Write your own example sentences, doubts, anything..." oninput="saveGermanNote(${d}, this.value)">${noteVal}</textarea>
      <div class="note-saved-indicator" id="ger-note-saved-${d}">✓ Saved</div>
    </div>`;
  }).join('');
}

let germanNoteTimeout;
function saveGermanNote(day, value) {
  germanProgress[day] = { ...(germanProgress[day] || {}), note_text: value };
  const indicator = document.getElementById('ger-note-saved-' + day);
  if (indicator) {
    indicator.classList.add('show');
    clearTimeout(indicator._t);
    indicator._t = setTimeout(() => indicator.classList.remove('show'), 1500);
  }
  clearTimeout(germanNoteTimeout);
  germanNoteTimeout = setTimeout(() => {
    if (sbClient) {
      sbClient.from('german_progress').upsert({
        day_num: day,
        completed: germanProgress[day].completed || false,
        note_text: value,
        teaching_notes: germanProgress[day].teaching_notes || ''
      }).then(({error}) => {
        if (error) console.error('Failed to save German note:', error.message);
      });
    }
  }, 1000);
}

function renderGermanTab() {
  renderGermanWeeks();
  renderGermanNotesGrid();
  updateGermanStats();
  renderDuolingoLog();
}

