import { Controller, Query } from "vesper";
import Fund from "../entity/Fund";

@Controller()
export default class FundController {
  @Query()
  allFunds() {
    return Fund.find();
  }
}
