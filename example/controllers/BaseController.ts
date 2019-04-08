import Controller from "../../src/decorators/Controller";
import RequestMapping from "../../src/decorators/RequestMapping";

@Controller
@RequestMapping("")
class BaseController {


    @RequestMapping("/")
    getHomeData() {
        return {
            it: 'works'
        }
    }

    @RequestMapping("/test")
    getMethodData(){
        return {
            it: 'still works'
        }
    }
}

export default BaseController;