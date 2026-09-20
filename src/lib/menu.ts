export type MenuItem={name:string;slug:string;category:string;description:string;nutrition?:{calories:number;protein_g:number;sodium_mg:number};status:"source-checked"|"needs-source"};
export const menuItems:MenuItem[]=[
{name:"Small Hamburger",slug:"small-hamburger",category:"Burgers",description:"Small hamburger listed in the official nutrition reference.",nutrition:{calories:245,protein_g:14,sodium_mg:309},status:"source-checked"},
{name:"Regular Hamburger",slug:"regular-hamburger",category:"Burgers",description:"Regular hamburger listed in the official nutrition reference.",nutrition:{calories:328,protein_g:22,sodium_mg:340},status:"source-checked"},
{name:"Huge Hamburger",slug:"huge-hamburger",category:"Burgers",description:"Huge hamburger listed in the official nutrition reference.",nutrition:{calories:516,protein_g:40,sodium_mg:410},status:"source-checked"},
{name:"Big Double",slug:"big-double",category:"Burgers",description:"Big Double listed in the official nutrition reference.",nutrition:{calories:311,protein_g:20,sodium_mg:126},status:"source-checked"},
{name:"Char-Grilled Chicken Breast",slug:"char-grilled-chicken-breast",category:"Chicken",description:"Char-grilled chicken breast sandwich.",nutrition:{calories:377,protein_g:25,sodium_mg:575},status:"source-checked"},
{name:"Hot Crispy Spicy Chicken Breast",slug:"hot-crispy-spicy-chicken-breast",category:"Chicken",description:"Crispy spicy chicken breast sandwich.",nutrition:{calories:446,protein_g:21,sodium_mg:1158},status:"source-checked"},
{name:"Reg BBQ Sandwich",slug:"regular-bbq-sandwich",category:"BBQ",description:"Regular barbecue sandwich.",nutrition:{calories:368,protein_g:29,sodium_mg:1103},status:"source-checked"},
{name:"Hot Dog",slug:"hot-dog",category:"Hot Dogs",description:"Hot dog listed in the official nutrition reference.",nutrition:{calories:260,protein_g:8,sodium_mg:600},status:"source-checked"},
{name:"Cajun Wrap",slug:"cajun-wrap",category:"Wraps",description:"Cajun chicken wrap.",nutrition:{calories:501,protein_g:25,sodium_mg:1285},status:"source-checked"},
{name:"Ranch Wrap",slug:"ranch-wrap",category:"Wraps",description:"Ranch chicken wrap.",nutrition:{calories:522,protein_g:25,sodium_mg:1273},status:"source-checked"},
{name:"Honey Mustard Wrap",slug:"honey-mustard-wrap",category:"Wraps",description:"Honey mustard chicken wrap.",nutrition:{calories:517,protein_g:25,sodium_mg:1279},status:"source-checked"},
{name:"Chicken Strips (3)",slug:"chicken-strips-3",category:"Chicken",description:"Three chicken strips.",nutrition:{calories:660,protein_g:36,sodium_mg:2130},status:"source-checked"}
];
export const categories=[...new Set(menuItems.map(x=>x.category))];