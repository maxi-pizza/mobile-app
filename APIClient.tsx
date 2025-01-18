import {createEmojisushiAgent} from '@layerok/emojisushi-js-sdk';

//https://api.emojisushi.com.ua/api
//https://stage-api.emojisushi.com.ua/api
export const agent = createEmojisushiAgent({
  service: 'https://stage-api.emojisushi.com.ua/api',
});
