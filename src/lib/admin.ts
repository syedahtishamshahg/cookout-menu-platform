export type ReviewStatus="pending"|"in-review"|"verified"|"rejected";
export type ReviewType="price"|"location"|"nutrition"|"correction";
export type ReviewRecord={id:string;type:ReviewType;title:string;sourceId?:string;submittedAt:string;status:ReviewStatus;reviewer?:string;notes?:string};
export const reviewQueue:ReviewRecord[]=[];