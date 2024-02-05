import { EntityState } from "@ngrx/entity"

export interface IPost{
    id?:string, //id is now an optional field by using '?'
    title:string,
    description:string
}

export interface IPosts extends EntityState<IPost>{
    // posts: IPost[]
    count:number
}