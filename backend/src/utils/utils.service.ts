import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    private alphabet  = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    generateRandomString(length: bigint){
        let result = '';

        if(length == 0n){
            return '0';
        }

        while(length > 0n){
           
        }

        return result;
    }
}
