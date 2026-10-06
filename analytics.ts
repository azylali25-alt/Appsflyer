import {db} from './db';
import {daily as demoDaily,sourceRows as demoSources,geoRows as demoGeo,eventRows as demoEvents} from '@/lib/demo';
import {computeMetrics,trendBadge,anomalyFlags} from '@/lib/metrics';

type FactLike={date:Date;mediaSource:string|null;channel:string|null;campaign:string|null;country:string|null;eventName:string|null;impressions:number|null;clicks:number|null;installs:number|null;cost:any;revenue:any;events:number|null;payers:number|null;uniqueUsers:number|null};
const n=(v:any)=>Number(v||0);
function build(facts:FactLike[]){
 const byDay=new Map<string,any>(),bySource=new Map<string,any>(),byGeo=new Map<string,any>(),byEvent=new Map<string,any>();
 let impressions=0,clicks=0,installs=0,cost=0,revenue=0,events=0,payers=0;
 for(const f of facts){impressions+=f.impressions||0;clicks+=f.clicks||0;installs+=f.installs||0;cost+=n(f.cost);revenue+=n(f.revenue);events+=f.events||0;payers+=f.payers||0;
  const day=f.date.toISOString().slice(0,10);const d=byDay.get(day)||{Date:day,Installs:0,Clicks:0,Impressions:0,Cost:0,Revenue:0,Events:0,Payers:0};d.Installs+=f.installs||0;d.Clicks+=f.clicks||0;d.Impressions+=f.impressions||0;d.Cost+=n(f.cost);d.Revenue+=n(f.revenue);d.Events+=f.events||0;d.Payers+=f.payers||0;byDay.set(day,d);
  const sk=`${f.mediaSource||'Unknown'}|||${f.channel||'—'}|||${f.campaign||'—'}|||${f.country||'—'}`;const s=bySource.get(sk)||{Source:f.mediaSource||'Unknown',Channel:f.channel||'—',Campaign:f.campaign||'—',Country:f.country||'—',Installs:0,Clicks:0,Impressions:0,Cost:0,Revenue:0,Events:0,Payers:0,RetentionD7:0};s.Installs+=f.installs||0;s.Clicks+=f.clicks||0;s.Impressions+=f.impressions||0;s.Cost+=n(f.cost);s.Revenue+=n(f.revenue);s.Events+=f.events||0;s.Payers+=f.payers||0;bySource.set(sk,s);
  const gk=f.country||'Unknown';const g=byGeo.get(gk)||{Country:gk,Code:gk,Installs:0,Cost:0,Revenue:0,Payers:0};g.Installs+=f.installs||0;g.Cost+=n(f.cost);g.Revenue+=n(f.revenue);g.Payers+=f.payers||0;byGeo.set(gk,g);
  if(f.eventName){const e=byEvent.get(f.eventName)||{eventName:f.eventName,count:0,uniqueUsers:0,revenue:0,payable:false};e.count+=f.events||1;e.uniqueUsers+=f.uniqueUsers||0;e.revenue+=n(f.revenue);byEvent.set(f.eventName,e)}
 }
 const daily=[...byDay.values()].sort((a,b)=>a.Date.localeCompare(b.Date));const sources=[...bySource.values()].sort((a,b)=>b.Revenue-a.Revenue);const geos=[...byGeo.values()].sort((a,b)=>b.Revenue-a.Revenue);const eventList=[...byEvent.values()].sort((a,b)=>b.count-a.count);
 const metrics=computeMetrics({impressions,clicks,installs,cost,revenue,events,payers});
 return {...metrics,daily,sources,geos,eventsList:eventList,anomalies:anomalyFlags(daily.map(x=>x.Revenue)),trend:trendBadge(daily.map(x=>x.Revenue))};
}
function demo(){const totals=demoDaily.reduce((a,d)=>({impressions:a.impressions+d.Impressions,clicks:a.clicks+d.Clicks,installs:a.installs+d.Installs,cost:a.cost+d.Cost,revenue:a.revenue+d.Revenue,events:a.events+d.Events,payers:a.payers+d.Payers}),{impressions:0,clicks:0,installs:0,cost:0,revenue:0,events:0,payers:0});return {...computeMetrics(totals),daily:demoDaily,sources:demoSources,geos:demoGeo,eventsList:demoEvents,anomalies:anomalyFlags(demoDaily.map(x=>x.Revenue)),trend:trendBadge(demoDaily.map(x=>x.Revenue)),demo:true};}
export async function summary(userId:string){try{const uploads=await db.upload.findMany({where:{userId,status:'done'},select:{id:true}});const ids=uploads.map(x=>x.id);if(!ids.length)return demo();const facts=await db.fact.findMany({where:{uploadId:{in:ids}},take:250000,orderBy:{date:'asc'}});return {...build(facts),demo:false};}catch{return demo();}}
