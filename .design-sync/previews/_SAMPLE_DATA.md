# Sample data for DuoVino preview cards (realistic WSET content)

Use this real wine content in previews. Import components from `"@duovino/design-system"`.
NEVER use foo/bar/test. Each preview file = `.design-sync/previews/<Name>.tsx`; each **named
export** is one card cell. Read the component's source in `design-system/src/<group>/<Name>.tsx`
for exact prop names/types before authoring.

## Climate scores (0–5: warmth, sun, rain, diurnal, risk)
- Rioja: { warmth:4, sun:4, rain:2, diurnal:3, risk:2 }
- Ribera del Duero: { warmth:3, sun:4, rain:2, diurnal:5, risk:3 }
- Mosel: { warmth:2, sun:2, rain:3, diurnal:3, risk:4 }
- Barossa Valley: { warmth:5, sun:5, rain:1, diurnal:2, risk:1 }
- Adelaide Hills: { warmth:2, sun:4, rain:3, diurnal:4, risk:2 }
- Brunello di Montalcino: { warmth:4, sun:4, rain:2, diurnal:3, risk:2 }

## Region grape blends (name, color 'w'|'r', pct)
- Rioja: [{name:'Tempranillo',color:'r',pct:88},{name:'Garnacha',color:'r',pct:8},{name:'Graciano',color:'r',pct:2},{name:'Viura',color:'w',pct:2}]
- Adelaide Hills: [{name:'Sauvignon Blanc',color:'w',pct:32},{name:'Chardonnay',color:'w',pct:28},{name:'Pinot Noir',color:'r',pct:24},{name:'Shiraz',color:'r',pct:16}]
- Brunello: [{name:'Sangiovese',color:'r',pct:100}]

## Region style composition (percent: red/white/rose/sparkling/sweet)
- Rioja: { red:85, white:8, rose:7 }
- Adelaide Hills: { white:60, red:40 }
- Brunello: { red:100 }
- Mosel: { white:92, sparkling:8 }

## Grapes (full shape — see GrapeCard / grape rows)
- Tempranillo: color:'r', aka:['Tinto Fino','Tinta del País'], budding:'Early', ripening:'Mid', climate:'Warm continental', acidity:'Medium', body:'Medium to full', alcohol:'Medium to high', tannin:'Medium to high', aromas:'Plum, cherry, leather, tobacco, dried fig', viticulture:['Thick-skinned, drought-tolerant','Buds early — spring-frost risk'], winemaking:['American & French oak ageing','Long Crianza→Gran Reserva maturation'], regionStyles:[{region:'Rioja'},{region:'Ribera del Duero'},{region:'Toro'}], quality:'Good to outstanding', price:'Inexpensive to super-premium'
- Riesling: color:'w', aka:['Rheinriesling'], budding:'Mid', ripening:'Late', climate:'Cool to moderate', acidity:'High', body:'Light to medium', alcohol:'Low to medium', tannin:'—', aromas:'Lime, green apple, blossom, wet stone, petrol with age', viticulture:['Winter-hardy','Late-ripening — needs a long autumn'], winemaking:['Stainless steel, little/no oak','Dry to nobly sweet Prädikat'], regionStyles:[{region:'Mosel'},{region:'Rheingau'},{region:'Clare Valley'}], quality:'Good to outstanding', price:'Inexpensive to super-premium'

## Knowledge points (KkpCard / Compare "why")
- fact: "Rioja is divided into Rioja Alta, Rioja Alavesa and Rioja Oriental."
- relationship: "Altitude + the cold Atlantic-influenced nights give a wide diurnal range → fresh acidity is retained in ripe Tempranillo."
- comparison: "Ribera del Duero sits higher and more continental than Rioja → riper, more powerful Tempranillo with firmer tannin."

## Curriculum / settings copy
- Curriculum options: ('All content', count 91), ('WSET Level 3', count 57), ('WSET Diploma · D3', count 91)
- Setting item: icon '🎓', title 'Curriculum', desc 'Choose your qualification & filter regions'

## Map coordinates (MiniMap lat/lng)
- Rioja: lat 42.46, lng -2.45 ; Barossa: lat -34.53, lng 138.95 ; Mosel: lat 49.98, lng 7.0 ; Brunello: lat 43.06, lng 11.49

## Images (remote, CORS-friendly — for RefCard/grape image props)
Use a real Wikimedia thumbnail when an image prop is required, e.g.
`https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Old_Wine_Barrels.jpg/320px-Old_Wine_Barrels.jpg`
(If an image fails to load the component hides it via onError — that's acceptable.)
