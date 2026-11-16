/* ---------- EDIT THESE: agency details ---------- */
export const CONFIG = {
  agency: 'Narayani Travel Agency',
  phone: '+91 98XXX XXXXX',
  whatsapp: '',                       // digits with country code, e.g. 919812345678. Leave empty to hide WhatsApp buttons.
  email: 'hello@narayani-travels.example',
  address: 'Office address, City, State, PIN',
  hours: 'Mon to Sat, 10 am to 7 pm',
  staffUser: 'admin',
  staffPass: 'narayani123',
  reviewsAreSamples: true,            // set to false once REVIEWS holds real customer reviews
};

/* ---------- EDIT THESE: packages. nights: trip is nights+1 days. price: per person, INR. lon/lat place the map pin. ---------- */
export const PACKAGES = [
  {id:'goa', name:'Goa Beach Break', cat:'beach', nights:3, price:14500, place:'Goa', lon:73.95, lat:15.45, lab:'l', best:'Nov to Feb', gq:'Goa, India',
   hl:['North and South Goa beaches','Old Goa churches','Sunset river cruise']},
  {id:'manali', name:'Manali and Kasol', cat:'hills', nights:6, price:24900, place:'Manali', lon:77.19, lat:32.24, lab:'l', best:'Mar to Jun, Oct to Nov', gq:'Manali, Himachal Pradesh',
   hl:['Solang Valley','Hadimba Temple','Parvati Valley and Kasol']},
  {id:'kerala', name:'Kerala Backwaters', cat:'beach', nights:5, price:21800, place:'Alleppey', lon:76.33, lat:9.5, lab:'l', best:'Sep to Mar', gq:'Alappuzha, Kerala',
   hl:['Houseboat night in Alleppey','Munnar tea hills','Kochi Fort walk']},
  {id:'rajasthan', name:'Rajasthan Royal Circuit', cat:'heritage', nights:7, price:32500, place:'Jaipur', lon:75.79, lat:26.91, lab:'l', best:'Oct to Mar', gq:'Jaipur, Rajasthan',
   hl:['Amber Fort, Jaipur','Mehrangarh, Jodhpur','Desert camp, Jaisalmer']},
  {id:'varanasi', name:'Varanasi and Ayodhya Yatra', cat:'pilgrim', nights:4, price:17200, place:'Varanasi', lon:83.0, lat:25.32, lab:'r', best:'Oct to Mar', gq:'Varanasi, Uttar Pradesh',
   hl:['Ganga aarti at Dashashwamedh Ghat','Kashi Vishwanath darshan','Ayodhya temple visit']},
  {id:'shirdi', name:'Shirdi Darshan Express', cat:'pilgrim', nights:2, price:6800, place:'Shirdi', lon:74.48, lat:19.77, lab:'l', best:'Oct to Mar', gq:'Shirdi, Maharashtra',
   hl:['Sai Baba Samadhi Mandir darshan','Shani Shingnapur visit','Stay close to the temple']},
  {id:'andaman', name:'Andaman Islands', cat:'beach', nights:5, price:38900, place:'Havelock', lon:92.98, lat:11.97, lab:'l', best:'Oct to May', gq:'Havelock Island, Andaman and Nicobar',
   hl:['Radhanagar Beach, Havelock','Cellular Jail light show','Snorkelling at Elephant Beach']},
  {id:'ladakh', name:'Leh and Ladakh Expedition', cat:'hills', nights:7, price:36400, place:'Leh', lon:77.58, lat:34.16, lab:'r', best:'Jun to Sep', gq:'Leh, Ladakh',
   hl:['Pangong Lake','Nubra Valley','Leh Palace and monasteries']},
  {id:'darjeeling', name:'Darjeeling and Gangtok', cat:'hills', nights:6, price:27800, place:'Darjeeling', lon:88.26, lat:27.04, lab:'r', best:'Mar to May, Oct to Nov', gq:'Darjeeling, West Bengal',
   hl:['Tiger Hill sunrise','Toy train ride','Tsomgo Lake']},
];

export const CATS = {hills:'Hills', beach:'Beach', heritage:'Heritage', pilgrim:'Pilgrimage'};
export const STATUSES = ['Enquiry','Confirmed','Paid','Completed','Cancelled'];

/* ---------- EDIT THESE: replace with real reviews (with permission) ---------- */
export const REVIEWS = [
  {name:'Sample: Family trip to Goa', stars:5, text:'Hotels were exactly as promised and the driver was on time every day. The kids enjoyed the river cruise.', trip:'Goa Beach Break'},
  {name:'Sample: Pilgrim group from Pune', stars:5, text:'Darshan timings were planned well and the senior members were comfortable throughout.', trip:'Varanasi and Ayodhya Yatra'},
  {name:'Sample: Couple, Kerala', stars:4, text:'The houseboat night was the highlight. Quick replies on WhatsApp whenever we had a question.', trip:'Kerala Backwaters'},
];

