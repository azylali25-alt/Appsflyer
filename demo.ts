export type DailyPoint={Date:string;Installs:number;Clicks:number;Impressions:number;Cost:number;Revenue:number;Events:number;Payers:number};
export type SourceRow={Source:string;Channel:string;Campaign:string;Country:string;Installs:number;Clicks:number;Impressions:number;Cost:number;Revenue:number;Events:number;Payers:number;RetentionD7:number};
export const daily:DailyPoint[]=[
{Date:'2026-09-25',Installs:388,Clicks:1510,Impressions:28700,Cost:910,Revenue:1275,Events:53,Payers:42},
{Date:'2026-09-26',Installs:412,Clicks:1588,Impressions:30110,Cost:958,Revenue:1320,Events:58,Payers:46},
{Date:'2026-09-27',Installs:401,Clicks:1522,Impressions:29320,Cost:940,Revenue:1288,Events:55,Payers:44},
{Date:'2026-09-28',Installs:465,Clicks:1740,Impressions:32550,Cost:1060,Revenue:1510,Events:69,Payers:52},
{Date:'2026-09-29',Installs:492,Clicks:1815,Impressions:33980,Cost:1120,Revenue:1655,Events:72,Payers:58},
{Date:'2026-09-30',Installs:505,Clicks:1860,Impressions:34800,Cost:1155,Revenue:1710,Events:76,Payers:61},
{Date:'2026-10-01',Installs:430,Clicks:1620,Impressions:31400,Cost:1020,Revenue:1480,Events:62,Payers:49},
{Date:'2026-10-02',Installs:470,Clicks:1715,Impressions:32750,Cost:1110,Revenue:1590,Events:66,Payers:53},
{Date:'2026-10-03',Installs:520,Clicks:1850,Impressions:35100,Cost:1180,Revenue:1710,Events:71,Payers:57},
{Date:'2026-10-04',Installs:485,Clicks:1760,Impressions:33800,Cost:1160,Revenue:1640,Events:68,Payers:55},
{Date:'2026-10-05',Installs:610,Clicks:2120,Impressions:38900,Cost:1320,Revenue:2010,Events:82,Payers:67},
{Date:'2026-10-06',Installs:575,Clicks:2010,Impressions:37400,Cost:1280,Revenue:1950,Events:79,Payers:64},
];
export const sourceRows:SourceRow[]=[
{Source:'chulmgrou9q_int',Channel:'GA024',Campaign:'Moonglove',Country:'US',Installs:1240,Clicks:3920,Impressions:68400,Cost:2690,Revenue:4520,Events:188,Payers:145,RetentionD7:.32},
{Source:'advantafoll_int',Channel:'GA035',Campaign:'Moonglove',Country:'US',Installs:1180,Clicks:3750,Impressions:65100,Cost:2810,Revenue:4210,Events:176,Payers:132,RetentionD7:.30},
{Source:'pettmobit16_int',Channel:'GA024',Campaign:'Moonglove',Country:'CA',Installs:740,Clicks:2460,Impressions:43100,Cost:1650,Revenue:2480,Events:104,Payers:81,RetentionD7:.29},
{Source:'foxlanellm3_int',Channel:'GA140',Campaign:'Moonglove',Country:'US',Installs:660,Clicks:2360,Impressions:42100,Cost:1980,Revenue:2040,Events:91,Payers:68,RetentionD7:.24},
{Source:'trendpulscl_int',Channel:'GA102',Campaign:'Moonglove',Country:'CA',Installs:410,Clicks:1840,Impressions:36200,Cost:1390,Revenue:920,Events:39,Payers:28,RetentionD7:.18},
{Source:'coherenta9h_int',Channel:'GA035',Campaign:'Moonglove',Country:'US',Installs:520,Clicks:1990,Impressions:37100,Cost:1510,Revenue:1710,Events:68,Payers:47,RetentionD7:.22},
{Source:'theconnectmobi_int',Channel:'GA024',Campaign:'Moonglove',Country:'GB',Installs:390,Clicks:1510,Impressions:28600,Cost:910,Revenue:1190,Events:54,Payers:41,RetentionD7:.27},
{Source:'leonardobz2_int',Channel:'GA139',Campaign:'Moonglove',Country:'US',Installs:310,Clicks:1390,Impressions:27100,Cost:1020,Revenue:760,Events:27,Payers:19,RetentionD7:.16},
];
export const geoRows=[
{Country:'United States',Code:'US',Installs:3910,Cost:9010,Revenue:13240,Payers:301},{Country:'Canada',Code:'CA',Installs:1440,Cost:3040,Revenue:4150,Payers:109},{Country:'United Kingdom',Code:'GB',Installs:890,Cost:2020,Revenue:2810,Payers:75},{Country:'Germany',Code:'DE',Installs:660,Cost:1580,Revenue:1910,Payers:49},{Country:'Brazil',Code:'BR',Installs:610,Cost:980,Revenue:1210,Payers:44},{Country:'Mexico',Code:'MX',Installs:520,Cost:850,Revenue:1020,Payers:37}
];
export const eventRows=[
{eventName:'registration',count:1284,uniqueUsers:1211,revenue:0,payable:false},{eventName:'first_debit_card_connected',count:518,uniqueUsers:487,revenue:12950,payable:true},{eventName:'first_purchase',count:346,uniqueUsers:332,revenue:10640,payable:true},{eventName:'repeat_purchase',count:181,uniqueUsers:124,revenue:6330,payable:false}
];
