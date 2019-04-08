import { Controller, RequestMapping } from "../../src/decorators";

@Controller
@RequestMapping("/user")
class UserController {

    @RequestMapping("")
    getAllUsers() {
        return [
            {
                id: 1,
                username: 'test',
            }
        ]
    }
}

export default UserController;