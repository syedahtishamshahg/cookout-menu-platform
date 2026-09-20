export type Location={id:string;state:string;stateCode:string;city:string;address:string;phone?:string;hoursNote?:string;status:"needs-verification"|"verified"};
export const locations:Location[]=[];
export const states=[...new Set(locations.map(x=>x.state))];