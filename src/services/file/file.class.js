import {resolve} from 'path'
const { Service } = require('feathers-mongoose');
const { unlinkSync } = require('fs')

export class File extends Service {
   

    async remove(data, params) {

        console.log('dat : ', data, 'param : ', params, this)

        const { path } = await super.get(data)
        unlinkSync(resolve(process.cwd(), 'static', path.replace(/\//, "")))


        
        return super.remove(data, params)
    }
};