export const FAQS = [
  ['How do I book a package?', 'Send an enquiry from this page. We reply with an itinerary and quote, and your dates are held once you pay the booking advance.'],
  ['Are the prices per person?', 'Yes. Prices are per person on twin sharing. Children, single rooms and peak-season dates can change the final quote, so we confirm the total before you pay.'],
  ['Can you change a package or build a custom trip?', 'Yes. Tell us your dates, budget and group size and we adjust hotels, days and vehicles to fit.'],
  ['What is included in the price?', 'Hotel stay, local transport and a guide where the route needs one. Flights, trains, entry tickets and personal expenses are quoted separately unless the itinerary says otherwise.'],
  ['What if I need to cancel?', 'Cancellation terms depend on the hotels and transport booked for your dates. We share them in writing with your quote before you pay anything.'],
  ['Do you arrange trips for senior citizens and large groups?', 'Yes. We plan slower pacing, suitable rooms and a vehicle that stays with the group. For 15 or more travellers we offer group rates.'],
];

export const GROUPS = [
  ['Families', 'Connecting rooms, early breakfasts, and driving days kept short for children.'],
  ['Pilgrim parties', 'Darshan timings, dharamshala or hotel stays near the temple, and vegetarian meals on the route.'],
  ['Senior citizens', 'Slower pacing, ground-floor rooms where possible, and a vehicle that stays with the group.'],
  ['Corporate and office groups', 'Meeting-friendly hotels, tempo travellers or buses, and one invoice for the whole party.'],
  ['School and college trips', 'Supervised itineraries, group rates, and teacher-to-student ratios agreed before booking.'],
  ['Couples and honeymooners', 'Quiet stays, private transfers, and a plan with room to do nothing.'],
];

export const SERVICES = ['Hotel and resort booking','AC bus, tempo traveller and cabs','Train and flight tickets','Local guides','Custom itineraries'];

export const STEPS = [
  ['Tell us your plan', 'Pick a package or send your dates, group size and budget through the enquiry form.'],
  ['Get an itinerary and quote', 'We reply with a day-by-day plan, hotel names and a clear price. No hidden extras.'],
  ['Confirm with an advance', 'Pay the booking advance to lock hotels, vehicles and tickets for your dates.'],
  ['Travel with support', 'Pickup, hotel check-ins and guides are arranged, and you can call us during the trip.'],
];

/* India outline, [lon, lat], simplified */
export const OUTLINE = [[68.2,23.7],[68.9,22.3],[69.7,21.5],[70.5,20.8],[71.1,20.7],[72.2,21.2],[72.7,21.3],[72.8,19.9],[72.8,18.9],[73.3,17.2],[73.9,15.5],[74.4,14.4],[74.8,12.9],[75.4,11.8],[76.2,9.9],[76.6,8.9],[77.5,8.1],[78.2,8.8],[79.0,9.2],[79.3,10.3],[79.8,10.3],[79.9,11.4],[80.3,13.1],[80.2,14.7],[80.9,15.8],[82.2,16.7],[83.4,17.8],[84.7,19.1],[85.9,19.9],[86.8,20.5],[87.1,21.5],[88.1,21.7],[88.9,22.0],[89.0,22.7],[88.7,24.0],[89.1,25.3],[89.9,25.3],[90.7,25.1],[91.8,25.1],[92.2,24.6],[92.0,23.7],[91.4,23.1],[91.7,22.5],[92.4,22.0],[93.0,22.7],[93.2,23.5],[93.8,24.3],[94.3,24.6],[94.7,25.7],[95.3,26.5],[95.9,27.0],[96.8,27.4],[97.3,28.1],[96.4,28.4],[95.6,29.0],[94.6,29.3],[94.0,28.5],[93.0,28.3],[92.1,27.8],[91.6,27.9],[91.6,26.9],[90.4,26.8],[89.6,26.8],[88.9,26.9],[88.9,27.3],[88.8,28.0],[88.1,27.9],[88.0,27.1],[88.2,26.4],[87.5,26.4],[86.0,26.6],[84.7,27.0],[83.4,27.4],[82.1,28.1],[81.2,28.8],[80.5,29.7],[80.2,30.5],[79.0,31.0],[78.7,31.9],[78.7,32.8],[79.4,33.4],[79.2,34.4],[78.4,35.5],[77.5,35.6],[76.2,35.8],[75.2,36.2],[74.4,36.8],[73.8,35.5],[74.1,34.6],[74.7,34.2],[74.0,33.2],[74.5,32.8],[75.2,32.5],[75.5,32.0],[74.9,31.5],[74.4,31.1],[74.0,30.3],[73.3,29.9],[72.9,29.0],[71.9,27.9],[70.7,27.3],[70.0,26.3],[70.0,25.0],[70.3,24.4],[69.2,24.1]];
