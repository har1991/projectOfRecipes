import { MeasuresDto } from './measuresDto';

export class Measures {
    constructor(public id : number , public name : string ){

    }

    toDto() : MeasuresDto{
        return {
            id : this.id ,
            name : this.name
        }
    }
    static fromDb(resultDto : {
        id : number  , 
        name : string 
    })  : Measures {
       return new Measures(resultDto.id , resultDto.name)
    }
    }
