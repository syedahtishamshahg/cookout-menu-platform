export type Gate={id:string;label:string;required:boolean;status:"pending"|"ready"|"blocked";detail:string};
export const productionGates:Gate[]=[
{id:"d1",label:"Cloudflare D1 binding",required:true,status:"pending",detail:"Configure the real DB binding in the deployment environment."},
{id:"auth",label:"Admin authentication",required:true,status:"blocked",detail:"A real identity/session provider must be configured before admin mutations are enabled."},
{id:"data",label:"Source-backed data",required:true,status:"pending",detail:"Only publish records with provenance and verification metadata."},
{id:"anti-abuse",label:"Public form protection",required:true,status:"pending",detail:"Enable rate limiting and Turnstile before public submissions are persisted."},
{id:"qa",label:"Build, accessibility and performance QA",required:true,status:"pending",detail:"Run against the actual production deployment."},
];