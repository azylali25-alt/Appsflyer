import {NextResponse} from 'next/server';import {getSession} from '@/server/session';import {summary} from '@/server/analytics';
export async function GET(){const s=await getSession();if(!s){if(process.env.DEMO_MODE==='true')return NextResponse.json(await summary('demo'));return NextResponse.json({error:'Unauthorized'},{status:401});}return NextResponse.json(await summary(s.userId));}
