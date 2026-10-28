import { addUrl, getAllUrl } from "./url.service.js"

export const urlResolver = {
    Query:{
      getAllUrl:async ()=>{
        const urlArr = await getAllUrl();
        return urlArr;
      }
    },
    Mutation:{
        createUrl:async (_:any,args:{url:string,aliase?:string})=>{
            const result = await addUrl(args);
            return result;
        }
    }
}