import { Controller, Query, Mutation } from "vesper";
import Services from "../entity/Services";
import User from "../entity/User"



@Controller()
export default class ServicesController {

  @Query()
  getUserServices(_,{userId}) {
    return Services.findOne(userId);
  }

  @Mutation()
  async setServices(args){

    const checkUser =await User.findOne() //get current user 
    if (!checkUser) throw new Error("the user does not exist")
    
    // TODO make this function works 


  }

}