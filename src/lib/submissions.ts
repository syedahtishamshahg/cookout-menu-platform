import {z} from "zod";
export const submissionSchema=z.object({type:z.enum(["correction","price","location","nutrition"]),page:z.string().trim().min(1).max(200),message:z.string().trim().min(10).max(5000),source:z.string().url().max(1000).optional().or(z.literal(""))});
