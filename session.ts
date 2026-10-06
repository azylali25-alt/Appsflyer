import {SignJWT,jwtVerify} from 'jose';import {cookies} from 'next/headers';
const secret=new TextEncoder().encode(process.env.SESSION_SECRET||'dev-only-change-me-please-32-bytes');
export async function createSession(userId:string,role:string){return new SignJWT({role}).setProtectedHeader({alg:'HS256'}).setSubject(userId).setIssuedAt().setExpirationTime('7d').sign(secret)}
export async function getSession(){const c=await cookies();const token=c.get('session')?.value;if(!token)return null;try{const {payload}=await jwtVerify(token,secret);return {userId:payload.sub!,role:String(payload.role)}}catch{return null}}
